import React from 'react'
import styles from './index.module.css'

const LinkComponent = ({type='success', msg='Successfully Updated'}) => {
  return (
    <div className={styles[type]}>
        &#10004; {msg}
    </div>
  )
}

export default LinkComponent