import React from 'react'
import Helmet from 'react-helmet'
import classNames from 'classnames'

import titleStyles from 'common/styles/local/title.scss'
import styles from './AboutView.scss'

export default function AboutView() {
  return (
    <div className="view view__about">
      <Helmet title="About" />

      <h2 className={classNames(styles.title, titleStyles.h2)}>About</h2>
    </div>
  )
}
