import Koa from 'koa'
import compress from 'koa-compress'
import _debug from 'debug'
import serve from 'koa-static'

import handleRender from 'server/utils/render'
import projectConfig from '../../config'

const debug = _debug('app:server:prod')
const app = new Koa()
const { SERVER_HOST, SERVER_PORT } = projectConfig

app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(serve('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

/* ****************
 START THE SERVER
***************** */

app.listen(SERVER_PORT, () => {
  debug(`Koa server listening at http://${SERVER_HOST}:${SERVER_PORT} in production mode`)
})
