<template>
  <div>
    <el-table :data="favorites">
      <el-table-column
        prop="name"
        :label="$t('name')">
      </el-table-column>

      <el-table-column
        prop="request.url"
        :label="$t('url')"
        min-width="160">
      </el-table-column>

      <el-table-column
        prop="request.method"
        :label="$t('type')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="date"
        :label="$t('date')"
        width="180">
      </el-table-column>

      <el-table-column
        :label="$t('actions')"
        align="center"
        width="140">
        <template slot-scope="scope">
          <div class="table-button">
            <el-button @click="apply(scope.$index)" icon="el-icon-video-play" size="mini" type="text"/>
            <el-button @click="remove(scope.$index)" icon="el-icon-delete" size="mini" type="text"/>
            <el-button @click="down(scope.$index)" icon="el-icon-download" size="mini" type="text"/>
            <el-button @click="info(scope.$index)" icon="el-icon-bangzhu" size="mini" type="text"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Favorites',
  computed: {
    ...mapState('careyshop/favorites', [
      'favorites'
    ])
  },
  data() {
    return {
    }
  },
  mounted() {
    this.loadFavorites()
  },
  methods: {
    ...mapActions('careyshop/favorites', [
      'load',
      'delFavorites'
    ]),
    async loadFavorites() {
      await this.load()
    },
    apply(index) {
      this.$router.push({
        name: 'Index',
        params: {
          value: { ...this.favorites[index] }
        }
      })
    },
    remove(index) {
      this.delFavorites(index)
    },
    down(index) {
      const data = this.favorites[index]
      const element = document.createElement('a')
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)))
      element.setAttribute('download', data.name)
      element.style.display = 'none'
      element.click()
    },
    info(index) {
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
