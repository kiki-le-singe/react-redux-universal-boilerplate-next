import Koa from 'koa'
import webpack from 'webpack'

import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHotMiddleware from './middleware/webpack-hot'

const webpackConfig = require('./dev.config')

const app = new Koa()
const compiler = webpack(webpackConfig)
const serverOptions = { publicPath: webpackConfig.output.publicPath }

// Use these middlewares to set up hot module reloading via webpack.
app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler))

app.listen(3001, () => {
  console.info('Webpack dev server listening on port 3001')
})
