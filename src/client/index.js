import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import configureStore from '../common/redux/store'
import routes from '../common/routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)
const rootEl = document.getElementById('root')

const renderApp = () => {
  // Sync routes both on client and server
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Router {...renderProps} />
        </Provider>
      </AppContainer>,
      rootEl,
    )
  })
}

// Enable hot reload by react-hot-loader
if (module.hot) {
  module.hot.accept('../common/routes', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(rootEl)
      // reRenderApp()
      renderApp()
    })
  })
}

renderApp()
