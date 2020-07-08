<template>
  <el-popover
    class="cs-menu"
    placement="right"
    trigger="click"
    width="300"
    @show="show()">
    <el-cascader
      v-model="value"
      v-loading="loading"
      @change="handleChange"
      :disabled="loading"
      :options="menuData"
      :props="cascaderProps"
      :show-all-levels="false"
      :placeholder="$t('cascader placeholder')"
      style="width: 100%;"
      ref="cascader"
      filterable
      clearable>
    </el-cascader>
    <el-button :title="$t('get url')" :disabled="disabled" icon="el-icon-menu" size="mini" slot="reference"/>
  </el-popover>
</template>

<script>
import { getMenuAuthList } from '@/api/menu'
import util from '@/utils/util'

export default {
  name: 'cs-menu',
  props: {
    confirm: {
      type: Function
    },
    disabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      value: [],
      loading: false,
      menuData: [],
      cascaderProps: {
        value: 'menu_id',
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    show() {
      this.loading = true
      this.value = []
      this.$refs.cascader.$refs.panel.activePath = []

      this.$nextTick(() => {
        getMenuAuthList(null)
          .then(res => {
            this.menuData = util.formatDataToTree(res.data)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    handleChange() {
      this.$confirm(this.$t('cascader confirm'), this.$t('warning'), {
        type: 'warning'
      })
        .then(() => {
          const { data } = this.$refs.cascader.getCheckedNodes()[0]
          const parameter = data.url.split('/').slice(-3)

          let result = {
            url: `/${parameter[0]}/${parameter[1]}`,
            payload: JSON.stringify({ method: parameter[2] }, null, 4)
          }

          this.$emit('confirm', result)
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style scoped>
  .cs-menu {
    padding-left: 30px;
  }
</style>
