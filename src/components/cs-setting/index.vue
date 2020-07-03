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

        <div class="variable">
          <el-form-item
            v-for="(value, index) in form.variable"
            :label="'变量' + index"
            :key="index">
            <el-row>
              <el-col :span="6">
                <el-input v-model="value.name" placeholder="变量名" clearable/>
              </el-col>

              <el-col :span="15" style="padding: 0 10px;">
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
        <el-button type="primary" @click="() => {}">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'cs-setting',
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        appKey: '',
        appSecret: '',
        variable: [
          {
            name: '{{host}}',
            value: 'http://api.careyshop.cn/api/v1/'
          },
          {
            name: '{{host}}',
            value: 'http://api.careyshop.cn/api/v1/'
          }
        ]
      }
    }
  },
  methods: {
    openDialog() {
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
