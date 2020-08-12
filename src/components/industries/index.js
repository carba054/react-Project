import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './index.module.css'
import Industry from '../industry'
import getData from '../../utils/data'
import UserContext from '../../Context'


const Industryes = () => {

  const [factories, setFactories] = useState([])

  const [base, setBase] = useState(null);
   const context = useContext(UserContext);
   const userId = context.user.id
   
   
  useEffect(() => {
    getData(`base/${userId}`).then((result)=>{
      console.log(result)
    })
  }, [])

  const getFactories = useCallback(() => {
    getData("factory").then((factory)=>{
      setFactories(factory)
    })
    
  }, [])

  useEffect(() => {
    getFactories()
  }, [getFactories])



  const renderFactories = () => {
    return factories.map((factory) => {
      return <Industry key={factory._id} {...factory} />
    })
  }
  return (
    // <Industry/>
    renderFactories()
    
  )
}


export default Industryes