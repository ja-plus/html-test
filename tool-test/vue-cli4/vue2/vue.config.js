const child_process = require('child_process');
let buf = child_process.execSync('git log -n 1')
// const webpack = require('webpack');
process.env.VERSION = buf.toString()
console.log(process.env.BASE_URL);

module.exports = {
  chainWebpack:config => {
    config.plugin('html').tap(args => {
      args[0]['templateParameters'].VERSION = JSON.stringify(process.env.VERSION)
      return args;
    })
  }
}