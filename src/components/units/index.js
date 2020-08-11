import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Unit from '../unit'
import getUnit from '../../utils/units'


const Units = (props) => {
  const [units, setUnits] = useState([])
  const [href, setHref] = useState(undefined)
  const location = useLocation();
  
  const getUnits = useCallback(() => {
    getUnit(props.kind,props.data).then((units)=>{
      const newUnits = units.map((el)=> {
        const quantity =  Object.assign({"quantity":el.quantity}, el.unitId)
        return el.unitId?quantity:el
      })
      setUnits(newUnits)
    })
    
  }, [props.kind,props.data])

  const renderUnits = () => {
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
