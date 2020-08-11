import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
// import Units from '../../components/units'
// import getCookie from '../../utils/cookie'
import styles from './index.module.css'


const Industrial = () =>{

  return (
        <PageLayout>
          <Title title="Industrial" />
          <div className={styles.container}>
            {/* <Units/> */}
          </div>
        </PageLayout>
      )
}

export default Industrial