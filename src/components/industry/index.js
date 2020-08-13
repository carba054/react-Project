import React from 'react'
import styles from './index.module.css'
import DivGrid from '../grid'

const Industry = ({factory, baseFactory={}, opacity}) => {
     
  return (
      <div className={styles.container}>
        <h3>{factory.name}</h3>
        <h3>{opacity?"unlocked":"unlock"}: {factory.unlock.name} units</h3>
        <h3>baseFactory:{baseFactory.quantity}</h3>
        <DivGrid>
        <img className={`${styles.factoryImg} ${!opacity?styles.opacity:''}` } src={factory.href}/>
        <div>
          <button>{opacity?'lvl up':'build'}</button>
        </div>
        
        </DivGrid>
        
        
      </div>
    
  ) 
}


export default Industry