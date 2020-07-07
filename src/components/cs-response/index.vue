<template>
  <div>
    <el-alert class="cs-alert cs-mb-10" type="info" :closable="false">
      <div>
        <strong>Request URL：</strong>
        <a href="https://www.careyshop.cn" target="_blank">https://www.careyshop.cn</a>
        <br>

        <strong>Request Method：</strong>
        <span>GET</span>
        <br>

        <strong>Response Time：</strong>
        <span>0.09 seconds</span>
        <br>

        <strong>Response Status：</strong>
        <span>200 - OK</span>
        <br>
      </div>

      <div class="status-code cs-fcc">
        200
      </div>
    </el-alert>

    <el-tabs v-model="activeName">
      <el-tab-pane label="Body" name="body">
        Response Body
      </el-tab-pane>

      <el-tab-pane label="Raw" name="raw">
        Response Body (RAW)
      </el-tab-pane>

      <el-tab-pane label="Preview" name="preview">
        Response Preview
      </el-tab-pane>

      <el-tab-pane label="Headers" name="headers">
        Response Headers
      </el-tab-pane>

      <el-tab-pane label="Details" name="details">
        Request Details
      </el-tab-pane>

      <el-tab-pane label="Signature" name="sign">
        Request Signature
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'cs-response',
  data() {
    return {
      activeName: 'body'
    }
  }
}
</script>

<style scoped lang="scss">
  .cs-alert {
    /deep/ .el-alert__content {
      width: 100%;
      padding: 0;

      p {
        display: flex;
        margin: 10px 0;
      }
    }
  }

  .status-code {
    font-size: 50px;
    color: #FFF;
    padding: 0 10px;
    margin-left: auto;
    border-radius: 4px;
    background-color: $color-success;
  }
</style>
