import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { mergeModleToEntry } from '../utils'

const assetsName = '[name]_[sha512:hash:base64:7].[ext]'
const reStyle = /\.(css|sass|scss)$/

const getConfig = (mode = 'development') => {
  const isDev = mode === 'development'
  return {
    mode,
    context: path.resolve(process.cwd(), './src'),
    entry: mergeModleToEntry(['./index.tsx'], [`webpack-dev-server/client`, 'webpack/hot/only-dev-server']),
    watch: isDev,
    bail: !isDev,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        name: 'vender',
      },
    },
    output: {
      path: '/dist',
      publicPath: '',
      filename: '[name].[hash:7].js',
      chunkFilename: '[name].[chunkhash:7].js', //非入口文件的命名规则
    },
    resolve: {
      // alias: {},
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.d\.ts$/,
          loader: 'ignore-loader',
        },
        {
          test: /(?<!\.d)\.tsx?$/,
          loader: ['babel-loader', 'ts-loader', 'eslint-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.js[x]?$/,
          loader: ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/,
        },

        {
          test: reStyle,
          rules: [
            !isDev
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: envConf.assetsPublicPath !== undefined ? envConf.assetsPublicPath : '../',
                    hmr: false,
                  },
                }
              : { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js',
                },
              },
            },
            {
              test: /\.(sass|scss)$/,
              loader: 'sass-loader',
            },
          ],
        },

        // html
        {
          test: /\.html/,
          exclude: /index\.html/,
          loader: 'html-loader',
        },

        // json
        {
          test: /\.json$/,
          exclude: /node_modules/,
          use: 'json-loader',
        },

        // images
        {
          test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
          oneOf: [
            // Inline lightweight images into CSS
            {
              issuer: reStyle,
              oneOf: [
                // Inline lightweight SVGs as UTF-8 encoded DataUrl string
                {
                  test: /\.svg$/,
                  loader: 'svg-url-loader',
                  options: {
                    name: assetsName,
                    limit: 2048, // 2kb
                  },
                },

                // Inline lightweight images as Base64 encoded DataUrl string
                {
                  loader: 'url-loader',
                  options: {
                    name: assetsName,
                    limit: 2048, // 2kb
                  },
                },
              ],
            },
            // Or return public URL to image resource
            {
              loader: 'file-loader',
              options: {
                name: assetsName,
              },
            },
          ],
        },

        // files
        {
          test: /\.(swf|woff2?|eot|ttf|otf)$/,
          loader: 'file-loader',
          query: {
            // limit: 10000,
            name: assetsName,
          },
        },

        // video
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: assetsName,
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: [
      // new webpack.DefinePlugin({}),
      new ProgressBarPlugin(),
      // new webpack.ProvidePlugin(),
      new WebpackNotifierPlugin({
        title: 'Webpack compile successfully!',
        alwaysNotify: true,
      }),
      new webpack.NamedModulesPlugin(),
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        template: path.join(process.cwd(), './src/index.html'),
      }),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
      }),
      new BundleAnalyzerPlugin(),
    ],
    stats: {
      colors: true,
      assets: !isDev,
      entrypoints: !isDev,
      chunkGroups: !isDev,
      modules: !isDev,
      chunks: !isDev,
      chunkModules: !isDev,
      chunkOrigins: !isDev,
      depth: !isDev,
      env: !isDev,
      reasons: !isDev,
      usedExports: !isDev,
      providedExports: !isDev,
      optimizationBailout: !isDev,
      errorDetails: !isDev,
      publicPath: !isDev,
      logging: 'none',
      exclude: !isDev,
      maxModules: Infinity,
    },
    performance: {
      hints: false,
    },
  }
}

export default getConfig
