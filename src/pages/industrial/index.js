import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
// import Units from '../../components/units'
// import getCookie from '../../utils/cookie'
import styles from './index.module.css'
import Industries from '../../components/industries'


const Industrial = () =>{

  return (
        <PageLayout>
          <div className={styles.container}>
          <Title title="Industrial" />
            <Industries/>
          </div>
        </PageLayout>
      )
}

export default Industrial