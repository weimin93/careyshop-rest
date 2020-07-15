<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        prop="response.config.baseURL"
        :label="$t('url')">
      </el-table-column>

      <el-table-column
        prop="response.config.method"
        :label="$t('type')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="response.millis"
        :label="$t('response time')"
        width="150">
      </el-table-column>

      <el-table-column
        prop="date"
        :label="$t('date')"
        width="180">
      </el-table-column>

      <el-table-column
        :label="$t('actions')"
        align="center"
        width="120">
        <template slot-scope="scope">
          <div class="table-button">
            <el-button @click="apply(scope.$index)" icon="el-icon-video-play" size="mini" type="text"/>
            <el-button @click="remove(scope.$index)" icon="el-icon-delete" size="mini" type="text"/>
            <el-button @click="info(scope.$index)" icon="el-icon-bangzhu" size="mini" type="text"/>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="cs-mt cs-mb" flex>
      <el-pagination
        flex-box="1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[25, 50, 100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="history.length">
      </el-pagination>

      <el-button
        class="cs-fr"
        icon="el-icon-delete"
        size="small"
        type="danger"
        @click="deleteAll">{{$t('delete all')}}</el-button>
    </div>

    <el-dialog
      :title="$t('response')"
      :visible.sync="visible">
      <cs-response style="margin-top: -25px;" v-model="visibleData"/>

      <div slot="footer" class="dialog-footer">
        <el-dropdown class="cs-mr-10" @command="copyRequest">
          <el-button type="primary" size="medium">
            {{$t('copy')}}<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="request.responseURL">{{$t('copy request')}}</el-dropdown-item>
            <el-dropdown-item command="request.response">{{$t('copy response')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button @click="apply(visibleData.index)" type="primary" size="medium">{{$t('run')}}</el-button>
        <el-button @click="visible = false" size="medium">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { get, slice } from 'lodash'
import * as clipboard from 'clipboard-polyfill'

export default {
  name: 'History',
  computed: {
    ...mapState('careyshop/history', [
      'history'
    ])
  },
  components: {
    csResponse: () => import('@/components/cs-response')
  },
  data() {
    return {
      visible: false,
      visibleData: {},
      tableData: [],
      currentPage: 1,
      pageSize: 25
    }
  },
  mounted() {
    this.loadHistory()
  },
  methods: {
    ...mapActions('careyshop/history', [
      'load',
      'delHistory',
      'cleanHistory'
    ]),
    _setTable() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize

      const data = slice(this.history, start, end)
      this.tableData = [...data]
    },
    copyRequest(key) {
      let response = get(this.visibleData, key, '')
      clipboard.writeText(response)
        .then(() => {
          this.$message.success(this.$t('copy success'))
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    async loadHistory() {
      await this.load()
      this._setTable()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._setTable()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._setTable()
    },
    apply(index) {
      const data = this.tableData[index]
      this.$router.push({
        name: 'Index',
        params: {
          value: { ...data }
        }
      })
    },
    async remove(index) {
      const key = get(this.tableData, `[${index}]key`)
      if (key) {
        await this.delHistory(key)
      }

      this.tableData.splice(index, 1)
    },
    info(index) {
      this.visibleData = get(this.tableData, `[${index}]response`, {})
      this.visibleData.index = index
      this.visible = true
    },
    async deleteAll() {
      await this.cleanHistory()
      this.tableData = []
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
