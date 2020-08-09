import React from 'react'
import styles from './index.module.css'

const DivGrid = (props) => {
  return (
   <div className={styles[props.cssName]}>
       {props.children}
   </div>
  )
}


export default DivGrid