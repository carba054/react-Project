import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import DivGrid from '../../components/grid'
import styles from './index.module.css'
import Units from '../../components/units'
import UserContext from '../../Context'

const Publications = () => {

  const [href, setHref] = useState("")
  // const [href, setHref] = useState(undefined)

  const history = useHistory()
  const context = useContext(UserContext)


  useEffect (() => {
    history.push("/home/"+href);
  },[href,history])

  
  return (
    <PageLayout>
      <Title title="Base" />
      <DivGrid cssName={"twoColumns"}>
        <div className={styles.col} onClick={() =>setHref("factory")}>
          <Title title="Factory" /> 
          <img className={styles.colImg} src="https://i.ibb.co/pzJW9Zt/factory.jpg" alt="factory"/>
        </div>
        <div className={styles.col} onClick={() =>setHref("army")}>
          <Title title="Army" />
          <img className={styles.colImg} src="https://i.ibb.co/KhyCCYj/army.jpg" alt="army"/>
        </div>


        {/* <Units href={"?userId="+context.user.id}/> */}
      </DivGrid>
    </PageLayout>
  )
}


export default Publications
