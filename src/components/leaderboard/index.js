import React, {useState, useCallback, useEffect} from 'react'
import styles from './index.module.css'

import getGenerals from '../../utils/data'
import DivGrid from '../../components/grid'
import UserInfo from '../../components/userInfo'
const Leaderboard = () => {
    const [army, setArmy] = useState([])
    const [user, setUser] = useState([])
    const [showResults, setShowResults] = useState(false)
  
    const getArmy = useCallback(() => {
      getGenerals("base").then((generals)=>{
        // const newUnits = generals.map((el)=> {
        //   const quantity =  Object.assign({"quantity":el.quantity}, el.unitId)
        //   return el.unitId?quantity:el
        // })
        // console.log(newUnits)
        setArmy(generals)
      })
    }, [])
    
    useEffect(() => {
      getArmy()
    }, [getArmy])
  
    
    const view = (units) =>{
        
        setShowResults(!showResults)
        setUser(units)
    }
    const viewUser =()=>{
        return <UserInfo user={user.units}/>   
    }
    
    

  
    const renderArmy = () => {
      // const result = army.filter((el)=> el._id === href || el.typeId.name === href)
      // const neResult = result.length===0?army:result;
      return army.map((unit,index) => {
        // console.log(unit)
        return (
              <tr key={index}>
                <td>{unit.userId.username}</td> 
                <td>{unit.userId.wins}</td> 
                <td>{unit.userId.losses}</td> 
                <td>{unit.userId.currentPopulation}</td> 
                <td><button onClick={() => view(unit)}>View</button></td>
                <td><button>Attack</button></td> 
              </tr>)
        //return <Unit key={unit._id} buy={props.buy} {...unit} />
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
            {showResults?viewUser():''}
        </DivGrid>
    </React.Fragment>
    
  )
}


export default Leaderboard