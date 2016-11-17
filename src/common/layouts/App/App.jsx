import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import config from '../../config'

import '../../styles/normalize.css'
import styles from './App.scss'

const propTypes = {
  children: PropTypes.object,
}

function App(props) {
  return (
    <div className={styles.App}>
      <Helmet {...config.app} />
      <div className={styles.header}>
        <img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
        <h1>{config.app.title}</h1>
      </div>
      <hr />
      {props.children}
    </div>
  )
}

App.propTypes = propTypes

export default App
