import React from 'react'

const UserContext = React.createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
  updateUser: ()=>{}
})

export default UserContext

