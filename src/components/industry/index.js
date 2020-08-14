import React from 'react'
import styles from './index.module.css'
import DivGrid from '../grid'

const Industry = (props) => {
     
  
  return (
      <div className={styles.container}>
        <h3>{props.factory.name}</h3>
        <h3>{props.opacity?"unlocked":"unlock"}: {props.factory.unlock.name} units</h3>
        <h3>baseFactory:{props.baseFactory?props.baseFactory.quantity:''}</h3>
        <DivGrid>
        <img className={`${styles.factoryImg} ${!props.opacity?styles.opacity:''}` } src={props.factory.href} alt='img'/>
        <div>
          {props.children}
        </div>
        
        </DivGrid>
        
        
      </div>
    
  ) 
}


export default Industry