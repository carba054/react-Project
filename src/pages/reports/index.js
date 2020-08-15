import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PageLayout from '../../components/page-layout'
// import Units from '../../components/units'
import Btn from '../../components/button'
import UserContext from '../../Context'
import Title from '../../components/title'
import DivGrid from '../../components/grid'
import styles from './index.module.css'
import getReports from '../../utils/data'


const ReportsPage = (props) => {
    const [myReport, setMyReport] = useState([])
    const context = useContext(UserContext)
    const userId = context.user.id

  const getMyReport = useCallback(() => {
    getReports(`base/reports/${userId}`).then((report)=>{
        console.log(report)
        setMyReport(report)
    })
    
  }, [userId])

  
  useEffect(() => {
    getMyReport()
  }, [getMyReport])

  const attacks = () => {

    console.log(myReport)
    let useDhis = myReport.length ===0?[]:myReport.attacker;
    console.log(myReport.attacker)
    return useDhis.map((rep,index) => {
        
        return (
          <React.Fragment key={index}>
              <h3>{rep.attackerInfo[0].attUnitId}</h3>
              <Btn  title="info"/>
          </React.Fragment>
              
              )
      })
  }
  const defends = () => {
    
        let useDhis = myReport.length ===0?[]:myReport.defender;
        return useDhis.map((rep,index) => {
            
            return (
              <React.Fragment key={index}>
                  <h3>{rep._id}</h3>
                  <Btn  title="info"/>
              </React.Fragment>
                  
                  )
          })
  }

  
//   const getData = useCallback(async () => {
//     const id = params.userid
//     const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

//     if(!response.ok) {
//       history.push('/error')      
//     } else {
      
//       const user = await response.json()
//       setUsername(user.username)
//       setPosts(user.posts && user.posts.length)
      
//     }
//   }, [params, history])
  
//   useEffect(() => {
//     getData()
//   }, [getData])

//   if(!username) {
//     return (
//       <PageLayout>
//         <div>Loading....</div>
//       </PageLayout>
//     )
//   }

  return (
      
    
    <PageLayout>
     <Title title="Reports" />
     <DivGrid>
            <div className={styles["container"]}>
            <h3>My Attacks</h3>
            <Btn  title="Info"/>
            </div>
            <div className={styles["container"]}>
            <h3>My Defences</h3>
            {defends()}
            </div>
        </DivGrid>
    </PageLayout>
        
        
      
  )
}

export default ReportsPage