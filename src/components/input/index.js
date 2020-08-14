import React from 'react'
import styles from './index.module.css'
const Input = ({label, id, value, onChange, type, cssName}) => {
  
  return (
    
    <div className={styles[`${cssName}`]}>
      <label htmlFor={id}>
        {label}:
        <input type={type || 'text'} id={id} value={value} onChange={onChange} />
      </label>
    </div>
  )

}

export default Input