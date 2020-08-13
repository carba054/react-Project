import React, {useState, useCallback, useEffect} from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
// import UserContext from '../../Context'
import styles from './index.module.css'
import getGenerals from '../../utils/data'
const Publications = () => {

  // const userId = useContext(UserContext).user.id
  const [army, setArmy] = useState([])
  
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


  const renderArmy = () => {
    // const result = army.filter((el)=> el._id === href || el.typeId.name === href)
    // const neResult = result.length===0?army:result;
    return army.map((unit,index) => {
      console.log(unit)
      return (
            <tr key={index}>
              <td>{unit.userId.username}</td> 
              <td>{unit.userId.wins}</td> 
              <td>{unit.userId.losses}</td> 
              <td>{unit.userId.currentPopulation}</td> 
              <td><button>View</button></td> 
              {/* <td><button>Attack</button></td>  */}
              <td><button>Attack</button></td> 
            </tr>)
      //return <Unit key={unit._id} buy={props.buy} {...unit} />
    })
   
  }

  return (
    <PageLayout>
      <Title title="Ranking" />
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
    </PageLayout>
  )
}


export default Publications

