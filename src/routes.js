import React from 'react'
import { Redirect, Route, Router } from 'react-router-dom'
import App from './App'
import Home from './Home/Home'
import Callback from './Callback/Callback'
import Auth from './Auth/Auth'
import history from './history'
import About from "./components/about"
import Contacts from "./components/contacts"
import Commissaires from "./components/commissaires"
import Cyclists from "./components/cyclists"
import Login from "./components/login"
import Logout from "./components/logout"
import Races from "./components/races"
import Riders from "./components/riders"
import Stages from "./components/stages"
import Teams from "./components/teams"
import Results from "./components/results"
import Sprints from "./components/sprints"
import Profile from './components/Profile/Profile'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
    <div>
    <Route path="/" render={(props) => <App auth={auth} {...props} />} />
    <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
    <Route path="/toyger/teams" render={(props) => <Teams auth={auth}  {...props}/>}/>
    <Route path="/toyger/races" render={(props) => <Races auth={auth}  {...props}/>}/>
    <Route path="/toyger/cyclists" render={(props) => <Cyclists auth={auth}  {...props}/>}/>
    <Route path="/toyger/commissaires" render={(props) => <Commissaires auth={auth}  {...props}/>}/>
    <Route path="/toyger/events/:eventID/cyclists" render={(props) => <Riders auth={auth}  {...props}/>}/>
    <Route path="/toyger/events/:eventID/stages" render={(props) => <Stages auth={auth}  {...props}/>}/>
    <Route path="/toyger/events/:eventID/sprints" render={(props) => <Sprints auth={auth}  {...props}/>}/>
    <Route path="/toyger/events/:eventId/results" render={(props) => <Results auth={auth}  {...props}/>}/>
    <Route path="/about"render={(props) => <About auth={auth}  {...props}/>}/>
    <Route path="/contacts" render={(props) => <Contacts auth={auth}  {...props}/>}/>
    <Route path="/toyger/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
    <Route path="/callback" render={(props) => {
      handleAuthentication(props);
      return <Callback {...props} /> 
    }}/>
    </div>
    </Router>
  );
}
