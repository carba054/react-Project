import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
// import UserContext from '../../Context'
// import styles from './index.module.css'
import Leaderboard from '../../components/leaderboard'

const Publications = () => {

  // const userId = useContext(UserContext).user.id
  

  return (
    <PageLayout>
      <Title title="Ranking" />
      <Leaderboard/>
    </PageLayout>
  )
}


export default Publications

