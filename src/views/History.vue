<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        prop="response.config.baseURL"
        label="URL">
      </el-table-column>

      <el-table-column
        prop="response.config.method"
        label="Type"
        width="100">
      </el-table-column>

      <el-table-column
        prop="response.millis"
        label="Response Time"
        width="150">
      </el-table-column>

      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>

      <el-table-column
        label="Actions"
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
        :page-sizes="[50, 100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="history.length">
      </el-pagination>

      <el-button
        class="cs-fr"
        icon="el-icon-delete"
        size="small"
        type="danger"
        @click="deleteAll">Delete All</el-button>
    </div>

    <el-dialog
      :title="$t('response')"
      :visible.sync="visible">
      <cs-response style="margin-top: -25px;" v-model="visibleData"/>

      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {}" type="primary" size="medium">{{$t('run')}}</el-button>
        <el-button @click="() => {}" type="primary" size="medium">{{$t('copy')}}</el-button>
        <el-button @click="visible = false" size="medium">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { get, slice } from 'lodash'

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
      pageSize: 50
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
