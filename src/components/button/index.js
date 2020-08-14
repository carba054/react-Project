import React from 'react'
import styles from './index.module.css'

const SubmitButton = ({ title, onClick, cssType = "btn" ,disabled= false}) => {
  return (
    <button className={styles[`${cssType}`]} type="submit" onClick={onClick} disabled={disabled}>{title}</button>
  )
}


export default SubmitButton