import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Units from '../../components/units'
// import styles from './index.module.css'
import DivGrid from '../../components/grid'

const Factory = () =>{

  return (
        <PageLayout>
          <Title title="Factory" />
          <DivGrid>
            <Units buy={true}/>
          </DivGrid>
        </PageLayout>
      )
}
 
export default Factory
