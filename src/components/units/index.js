import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './index.module.css'
import Unit from '../unit'
import getUnit from '../../utils/units'


const Units = (props) => {
  const [units, setUnits] = useState([])
  const [href, setHref] = useState(undefined)
  const location = useLocation();

  
  const getUnits = useCallback(async () => {
    const units = await getUnit()
    setUnits(units)
  }, [])

  const renderUnits = () => {
    return units.map((origam, index) => {
      return href === origam.typeId.name?
      <Unit key={origam._id} index={index} {...origam} />:
      href === undefined?
      <Unit key={origam._id} index={index} {...origam} />:
      '';

    })
  }
  

  useEffect(() => {
    getUnits()
    setHref(location.pathname.split('/')[2])
  }, [props.updatedUnit, getUnits, location.pathname])

  return (
    <div className={styles["units-wrapper"]}>
      {renderUnits()}
    </div>
  )
}

export default Units
