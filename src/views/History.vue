<template>
  <div>历史记录</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapState('careyshop/history', [
      'history'
    ])
  },
  data() {
    return {
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
    async loadHistory() {
      await this.load()
    }
  }
}
</script>

<style scoped>
</style>
