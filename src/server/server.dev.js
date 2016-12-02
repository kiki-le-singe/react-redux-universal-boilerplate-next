import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Koa from 'koa'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import convert from 'koa-convert'
import _debug from 'debug'
import projectConfig from '../../config'

// import createRoutes from '../common/routes'
import routes from '../common/routes'
import configureStore from '../common/redux/store'
import Html from './components/Html/Html'

const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = projectConfig
const debug = _debug('app:server:dev')

const handleRender = (ctx) => {
  if (__DEV__) webpackIsomorphicTools.refresh()

  const store = configureStore()

  const _ctx = ctx
  const { url: location } = _ctx

  const memoryHistory = createMemoryHistory(_ctx.url)
  // const routes = createRoutes(store)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      _ctx.status = 500
      _ctx.body = error.message
    } else if (redirectLocation) {
      _ctx.status = 302
      _ctx.redirect(`${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      )

      // Send the rendered page back to the client
      _ctx.type = 'html'
      _ctx.status = 200
      _ctx.body = Html(content)
    } else {
      _ctx.status = 404
      _ctx.body = 'Not found'
    }
  })
}

const app = new Koa()

app.use(serve('public'))

app.use(convert(proxy({
  host: `http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`,
  match: /^\/dist\//,
})))

// This is fired every time the server side receives a request
app.use(handleRender)

/* ****************
 START THE SERVER
***************** */

app.listen(3000, () => {
  debug(`Koa server listening at http://${SERVER_HOST}:${SERVER_PORT} in ${app.env} mode`)
})
