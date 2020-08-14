import React, { useContext, useCallback, useEffect, useState } from 'react'
import Link from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'
import getData from '../../utils/data'

const Header = () =>{
  
   const {user} = useContext(UserContext)
  const [resource,setResource] = useState(user)
  const links = getNavigation(user)

 

  const renderResource = () => {
    return (
          <div className={styles.resurs}>
            <div>
              <span>Minerals: </span>
              <span className={styles.spanRight}>{resource.metal}</span>
            </div>
            <div>
              <span>Metals: </span>
              <span className={styles.spanRight}>{resource.mineral}</span>
            </div>
            <div>
              <span>Fuel: </span>
              <span className={styles.spanRight}>{resource.fuel}</span>
            </div>
            <div>
              <span>Current/Max Population</span>
              <span className={styles.spanRight}>{resource.currentPopulation}/{resource.maxPopulation}</span>
            </div>
          </div>
    )

  }

  useEffect(() => {
    getData(`user/${user.id}`).then((el)=>{
      setResource(el)
    })
  },[user]);
 
    return (
      <React.Fragment>
        
        <header className={styles.navigation}>
          <img alt="logo" className={styles.logo} src={'https://i.ibb.co/LCd9L60/kisspng-world-of-tanks-heavy-tank-game-medium-tank-5ae3bfe8ec3249-2630610015248752409675.png'}  />
          {user.loggedIn?renderResource():""}
          {
            links.map((navElement, i) => {
              return (
                <Link
                  key={navElement.title}
                  href={navElement.link}
                  title={navElement.title}
                  type="header"
                />
              )
            })
          }
      </header>
      </React.Fragment>
      
    )

}

export default Header