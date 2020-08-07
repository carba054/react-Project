import React, { useState, useCallback, useEffect } from 'react'
import styles from './index.module.css'
import Unit from '../unit'
import getUnit from '../../utils/units'


const Units = (props) => {
  const [units, setUnits] = useState([])
  
  const getUnits = useCallback(async () => {
    const units = await getUnit(props.length)
    setUnits(units)
  }, [props.length])

  const renderUnits = () => {
    return units.map((origam, index) => {
      return (
        <Unit key={origam._id} index={index} {...origam} />
      )
    })
  }

  useEffect(() => {
    getUnits()
  }, [props.updatedUnit, getUnits])

  return (
    <div className={styles["units-wrapper"]}>
      {renderUnits()}
    </div>
  )
}

export default Units
