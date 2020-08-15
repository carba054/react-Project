import React, {useState, useCallback, useEffect, useContext} from 'react'
import styles from './index.module.css'

import getGenerals from '../../utils/data'
import DivGrid from '../../components/grid'
import UserInfo from '../../components/userInfo'
import SubmitButton from '../../components/button'
import SuccessDiv from '../successDiv'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'

const Leaderboard = () => {
    const [army, setArmy] = useState([])
    const [user, setUser] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [success,setSuccess] = useState(false)
    const context = useContext(UserContext);
    const userId = context.user.id

    const getArmy = useCallback(() => {
      getGenerals("base").then((generals)=>{
        setArmy(generals)
      })
    }, [])
    
    useEffect(() => {
      getArmy()
    }, [getArmy])
  
    
    const view = useCallback((units=user) =>{
        
        setShowResults(!showResults)
        setUser(units)
    },[user,showResults])
    
    
    const viewUser = ()=>{
        return <div><h3>Name:{user.userId.username}</h3><UserInfo user={user.units}/></div> 
    }
    
    const handleSubmit = (defenderId)=>{
      fetch('http://localhost:9999/api/base/attack', {
          method: 'POST',
          body: JSON.stringify({
            "userId": userId,
            "defenderId": defenderId,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('x-auth-token')
          } 
        }).then(promise => {
          return promise.json()
        }).then(response => {
          setSuccess(true)
          setUser(response)
          setTimeout(function(){ setSuccess(false); }, 2000)
        })
  
    }

  
    
  
    const renderArmy = () => {
      return army.map((unit,index) => {
        return (
          <React.Fragment key={index}>
              <tr>
                <td>{unit.userId.username}</td> 
                <td>{unit.userId.wins}</td> 
                <td>{unit.userId.losses}</td> 
                <td>{unit.userId.currentPopulation}</td>
                
                <td>{userId !== unit.userId._id?<SubmitButton title='View' onClick={() => view(unit)}/>:''}</td>
                <td>{userId !== unit.userId._id?<SubmitButton title='Attack' onClick={() => handleSubmit(unit.userId)} />:''}</td>
              </tr>
              
          </React.Fragment>
              
              )
      })
     
    }

  return (
    <React.Fragment>
        <DivGrid cssName="ranking">
            <div className={styles.container}>
                <table className={styles.tableRank}>
                <thead>
                    <tr>
                      <th>name</th>
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Points</th>
                      <th>View</th>
                      {/* <th>Send msg</th> */}
                      <th>Attack</th>
                    </tr>
                </thead>
                <tbody>
                {renderArmy()}
                
                </tbody>
                </table>
                
            </div>
            {success?<SuccessDiv msg='Successful Attack'/>:showResults?viewUser():''}
            
            
        </DivGrid>
    </React.Fragment>
    
  )
}


export default Leaderboard