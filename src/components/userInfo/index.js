import React from 'react'
import styles from './index.module.css'

const UserInfo = (props) => {
  

    return props.user.map((el, index)=>{
        console.log(el)
        return(
             <img key={index} src={el.unitId.imgUrl}/>
            
        )
    })
}


export default UserInfo