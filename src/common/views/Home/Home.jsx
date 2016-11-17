import React from 'react'
import Helmet from 'react-helmet'
import Hello from '../../components/Hello'

import styles from './Home.scss'

export default function Home() {
  return (
    <div className={styles.Home}>
      <Helmet title="Home" />
      <Hello />
    </div>
  )
}
