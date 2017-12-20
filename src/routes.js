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
import Races from "./components/races"
import Riders from "./components/riders"
import Stages from "./components/stages"
import Teams from "./components/teams"
import Results from "./components/results"
import Sprints from "./components/sprints"
import Profile from './components/Profile/Profile'
import Toyger from "./components/toyger"
import AddForm from "./components/newForm"

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

    <Route path="/toyger/teams" render={(props) => ( auth.isAuthenticated() ?
        <Teams auth={auth} {...props}/> : 
        <Redirect to='/home'/>)
      }/>

    <Route path="/toyger/races" render={(props) => ( auth.isAuthenticated() ?
      <Races auth={auth}  {...props}/> :
      <Redirect to='/home'/>)}
    />
    <Route path="/toyger/cyclists" render={(props) => (auth.isAuthenticated() ?
       <Cyclists auth={auth}  {...props}/> : 
       <Redirect to='/home'/>)}
       />
    <Route path="/toyger/commissaires" render={(props) => (auth.isAuthenticated() ?
       <Commissaires auth={auth}  {...props}/> : 
       <Redirect to='/home'/>)}
       />
    <Route path="/toyger/events/:eventID/cyclists" render={(props) =>  (auth.isAuthenticated() ?
       <Riders auth={auth}  {...props}/> :
       <Redirect to='/home'/>)
      }/>
    <Route path="/toyger/events/:eventID/stages" render={(props) =>  (auth.isAuthenticated() ?
        <Stages auth={auth}  {...props}/> :
        <Redirect to='/home'/>)
      }/>
    <Route path="/toyger/events/:eventID/sprints" render={(props) =>  (auth.isAuthenticated() ?
        <Sprints auth={auth}  {...props}/>:
        <Redirect to='/home'/>)
      }/>
    <Route path="/toyger/events/:eventId/results" render={(props) => (auth.isAuthenticated() ?
        <Results auth={auth}  {...props}/> :
        <Redirect to='/home'/>)
        }/>
    <Route path="/about"render={(props) => <About auth={auth}  {...props}/> }/>
    <Route path="/:id/edit"render={(props) => (auth.isAuthenticated() ?
       <AddForm auth={auth}  {...props}/> : 
       <Redirect to='/home'/>)
       }/>
    <Route path="/contacts" render={(props) =><Contacts auth={auth}  {...props}/>}/>
    <Route path="/tt" render={(props) => <Toyger auth={auth}  {...props}/>}/>
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
