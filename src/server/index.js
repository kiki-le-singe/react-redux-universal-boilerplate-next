import WebpackIsomorphicTools from 'webpack-isomorphic-tools'

import isomorphicToolsConfig from '../../webpack/isomorphic.tools.config'

const dirRoot = require('path').join(process.cwd())

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEV__ = process.env.NODE_ENV !== 'development'
global.__PROD__ = process.env.NODE_ENV !== 'production'

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools#mainjs
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .server(dirRoot, () => {
    if (__DEV__) {
      require('./server.dev')
    } else {
      require('./server.prod')
    }
  });
