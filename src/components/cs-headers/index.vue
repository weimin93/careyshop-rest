<template>
  <div>
    <div class="cs-mb" style="display: flex;">
      <label class="el-form-item__label" style="width: 90px;">{{$t('headers')}}</label>
      <el-select v-model="select" value-key="key" style="flex: auto;">
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="(item, key) in group.options"
            :key="key"
            :label="`${item.name}: ${item.value}`"
            :value="{...item, type: group.type, index: key}">
          </el-option>
        </el-option-group>
      </el-select>

      <el-dropdown
        type="primary"
        style="margin: 0 10px;"
        @click="addSelectedHeader"
        @command="selectedCommand"
        split-button>
        {{$t('add selected header')}}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set" :disabled="isDropdown">{{$t('edit saved header')}}</el-dropdown-item>
          <el-dropdown-item command="del" :disabled="isDropdown">{{$t('delete saved header')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button type="info" @click="addDialogHeader">{{$t('add header')}}</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column
        prop="name"
        :label="$t('header name')">
      </el-table-column>

      <el-table-column
        prop="value"
        :label="$t('header value')">
      </el-table-column>

      <el-table-column
        :label="$t('actions')"
        align="center"
        width="100">
        <template slot-scope="scope">
          <div class="table-button">
            <el-button @click="delTableRow(scope.$index)" icon="el-icon-delete" size="mini" type="text"/>
            <el-button @click="setTableRow(scope.$index)" icon="el-icon-edit-outline" size="mini" type="text"/>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="$t('headers')"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="600px">
      <el-form :model="visibleForm" label-width="100px">
        <el-form-item :label="$t('header name')">
          <el-autocomplete v-model="visibleForm.name" suffix-icon="el-icon-arrow-down" placeholder="Content-Type" :fetch-suggestions="querySearch" clearable style="width: 100%;"/>
        </el-form-item>

        <el-form-item :label="$t('header value')">
          <el-input v-model="visibleForm.value" placeholder="application/json;charset=utf-8" clearable></el-input>
        </el-form-item>

        <el-form-item v-show="visibleForm.show" :label="$t('header save')">
          <el-switch v-model="visibleForm.save"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="medium">{{$t('cancel')}}</el-button>
        <el-button @click="saveHeaders" :disabled="!visibleForm.name || !visibleForm.value" type="primary" size="medium">{{$t('save')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'cs-headers',
  computed: {
    ...mapState('careyshop/headers', [
      'headers',
      'examples'
    ]),
    options() {
      let data = [{
        label: this.$t('examples'),
        type: 'examples',
        options: this.examples
      }]

      if (this.headers.length > 0) {
        data.unshift({
          label: this.$t('custom'),
          type: 'custom',
          options: this.headers
        })
      }

      return data
    },
    isDropdown() {
      return !Object.keys(this.select).length || this.select.type === 'examples'
    }
  },
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      visibleForm: {},
      restaurants: [
        { value: 'Cookie' },
        { value: 'User-Agent' },
        { value: 'Content-Type' },
        { value: 'Host' },
        { value: 'Authorization' },
        { value: 'Referer' },
        { value: 'Accept' },
        { value: 'Accept-Charset' },
        { value: 'Accept-Encoding' },
        { value: 'Accept-Language' },
        { value: 'Accept-Ranges' },
        { value: 'Cache-Control' },
        { value: 'Connection' },
        { value: 'Date' },
        { value: 'Expect' },
        { value: 'From' },
        { value: 'If-Match' },
        { value: 'If-Modified-Since' },
        { value: 'If-None-Match' },
        { value: 'If-Range' },
        { value: 'If-Unmodified-Since' },
        { value: 'Max-Forwards' },
        { value: 'Pragma' },
        { value: 'Proxy-Authorization' },
        { value: 'Range' },
        { value: 'TE' },
        { value: 'Upgrade' },
        { value: 'Via' },
        { value: 'Warning' }
      ],
      select: {},
      tableData: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.tableData = val
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('careyshop/headers', [
      'addHeader',
      'delHeader',
      'setHeader'
    ]),
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 添加当前选中
    addSelectedHeader() {
      if (Object.keys(this.select).length > 0) {
        this.tableData.unshift(this.select)
        this.$emit('input', this.tableData)
      }
    },
    // 删除列表中的请求头
    delTableRow(index) {
      this.tableData.splice(index, 1)
      this.$emit('input', this.tableData)
    },
    // 修改列表中的请求头
    setTableRow(index) {
      this.visibleForm = {
        ...this.tableData[index],
        index: index,
        type: 'table',
        show: true
      }

      this.visible = true
    },
    // 新增自定义请求头
    addDialogHeader() {
      this.$nextTick(() => {
        this.visibleForm = { type: 'add', show: true }
        this.visible = true
      })
    },
    // 操作自定义请求头
    selectedCommand(command) {
      switch (command) {
        case 'del':
          this.delHeader(this.select.index)
          this.select = {}
          break

        case 'set':
          this.visibleForm = { ...this.select, type: 'header' }
          this.visible = true
          break
      }
    },
    saveHeaders() {
      const { type, name, value, key, index } = this.visibleForm

      if (type === 'add') {
        this.tableData.unshift({ name, value })
        this.$emit('input', this.tableData)
      }

      if (type === 'header') {
        this.select = this.visibleForm
        this.setHeader({
          key: index,
          value: { name, value, key }
        })
      }

      if (type === 'table') {
        this.$set(this.tableData, index, {
          ...this.tableData[index],
          value,
          name
        })

        this.$emit('input', this.tableData)
      }

      if (this.visibleForm.save) {
        this.addHeader({ name, value })
      }

      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .table-button /deep/ .el-button--mini {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
</style>
