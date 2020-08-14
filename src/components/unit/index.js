import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styles from './index.module.css'
import Grid from '../grid'
import SubmitButton from '../../components/button'
import Input from '../../components/input'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'

const Unit = (props) => {
  
  const history = useHistory();
  const location = useLocation();
  const [showResults, setShowResults] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quantity,setQuantity] = useState(0)
  const context = useContext(UserContext);
  const userId = context.user.id

  const unitinfo =useCallback(() =>{
    return (
      <React.Fragment>
        <table className={styles.moreInfo}>
          <thead>
            <tr>
              <th colSpan={2}>DMG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Attack Defence:</th>
              <td>{props.attackDefence}</td>
            </tr>
            <tr>
              <th>Attack Infantry:</th>
              <td>{props.attackInfantry}</td>
            </tr>
            <tr>
              <th>Attack Armored:</th>
              <td>{props.attackArmored}</td>
            </tr>
            <tr>
              <th>Attack Helicopters:</th>  
              <td>{props.attackHelicopter}</td>
            </tr>
            <tr>
              <th>Attack Fighters:</th>
              <td>{props.attackFighter}</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.moreInfo}>
          <thead>
            <tr>
              <th colSpan={2}>Needed resource</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>mineral</th>
              <td>222222</td>
            </tr>
            <tr>
              <th>Metal</th>
              <td>222222</td>
            </tr>
            <tr>
              <th>Flue</th>
              <td>222222</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{props.population}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
        )
  },[props])
  
  useEffect(() => {
    unitinfo()
  },[unitinfo]);
  
  function test(id){
       let loc = location.pathname.split('/');
       
       let newLoc =loc.filter((el)=> el!==id);
       newLoc.push(id);
       newLoc = newLoc.join('/')
       history.replace(newLoc);
       
  }

  const handleSubmit = ()=>{
    fetch('http://localhost:9999/api/base/army', {
        method: 'POST',
        body: JSON.stringify({
          "userId": userId,
          "unitId": props._id,
          "quantity": quantity
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('x-auth-token')
        } 
      }).then((el)=>{
        setSuccess(true)
        setTimeout(function(){ setSuccess(false); }, 3000)
      })

  }

  return (
    <div className={styles.container}>
      <table className={styles.info}>
        <thead>
          <tr>
            <th>name</th>
            <th>life</th>
            <th>Type:</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{props.name}</td> 
          <td>{props.life}</td>
          <td>{props.typeId.name}</td>
        </tr>
        </tbody>
      </table>
      
      <Grid> 
        <div className={styles.divBuy}>
          <img className={styles.unitImg} alt="imgUnit" src={props.imgUrl} onClick={() => test(props._id)}/>
          <SubmitButton onClick={()=> setShowResults(!showResults)} title={`${showResults?'Hide':'Show'} info`} />
          {/* <button onClick={() => setShowResults(!showResults)} className={styles.buttonInfo}>{!showResults?"Show ":"Hide "}info</button> */}
        </div>
        
        {props.quantity?<h3>Quantity: {props.quantity}</h3>:
        <div className={`${styles.divBuy} ${props.opacity===true?styles.opacity:''}`}>
          <Input
          onChange={e => setQuantity(e.target.value)}
          label="Quantity"
          id="quantity"
          type="number"
          cssName="quantity"
          />
          <SubmitButton  title="Buy"  onClick={()=> handleSubmit()} />
          {success?<h1>uraaaaaaa</h1>:''}
        </div>}
        <div className={`${styles.divBuy} ${!props.opacity===true?styles.opacity:''}`}>
          <h3>You need a building</h3>
        </div>
        
        
        {showResults?unitinfo():''}
        
      </Grid>
     </div>
  )
}

export default Unit
