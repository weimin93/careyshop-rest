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

    <el-dialog
      :title="$t('favorites')"
      :visible.sync="visible">

      <el-tabs v-model="activeName" style="margin-top: -25px;">
        <el-tab-pane :label="$t('general')" name="general">
          <p>{{$t('name')}}：<span>{{visibleData.name}}</span></p>
          <p>{{$t('url')}}：<span>{{get(visibleData, 'request.url')}}</span></p>
          <p>{{$t('type')}}：<span>{{get(visibleData, 'request.method')}}</span></p>
          <p>{{$t('date')}}：<span>{{visibleData.date}}</span></p>
        </el-tab-pane>

        <el-tab-pane :label="$t(get(visibleData, 'request.methodName'))" name="payload">
          <cs-highlight :code="get(visibleData, 'request.payload')"/>
        </el-tab-pane>

        <el-tab-pane :label="$t('headers')" name="headers">
          <el-table :data="visibleData.headers">
            <el-table-column
              prop="name"
              :label="$t('header name')">
            </el-table-column>

            <el-table-column
              prop="value"
              :label="$t('header value')">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="apply(visibleData.index)" type="primary" size="medium">{{$t('run')}}</el-button>
        <el-button @click="down(visibleData.index)" type="primary" size="medium">{{$t('export')}}</el-button>
        <el-button @click="visible = false" size="medium">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'Favorites',
  computed: {
    ...mapState('careyshop/favorites', [
      'favorites'
    ])
  },
  data() {
    return {
      visible: false,
      visibleData: {},
      activeName: 'general'
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
    get,
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
      this.visibleData = {
        ...this.favorites[index],
        index
      }

      this.visible = true
      console.log(this.visibleData)
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
