import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styles from './index.module.css'
import Grid from '../grid'


const Unit = (props) => {
  
  const history = useHistory();
  const location = useLocation();
  
  function test(id){
      // let loc = ['']
      // loc.push(location.pathname.split('/')[1],type,id)
      // loc = loc.join('/');
      // 
       let loc = location.pathname.split('/');
       
       let newLoc =loc.filter((el)=> el!=id);
       newLoc.push(id);
       newLoc = newLoc.join('/')
       history.replace(newLoc);
       
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
      {/* <Grid cssName={"twoColumns"}>
      
      </Grid> */}
      <Grid cssName={"twoColumns"}>
        <img className={styles.unitImg} alt="imgUnit" src={props.imgUrl} onClick={() => test(props._id)}/>
        <h3>{props.quantity?`Quantity: ${props.quantity}`:""}</h3>
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
            {props.buy?<tr><th colSpan={2}><input type="number" name="buy" className={styles.inputBuy}/><button>Buy</button></th></tr>:null}
          </tbody>
        </table>
      </Grid>
    </div>
    
  )
}

export default Unit
