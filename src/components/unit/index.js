import React, {  useState,  useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styles from './index.module.css'
import Grid from '../grid'
import SubmitButton from '../../components/button'
import Input from '../../components/input'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'
import SuccessDiv from '../successDiv'

const Unit = (props) => {
  
  const history = useHistory();
  const location = useLocation();
  const [showResults, setShowResults] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quantity,setQuantity] = useState(0)
  const context = useContext(UserContext);
  const userId = context.user.id

  // const [user,setUser] = useState(false)

  const unitinfo =() =>{
    
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
              <th>Metal</th>
              <td>{props.metal}</td>
            </tr>
            <tr>
              <th>Mineral</th>
              <td>{props.mineral}</td>
            </tr>
            <tr>
              <th>Fuel</th>
              <td>{props.fuel}</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{props.population}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
        )
  }
  
  // useEffect(() => {
  //   unitinfo()
  // },[unitinfo]);
  
  function unitFIlter(id){
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
      }).then((result)=>{
        // if(!result.ok) {
        //         console.log('da')      
        //   } else {
        //     console.log('ne')    
            
        //   }
        setSuccess(true)
        setQuantity(0)
        context.updateUser()
        setTimeout(function(){ setSuccess(false); }, 2000)
      })
      
      .catch((err)=>console.log(err))
      //setUser(true)
      
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
      <table className={styles.info}>
        <thead>
          <tr>
          <th>Priority Targets Types:</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td>{props.priorityTargetsType.join(', ')}</td>
        </tr>
        </tbody>
      </table>
      <Grid> 
        <div className={styles.divBuy}>
          <img className={styles.unitImg} alt="imgUnit" src={props.imgUrl} onClick={() => unitFIlter(props._id)}/>
          
          <SubmitButton onClick={()=> setShowResults(!showResults)} title={`${showResults?'Hide':'Show'} info`} />
        </div>
        
        {props.quantity?<h3>Quantity: {props.quantity}</h3>:
        <div className={`${styles.divBuy} ${props.opacity===true?styles.opacity:''}`}>
          <Input
          onChange={e => setQuantity(e.target.value)}
          label="Quantity"
          id="quantity"
          type="number"
          cssName="quantity"
          value={quantity}
          />
          {success?<SuccessDiv/>:
          <UserContext.Consumer>
          {context => <SubmitButton  title="Buy"  onClick={()=> handleSubmit()} />}
          </UserContext.Consumer>
          }
          
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
