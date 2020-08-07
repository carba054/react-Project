import React from 'react'
import Header from '../header'
import styles from './index.module.css'
import Aside from '../aside'
import Footer from '../footer'

const PageLayout = (props) => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Aside />
        <div className={styles['inner-container']}>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Industrial_factory.png" alt="Girl in a jacket" width="200" /> */}
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PageLayout
