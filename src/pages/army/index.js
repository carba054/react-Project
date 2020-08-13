import React, { useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Units from '../../components/units'
// import styles from './index.module.css'
import UserContext from '../../Context'
import DivGrid from '../../components/grid'

const Army = () =>{


  const context = useContext(UserContext)
  //  console.log(context.user.id)
  return (
        <PageLayout>
          <Title title="Army" />
          {/* <div className={styles.container}> */}
          <DivGrid>
          <Units kind={`base/army/${context.user.id}`}/>
          </DivGrid>
          {/* </div> */}
        </PageLayout> 
      )
}

export default Army