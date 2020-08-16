import React, { useState, useEffect } from 'react'
import UserContext from './Context'
import getCookie from './utils/cookie'
import getData from './utils/data'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true
    })
  }
  
  
  const updateUser = () => {
    getData(`user/${user.id}`).then((response)=>{
      setUser({
        username: response.username,
        id: response._id,
        mineral: response.mineral,
        metal: response.metal,
        fuel: response.fuel,
        maxPopulation: response.maxPopulation,
        currentPopulation: response.currentPopulation,
        loggedIn: true
      })
      
    })
    
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    setUser({
      loggedIn: false
    })
  }

  useEffect(() => {
    const token = getCookie('x-auth-token')
    if(!token) {
      logOut()
      setLoading(false)
      return
    }

    fetch('http://localhost:9999/api/user/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(promise => {
      return promise.json()
    }).then(response => {
      if(response.status) {
        logIn({
          username: response.user.username,
          id: response.user._id,
          mineral: response.user.mineral,
          metal: response.user.metal,
          fuel: response.user.fuel,
          maxPopulation: response.user.maxPopulation,
          currentPopulation: response.user.currentPopulation
        })
      } else {
        logOut()
      }
      setLoading(false)
    })
  }, [])


  

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
      updateUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default App