import React from 'react'
import styles from './index.module.css'


const Unit = (props) => {
  return (
    // <div className={styles.container}>
    //   <img alt="units" className={styles.image} src={props.imgUrl} />
    //   <div className={styles.info}>
    //     <span>adsasdasd</span>
        
    //   </div>
    //   <div>
    //     <span>adsasdasd</span>
        
    //   </div>
    //   {props.children}
    // </div>
    <div className={styles.container}>
      <table>
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
      <img alt="imgUnit" src={props.imgUrl}/>
      <table>
              <thead>
                <tr>
                  <th colSpan={2}>DMG</th>
                  <th colSpan={2}>Needed resource</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Attack Defence:</th>
                  <td>2</td>
                  <th>mineral</th>
                  <td>222222</td>
                </tr>
                <tr>
                  <th>Attack Infantry:</th>
                  <td>1</td>
                  <th>Metal</th>
                  <td>222222</td>
                </tr>
                <tr>
                  <th>Attack Armored:</th>
                  <td>1</td>
                  <th>Flue</th>
                  <td>222222</td>
                </tr>
                <tr>
                  <th>Attack Helicopters:</th>
                  <td>1</td>
                  <th>Population</th>
                  <td>50</td>
                </tr>
                <tr>
                  <th>Attack Fighters:</th>
                  <td>1</td>
                  <th colSpan={2}><input type="number" name="buy" className={styles.inputBuy}/><button>Buy</button></th>
                </tr>
              </tbody>
            </table>
    </div>
    
  )
}

export default Unit
