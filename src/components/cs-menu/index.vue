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
      :disabled="loading"
      :options="menuData"
      :props="cascaderProps"
      :show-all-levels="false"
      placeholder="支持搜索"
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
      this.value = []
      this.menuData = []
      this.loading = true

      getMenuAuthList(null)
        .then(res => {
          this.menuData = util.formatDataToTree(res.data)
        })
        .finally(() => {
          this.loading = false
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
