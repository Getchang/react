/*
 * @Author: your name
 * @Date: 2021-06-24 16:43:02
 * @LastEditTime: 2021-07-08 18:05:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tags/webpack/config/webpack.config.js
 */
const fs = require('fs');
const path = require('path')
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const paths = require('./paths');
const { vendor } = require('postcss');

const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// console.log(appDirectory, resolveApp('public/index.html'), path.resolve(__dirname, './public/index.html'), path.resolve(__dirname, '../src/index.js'))

module.exports = (env, argv) => {
  // console.log(env, argv)
  // console.log(process.env)
  process.env.NODE_ENV = argv.mode
  
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';

  const commonCssLoader = [
    isEnvDevelopment && "style-loader",
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    {
      // 还需要在package.json中定义browserslist
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: () => [require('postcss-preset-env')()]
        }
      }
    }
  ].filter(Boolean)
  
  const config = {
    mode: process.env.NODE_ENV,
    // 解决dev-server不生效，（package,加browersList字段引起）
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    entry: {
      main: paths.appIndexJs
    },
    output: {
      filename: (pathData) => {
        return pathData.chunk.name === 'vendor' ? "static/js/[name].js" : "static/js/[name].[contenthash:8].js"
      },
      chunkFilename:'static/js/[name].[chunkhash:8].js',
      path: paths.appBuild,
      clean: true
    },
    // devtool: isEnvDevelopment ? "eval-source-map" : "cheap-module-source-map",
    devServer: {
      contentBase: paths.appBuild,
      port: 9000,
      hot: isEnvDevelopment,
      compress: true,
      hotOnly: true,
      open: true
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(png|jpg|gif|svg)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    name: 'static/media/[name].[hash:8].[ext]',
                  },
                },
              ]
            },
            {
              test: /\.(js)$/,
              // include: resolveApp('src'),
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', "@babel/preset-react"]
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: [...commonCssLoader]
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use:[...commonCssLoader, "sass-loader"]
      
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },
          isEnvProduction
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
        )
      ),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      isEnvProduction && new BundleAnalyzerPlugin()
    ].filter(Boolean),
    resolve: {
      extensions: paths.moduleFileExtensions
          .map(ext => `.${ext}`)
          .filter(ext => useTypeScript || !ext.includes('ts')),

      alias: {
        '@': paths.appSrc
      }
    },
    optimization: {
      minimize: true,
      // chunkIds: 'named',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 300,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            name: 'vendor',
            chunks: "initial",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          common:{
            chunks: "all",
            name: 'common',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          }
        }
      }
    }
  }
  // console.log(commonCssLoader, config)
  return config
}