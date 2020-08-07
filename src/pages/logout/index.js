import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'


const LogOut = () => {
  const context = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    context.logOut()
    history.push('/')
    
  })
  return (
    <PageLayout>
      <div>Loading....</div>
    </PageLayout>
  )
  
}

export default LogOut