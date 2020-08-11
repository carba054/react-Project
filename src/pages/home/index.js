import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import DivGrid from '../../components/grid'
import styles from './index.module.css'
// import UserContext from '../../Context'

const Publications = () => {

  const [href, setHref] = useState('/home')

  const history = useHistory()
  // const context = useContext(UserContext)


  useEffect (() => {
    history.replace(href);
    
  },[href,history])

  
  return (
    <PageLayout>
      <Title title="Base" />
      <DivGrid cssName={"twoColumns"}>
        <div className={styles.col} onClick={() =>setHref("/home/industrial")}>
          <Title title="Industrial" /> 
          <img className={styles.colImg} src="https://i.ibb.co/pzJW9Zt/factory.jpg" alt="industrial"/>
        </div>
        <div className={styles.col} onClick={() =>setHref("/home/army")}>
          <Title title="Army" />
          <img className={styles.colImg} src="https://i.ibb.co/KhyCCYj/army.jpg" alt="army"/>
        </div>

        {/* {href.split('/')[2] === 'army'?<Units apiHref={"?userId="+context.user.id}/>:''} */}
      </DivGrid>
    </PageLayout>
  )
}


export default Publications
