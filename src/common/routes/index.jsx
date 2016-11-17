import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../layouts/App'
import Home from '../views/Home'

// export default function createRoutes() {
//   return {
//     component: App,
//     childRoutes: [
//       {
//         path: '/',
//         component: require('../views/Home').default,
//       },
//     ],
//   }
// }

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
  </Route>
)
