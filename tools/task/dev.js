import webpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import chalk from 'chalk'
import getConfig from '../webpack/webpack.config'

const webpackConfig = getConfig('development')
console.log(webpackConfig)
const host = '127.0.0.1'
const port = 9902
const { publicPath } = webpackConfig.output
const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, {
  host,
  open: true,
  disableHostCheck: true,
  // proxy,
  // clientLogLevel: 'error',
  // noInfo: true,
  compress: true,
  publicPath,
  historyApiFallback: true,
  hot: true,
  // Stats配置项在nodejs API调用的情况下无效，for webpack-dev-server需要写在devServer
  // https://webpack.js.org/configuration/stats/
  stats: webpackConfig.stats,
})

server.listen(port, host, err => {
  if (err) {
    return console.info(chalk.red(err.trace()))
  }
  console.log('\n')
  console.log(chalk.cyan('Starting the development server...\n'))
  console.log(chalk.cyan(`Server start at ${chalk.magenta.underline(`http://${host}:${port}`)}\n`))
})
