import React, { useState, useCallback, useEffect, useContext } from 'react'
// import { useLocation } from 'react-router-dom'
// import styles from './index.module.css'
import Industry from '../industry'
import getData from '../../utils/data'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'
import SubmitButton from '../../components/button'
const Industryes = () => {

  const [factories, setFactories] = useState([]) 
  const [base, setBase] = useState([])
  const [flag, setFlag] = useState(false)
  const context = useContext(UserContext);
  const userId = context.user.id
   
   
  const getFactories = useCallback( () => {
    Promise.all([
    getData("factory"),
    getData(`base/factory/${userId}`)
    ]).then(([factory,baseResult])=>{
      setFactories(factory)
      
      setBase(baseResult)
      setFlag(false)
    })
    
  },[userId])

  useEffect(() => {
    getFactories()
  }, [getFactories,flag])


    const handleSubmit = (id,quantity) => {
     
      fetch('http://localhost:9999/api/base/factory', {
        method: 'POST',
        body: JSON.stringify({
          "userId": userId,
          "factoryId": id,
          "quantity": quantity
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('x-auth-token')
        } 
      }).then((el)=>setFlag(true))

  } 


  const renderFactories = () => {
    return factories.map((factory) => {
      const baseFactory = base.find((el)=> el.factoryId!==null && el.factoryId._id === factory._id)
      return  <Industry key={factory._id} factory={factory} baseFactory={baseFactory} opacity={baseFactory?true:false}>
                <SubmitButton onClick={()=> handleSubmit(factory._id,baseFactory?baseFactory.quantity:0)} title={baseFactory?'lvl up':'build'} disabled={!flag?false:true}/>
              </Industry>
    })
  }
  return (
    // <Industry/>
    renderFactories()
    
  )
}


export default Industryes