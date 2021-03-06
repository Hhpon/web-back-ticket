const path = require('path');
// const PostCompilePlugin = require('webpack-post-compile-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'views': '@/views',
        'common': '@/common',
        'api': '@/api',
        // 'base': '@/base'
      }
    }
  },
}
