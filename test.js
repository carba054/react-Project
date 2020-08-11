import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Unit from '../unit'
import getUnit from '../../utils/units'


const Units = (props) => {
  const [units, setUnits] = useState([])
  const [href, setHref] = useState(undefined)
  const [useId, setUseId] = useState(undefined)
  const location = useLocation();
  
  const getUnits = useCallback(() => {
    //const units = await 
    getUnit(props.kind,props.data).then((units)=>{
      const newUnits = units.map((el)=> el.unitId||el)
      setUnits(newUnits)
    })
    
    
  }, [props.kind,props.data])

  const renderUnits = () => {

    const result = units.filter((el)=> {
        const resfil = el._id === useId || el.typeId.name === href
      return resfil
    })
    const neResult = result.length===0?units:result;
    return neResult.map((unit) => {
      return <Unit key={unit._id} buy={props.buy} {...unit} />
    })
  }
  // return href === unit.typeId.name?
      // <Unit key={unit._id} buy={props.buy} {...unit} />:
      // href === undefined?
      // <Unit key={unit._id} buy={props.buy} {...unit} />:
      // '';
  useEffect(() => {
    const loc = location.pathname.split('/');
    setUseId(loc[loc.length - 1])
    setHref(loc[loc.length - 2])
    //loc[3]?setHref(loc[3]):setHref(loc[2])
  }, [location.pathname])

  useEffect(() => {
    getUnits()
  }, [getUnits])

  return (
      renderUnits()
  )
}

export default Units
