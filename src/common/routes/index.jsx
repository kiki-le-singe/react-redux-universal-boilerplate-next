import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import AppLayout from 'common/layouts/AppLayout'
import HomeView from 'common/views/HomeView'
import AboutView from 'common/views/AboutView'
import HelloView from 'common/views/HelloView'

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={HomeView} />
    <Route path="hello" component={HelloView} />
    <Route path="about" component={AboutView} />
    <Redirect from="*" to="hello" />
  </Route>
)
