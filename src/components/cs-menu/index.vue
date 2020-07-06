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
      placeholder="支持搜索，区分大小写"
      style="width: 100%;"
      ref="cascader"
      filterable
      clearable>
    </el-cascader>
    <el-button :title="$t('get url')" icon="el-icon-menu" size="mini" slot="reference"/>
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
      this.$confirm('是否将当前接口地址填充到请求地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const { data } = this.$refs.cascader.getCheckedNodes()[0]
          const parameter = data.url.split('/').slice(-2)

          let result = {
            url: parameter[0],
            payload: JSON.stringify({ method: parameter[1] }, null, 2)
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
