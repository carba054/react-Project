import React from 'react'
import styles from './index.module.css'

const DivGrid = (props) => {
  const cssName = props.cssName || "twoColumns"
  return (
   <div className={styles[cssName]}>
       {props.children}
   </div>
  )
}


export default DivGrid