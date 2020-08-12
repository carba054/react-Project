import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Unit from '../unit'
import getData from '../../utils/data'


const Units = (props) => {
  const [units, setUnits] = useState([])
  const [href, setHref] = useState(undefined)
  const location = useLocation();
  
  const getUnits = useCallback(() => {
    getData(props.kind,props.data).then((units)=>{
      
      const newUnits = props.kind === undefined?units:units.map((el)=>{ return {...el.unitId,"quantity":el.quantity}})
      // const result = units.map((el)=> {
      //   const quantity =  Object.assign({"quantity":el.quantity}, el.unitId)
      //   return el.unitId?quantity:el
      // })
      setUnits(newUnits)
    })
    
  }, [props.kind,props.data])

  const renderUnits = () => {
    //console.log(units)
    // const newUnits = units.length === 1?[units[0].units[0].unitId]:units;
    
    const result = units.filter((el)=> el._id === href || el.typeId.name === href)
    const neResult = result.length===0?units:result;
    return neResult.map((unit) => {
        return <Unit key={unit._id} buy={props.buy} {...unit} />
    })
    
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
