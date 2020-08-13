import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
// import Units from '../../components/units'
import styles from './index.module.css'
import Industries from '../../components/industries'
import DivGrid from '../../components/grid'


const Industrial = () =>{

  return (
        <PageLayout>
          
          <Title title="Industrial" />
          <div className={styles.container}>
          <DivGrid >
            <Industries/>
          </DivGrid>
            
          </div>
        </PageLayout>
      )
}

export default Industrial 