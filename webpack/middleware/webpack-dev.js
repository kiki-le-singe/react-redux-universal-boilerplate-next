import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import convert from 'koa-convert'

export default function (compiler, options) {
  const webpackDevMiddlewareOptions = {
    ...options,
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
    },
    hot: true,
    lazy: false,
    historyApiFallback: true,
    contentBase: 'http://localhost:3001',
    headers: { 'Access-Control-Allow-Origin': '*' },
  }

  return convert(koaWebpackDevMiddleware(compiler, webpackDevMiddlewareOptions))
}
