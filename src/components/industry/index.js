import React from 'react'
import styles from './index.module.css'

const Industry = (props) => {
    // console.log(props);

  return (
      <div>
        <h3>{props.name}</h3>
        <img src={props.href}/>
      </div>
    
  )
}


export default Industry