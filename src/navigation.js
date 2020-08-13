import React, { useContext } from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/home'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import logOut from './pages/logout'
import ProfilePage from './pages/profile'

import FactoryPage from './pages/factory'
import RankingPage from './pages/ranking'
import Army from './pages/army'
import Industrial from './pages/industrial'
// import Reports from './pages'

import ErrorPage from './pages/error'

import UserContext from './Context'

const Navigation = () => {
  const context = useContext(UserContext)
 
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/home","/"]} exact component={context.user.loggedIn?Home:ErrorPage} />
        <Route path="/home/army" component={Army} />
        <Route path="/home/industrial" component={Industrial} />
        <Route path="/factory" component={FactoryPage} />
        <Route path="/ranking" component={RankingPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/profile/:userid" component={ProfilePage} />
        <Route path="/logout" component={logOut}/>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation