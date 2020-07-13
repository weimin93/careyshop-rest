<template>
  <div class="cs-mb">
    <div class="well small">
      <div flex>
        <div flex-box="1" style="width: 70%;">
          <strong>Request URL：</strong>
          <a :href="get(value, 'request.responseURL')" target="_blank">{{get(value, 'request.responseURL', '-')}}</a>
          <br>

          <strong>Request Method：</strong>
          <span>{{get(value, 'config.method', '-').toUpperCase()}}</span>
          <br>

          <strong>Response Time：</strong>
          <span>{{value.millis || '-'}}</span>
          <br>

          <strong>Response Status：</strong>
          <span>{{get(value, 'status')}} - {{get(value, 'statusText')}}</span>
          <br>
        </div>
        <div :class="`status-code http-${get(value, 'status')}`">{{get(value, 'status')}}</div>
      </div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('body')" name="body">
        <cs-highlight class="cs-highlight__body" :code="get(value, 'data') | jsonFormat"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('raw')" name="raw">
        <cs-highlight class="cs-highlight__raw" :code="get(value, 'data') | jsonFormat" :is-raw="true"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('preview')" name="preview">
        <iframe class="response-iframe" :srcdoc="get(value, 'request.response')" frameborder="0"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('headers')" name="headers">
        <cs-highlight :code="get(value, 'headers') | jsonFormat"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('details')" name="details">
        <cs-highlight :code="get(value, 'config') | jsonFormat"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('sign')" name="sign">
        <el-steps direction="vertical" :active="3">
          <el-step :title="$t('sort')">
            <pre class="response-step" slot="description">{{get(value, 'signSteps[0]')}}</pre>
          </el-step>

          <el-step :title="$t('merge')">
            <pre class="response-step" slot="description">{{get(value, 'signSteps[1]')}}</pre>
          </el-step>

          <el-step :title="$t('build')">
            <pre class="response-step" slot="description">{{get(value, 'signSteps[2]')}}</pre>
          </el-step>
        </el-steps>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from 'lodash'

export default {
  name: 'cs-response',
  props: {
    value: {
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      activeName: 'body'
    }
  },
  filters: {
    jsonFormat(value) {
      if (value && typeof value === 'object') {
        return JSON.stringify(value, null, 4)
      }

      return value
    }
  },
  methods: {
    get
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
    background-color: #F8F8F8;
    border: 1px solid #E9E9EB;
    border-radius: 4px;
    color: $color-info;
  }

  .response-iframe {
    width: 100%;
    height: 600px;
  }

  .response-step {
    font-family: inherit;
    margin: 10px 20px;
    white-space: pre-wrap;
    word-break: break-word;
    color: $color-text-main;
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
