<template>
  <el-drawer
    :visible.sync="dialog"
    :with-header="false"
    :destroy-on-close="true"
    custom-class="setting-drawer"
    direction="rtl"
    size="550px"
    ref="drawer"
    @open="openDialog">
    <div class="setting-drawer__content">
      <el-form :model="form" label-position="left" label-width="105px">
        <el-form-item label="APP_KEY">
          <el-input v-model="form.appKey" placeholder="请输入钥匙" clearable/>
        </el-form-item>

        <el-form-item label="APP_SECRET">
          <el-input v-model="form.appSecret" placeholder="请输入密钥" clearable/>
        </el-form-item>

        <el-form-item label="用户组">
          <el-radio v-model="form.group" label="admin">管理组</el-radio>
          <el-radio v-model="form.group" label="client">顾客组</el-radio>
          <el-radio v-model="form.group" label="guest">游客</el-radio>
        </el-form-item>

        <div class="variable">
          <el-form-item
            v-for="(value, index) in form.variable"
            :label="'变量' + (index + 1)"
            :key="index">
            <el-row>
              <el-col :span="7">
                <el-input v-model="value.name" placeholder="变量名" clearable/>
              </el-col>

              <el-col :span="14" style="padding: 0 10px;">
                <el-input v-model="value.value" placeholder="变量值" clearable/>
              </el-col>

              <el-col :span="3">
                <el-button size="small" type="text" @click.prevent="form.variable.splice(index, 1)">删除</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button @click="addVariable">新增变量</el-button>
          </el-form-item>
        </div>
      </el-form>

      <div class="setting-drawer__footer">
        <el-button type="primary" @click="saveData" :loading="loading">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'cs-setting',
  computed: {
    ...mapState('careyshop/setting', [
      'setting'
    ])
  },
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        appKey: '',
        appSecret: '',
        group: 'admin',
        variable: []
      }
    }
  },
  methods: {
    ...mapActions('careyshop/setting', [
      'set'
    ]),
    openDialog() {
      if (Object.keys(this.setting).length > 0) {
        this.form = { ...this.setting }
      }
    },
    saveData() {
      this.loading = true
      this.$nextTick(() => {
        this.set(this.form)
          .finally(() => {
            this.loading = false
            this.$refs.drawer.closeDrawer()
          })
      })
    },
    addVariable() {
      this.form.variable.push({
        name: '',
        value: ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .setting-drawer {
    .setting-drawer__content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      height: 100%;

      form {
        height: 100%;
      }
    }

    .setting-drawer__footer {
      display: flex;

      button {
        flex: 1;
        z-index: 0;
      }
    }
  }

  .variable {
    position: absolute;
    overflow-y: auto;
    height: 50%;
  }
</style>
