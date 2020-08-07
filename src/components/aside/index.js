import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Link from '../link'
import Btn from '../button'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'

const Aside = () => {

  const {user} = useContext(UserContext)
  const links = getNavigation(user)
  let location = useLocation();
  return (
    <aside className={styles.container}>
      
      {
        links.map((navElement, i) => {
          
          return (
            
            <React.Fragment key={navElement.title}>
              <Link
                key={i.toString()}
                href={navElement.link}
                title={navElement.title}
                type="aside"
              />
              {
                navElement.section.map((el, i)=>{
                  return location.pathname.split('/')[1] === navElement.link.split('/')[1]? <Btn key={i.toString()} title={'-'+el.title} cssType={"aside"}/> :''
                   
                })
              }
            </React.Fragment>
          )
        })
      }
      
    </aside>
  )
  
}

export default Aside