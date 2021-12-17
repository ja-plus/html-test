/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  type: 'development',
  mount: {
    src: '/dist',
    public: '/'
  },
  plugins: []
};