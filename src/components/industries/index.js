import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './index.module.css'
import Industry from '../industry'
import getData from '../../utils/data'
import UserContext from '../../Context'


const Industryes = () => {

  const [factories, setFactories] = useState([]) 

  const [base, setBase] = useState([]);
   const context = useContext(UserContext);
   const userId = context.user.id
   
   
  // useEffect(() => {
  //   getData(`base/factory/${userId}`).then((result)=>{
  //     console.log(result)
  //   })
  // }, [])

  
  const getFactories = useCallback(() => {
    Promise.all([
    getData("factory"),
    getData(`base/factory/${userId}`)
    ]).then(([factory,baseResult])=>{
      setFactories(factory)
      
      setBase(baseResult)
      
    })
    
  }, [])

  useEffect(() => {
    getFactories()
  }, [getFactories])



  const renderFactories = () => {
    return factories.map((factory) => {
        
      const baseFactory = base.find((el)=> el.factoryId!==null && el.factoryId._id === factory._id)
      //console.log(baseFactory)
      return <Industry key={factory._id} factory={factory} baseFactory={baseFactory} opacity={baseFactory?true:false}/>
    })
  }
  return (
    // <Industry/>
    renderFactories()
    
  )
}


export default Industryes