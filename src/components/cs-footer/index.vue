<template>
  <div class="cs-footer cs-tc">
    <span>Copyright &copy; 2017-2020 宁波互明科技有限公司 All rights reserved.</span>
    <p><a href="https://www.careyshop.cn" target="_blank">www.careyshop.cn</a></p>
  </div>
</template>

<script>
export default {
  name: 'cs-footer'
}
</script>

<style scoped lang="scss">
  .cs-footer {
    font-size: 13px;
    color: $color-info;

    span {
      display: block;
    }

    a {
      color: $color-info !important;
    }
  }
</style>
