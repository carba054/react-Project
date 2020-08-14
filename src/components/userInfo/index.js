import React from 'react'
import styles from './index.module.css'

const UserInfo = (props) => {
  

    return props.user.map((el, index)=>{
        
        return(
            <React.Fragment key={index}>
        
            <div className={styles.div} >
                <img className={styles.img}  src={el.unitId.imgUrl} alt='img'/>
                <span>quantity:{el.quantity}</span>
            </div>
            </React.Fragment>
            
            
        )
    })
}


export default UserInfo