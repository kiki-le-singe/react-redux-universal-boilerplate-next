// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#plainroute
// https://webpack.js.org/guides/migrating/#code-splitting-with-es2015

import AppLayout from 'common/layouts/AppLayout'
import HomeRoute from './HomeRoute'
import HelloRoute from './HelloRoute'
import AboutRoute from './AboutRoute'
import NotFoundRoute from './NotFoundRoute'

export default store => ({ // eslint-disable-line
  path: '/',
  component: AppLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    HelloRoute(),
    AboutRoute(),
    NotFoundRoute(),
  ],
})
