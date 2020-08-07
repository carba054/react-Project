import React from 'react'
import styles from './index.module.css'


const Unit = (props) => {
  return (
    <div className={styles.container}>
      <img alt="units" className={styles.image} src={props.imgUrl} />
      <div className={styles.info}>
        <span>adsasdasd</span>
        
      </div>
      <div>
        <span>adsasdasd</span>
        
      </div>
      {props.children}
    </div>
  )
}

export default Unit
