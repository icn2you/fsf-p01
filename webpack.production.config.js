const path = require('path');
//terser-webpack-plugin is included for production mode by default
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/javascript/index.js', './src/sass/main.scss'],
  output: {
    filename: 'javascript/bundle.js',
    path: path.resolve(__dirname, './assets'),  // Must be an absolute path
    publicPath: 'assets/'
  },
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: '11'
                  }
                }
              ]
            ] // presets END
          }
        }
      },
      // css/sass-loaderの設定
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  grid: true
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
};