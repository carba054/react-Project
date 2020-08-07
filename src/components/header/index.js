import React, { useContext} from 'react'
import Link from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'


const Header = () =>{
 

  const {user} = useContext(UserContext)
  const links = getNavigation(user)

  
 
    return (
      <header className={styles.navigation}>
        <img alt="logo" className={styles.logo} src={'https://www.jing.fm/clipimg/full/345-3453810_two-swords-clip-art-crossed-swords.png'}  />
        <div className={styles.resurs}>
          <div>
            <span>Minerals: </span>
            <span className={styles.spanRight}>123234</span>
          </div>
          <div>
            <span>Metals: </span>
            <span className={styles.spanRight}>655565</span>
          </div>
          <div>
            <span>Fuel: </span>
            <span className={styles.spanRight}>2500</span>
          </div>
          <div>
            <span>Population: </span>
            <span className={styles.spanRight}>500</span>
          </div>
        </div>
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
    )

}

export default Header