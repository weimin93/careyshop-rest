// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@static': resolve('public/static')
    }
  }
}
