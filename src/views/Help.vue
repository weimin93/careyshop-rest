<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :title="$t('help-1-1')" name="1">
      <div>{{$t('help-1-2')}}</div>
    </el-collapse-item>

    <el-collapse-item :title="$t('help-2-1')" name="2">
      <div>{{$t('help-2-2')}}</div>
    </el-collapse-item>

    <el-collapse-item :title="$t('help-3-1')" name="3">
      <div>{{$t('help-3-2')}}</div>
    </el-collapse-item>

    <el-collapse-item :title="$t('help-4-1')" name="4">
      <div>{{$t('help-4-2')}}</div>
      <div>{{$t('help-4-3')}}</div>
    </el-collapse-item>

    <el-collapse-item :title="$t('help-5-1')" name="5">
      <div>{{$t('help-5-2')}}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'Help',
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5']
    }
  }
}
</script>
