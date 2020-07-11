<template>
  <pre v-if="!isRaw" class="cs-highlight hljs" v-html="highlightHTML"/>
  <pre v-else class="cs-highlight hljs">{{code}}</pre>
</template>

<script>
// https://highlightjs.org/usage/
// http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
import htmlFormat from './libs/htmlFormat'
import highlight from 'highlight.js'
import './libs/style.github.css'

export default {
  name: 'cs-highlight',
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    },
    formatHtml: {
      type: Boolean,
      required: false,
      default: false
    },
    lang: {
      type: String,
      required: false,
      default: ''
    },
    isRaw: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      highlightHTML: ''
    }
  },
  mounted() {
    this.highlight()
  },
  watch: {
    code() {
      this.highlight()
    }
  },
  methods: {
    highlight() {
      const code = this.formatHtml ? htmlFormat(this.code) : this.code
      this.highlightHTML = highlight.highlightAuto(code, [
        this.lang,
        'html',
        'javascript',
        'json',
        'css',
        'scss',
        'less',
        'xml'
      ]).value
    }
  }
}
</script>

<style scoped>
  .cs-highlight {
    margin: 0;
    border-radius: 4px;
    max-height: 600px;
    font-size: 12px;
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
    padding: 19px;
    border: 1px solid #E9E9EB;
  }

  .cs-highlight__body {
    overflow-y: auto;
    overflow-x: hidden;

    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
  }

  .cs-highlight__raw {
    overflow: auto;
  }
</style>
