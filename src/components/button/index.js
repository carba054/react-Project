import React from 'react'
import styles from './index.module.css'

const SubmitButton = ({ title, onClick, cssType = "btn"}) => {
  return (
    <button className={styles[`${cssType}`]} type="submit" onClick={onClick}>{title}</button>
  )
}


export default SubmitButton