module.exports = {
  plugins: [
    require('postcss-smart-import')({ /* ...options */ }),
    require('postcss-sassy-mixins'),
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ })
  ]
}
