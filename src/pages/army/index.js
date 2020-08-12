import React, { useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Units from '../../components/units'
// import getCookie from '../../utils/cookie'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'
import DivGrid from '../../components/grid'

const Army = () =>{


  const context = useContext(UserContext)
  //  console.log(context.user.id)
  return (
        <PageLayout>
          <Title title="Army" />
          {/* <div className={styles.container}> */}
          <DivGrid cssName={"twoColumns"}>
          <Units kind={`base/army/${context.user.id}`} data={
              {headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
                }
              }}/>
          </DivGrid>
          {/* </div> */}
        </PageLayout> 
      )
}

export default Army