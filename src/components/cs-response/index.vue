<template>
  <div>
    <div class="well small">
      <div flex>
        <div flex-box="1">
          <strong>Request URL：</strong>
          <a href="https://www.careyshop.cn" title="" target="_blank">https://www.careyshop.cn</a>
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
        <div class="status-code http-200" title="Response Status Code">200</div>
      </div>
    </div>

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
  .small{
    font-size: 12px;
  }

  .well {
    word-break: break-all;

    a {
      display: inline-flex;
      overflow: hidden;
      white-space: nowrap;
      width: 50%;
    }
  }

  .well {
    padding: 19px;
    min-height: 20px;
    margin-bottom: 10px;
    background-color: #F4F4F5;
    border: 1px solid #E9E9EB;
    border-radius: 4px;
    color: $color-info;
  }

  .status-code {
    font-size: 50px;
    color: #FFF;
    padding: 0 10px;
    border-radius: 4px;
    background-color: black;
    margin: auto;
  }

  .http--1 {
    background-color: $color-danger !important;
  }

  .http-100, .http-101, .http-102 {
    background-color: $color-primary !important;
  }

  .http-200, .http-201, .http-202, .http-203, .http-204, .http-205, .http-206, .http-207, .http-208, .http-226 {
    background-color: $color-success !important;
  }

  .http-300, .http-301, .http-302, .http-303, .http-304, .http-305, .http-306, .http-307, .http-308 {
    background-color: $color-warning !important;
  }

  .http-400, .http-401, .http-402, .http-403, .http-404, .http-405, .http-406, .http-407, .http-408, .http-409, .http-410, .http-411, .http-412, .http-413, .http-414, .http-415, .http-416, .http-417, .http-418, .http-421, .http-422, .http-423, .http-424, .http-426, .http-428, .http-429, .http-431, .http-451 {
    background-color: $color-danger !important;
  }

  .http-500, .http-501, .http-502, .http-503, .http-504, .http-505, .http-506, .http-507, .http-508, .http-510, .http-511 {
    background-color: $color-danger !important;
  }
</style>
