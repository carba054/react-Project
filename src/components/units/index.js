import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Unit from '../unit'
import getData from '../../utils/data'
import UserContext from '../../Context'


const Units = (props) => {
  const [units, setUnits] = useState([])
  const [href, setHref] = useState(undefined)
  const location = useLocation();
  const context = useContext(UserContext);
  const userId = context.user.id

  const getUnits = useCallback(() => {

    Promise.all([
      
      getData(props.kind),
      getData(`base/factory/${userId}`)
    ])
    .then(([units,base])=>{
      
      const newUnits = props.kind === undefined?units:
      units.map((el)=>{
        return {...el.unitId,"quantity":el.quantity}
      })
      
      const finalUnits = newUnits.map((el)=> {
        
        const baseFactory = base.find((fac)=> fac.factoryId!==null && fac.factoryId.unlock._id === el.typeId._id)
          //console.log(baseFactory)
        return {...el,"opacity":!baseFactory?true:false}
      })
      
      setUnits(finalUnits)
    })
    
  }, [props.kind,userId])

  const renderUnits = () => {
    //console.log(units)
    // const newUnits = units.length === 1?[units[0].units[0].unitId]:units;
    
    const result = units.filter((el)=> el._id === href || el.typeId.name === href)
    const neResult = result.length===0?units:result;
    
    return neResult.length!==0?neResult.map((unit) => {
      
     // console.log(`${unit.opacity} : ${unit.name}`)
        return <Unit key={unit._id} buy={props.buy} {...unit} />
    }):'You dont have units'
    
  }

  useEffect(() => {
    const loc = location.pathname.split('/');
    setHref(loc[loc.length - 1])
  }, [location.pathname])


  useEffect(() => {
    getUnits()
  }, [getUnits])

  return (
      renderUnits()
  )
}

export default Units
