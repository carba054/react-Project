import React, {useContext} from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Units from '../../components/units'
// import getCookie from '../../utils/cookie'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'

const Army = () =>{


    const userId = useContext(UserContext).user.id

  return (
        <PageLayout>
          <Title title="Army" />
          <div className={styles.container}>
            <Units kind={`army/${userId}`} data={
              {headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
                }
              }}/>
            
          </div>
        </PageLayout> 
      )
}

export default Army