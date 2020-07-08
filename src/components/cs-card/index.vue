<template>
  <el-card shadow="never" :class="{'hide-body': isHide, 'cs-mb': true}">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <i :class="`el-icon-arrow-${isHide ? 'down' : 'right'} expanded`" @click="isHide = !isHide"/>
    </div>
    <slot/>
  </el-card>
</template>

<script>
export default {
  name: 'cs-card',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    expanded: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    expanded: {
      handler(val) {
        this.isHide = val
      },
      immediate: true
    }
  },
  data() {
    return {
      isHide: undefined
    }
  }
}
</script>

<style scoped lang="scss">
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .expanded {
    font-size: 13px;
    cursor: pointer;
    float: right;
    padding: 3px 0;
  }

  .hide-body {
    /deep/ .el-card__header {
      border-bottom: none;
    }

    /deep/ .el-card__body {
      display: none;
    }
  }
</style>
