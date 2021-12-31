const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  entry: {
    app: './index.js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      // library: { type: 'var', name: 'app' },
      remotes: {
        remoteApp: 'app@http://localhost:3000/remoteEntry'
      },
    })
  ]
};