import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import MenuBar             from './components/menuBar'
import Auth from "./Auth/auth"
import Callback from "./Callback/callback"
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom'
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

const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  console.log("ATeina ")
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      clickCount: 0,
      eventId: null,
    }

    this.onAboutClick = this.onAboutClick.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

  }

  logout() {
    auth.logout()
  }

  login() {
    auth.login()
  }

  onAboutClick() {
    console.log('click!')
    this.setState({
      clickCount: this.state.clickCount+1,
      eventId: 42,
    })
  }

  render() {
    const {clickCount, eventId} = this.state

    return (
      <div className="App">
        <header className="App-header">
         <div>
          <img src={require('./toyger.png')} className="picture" alt="logo"/>
          <h1 className="App-title">Welcome to Toyger</h1>
          </div>
        </header>
        <MenuBar 
          fixesTop={true} 
          responsive={true} 
          onAboutClick={this.onAboutClick}
          clickCount={clickCount}
          eventId={eventId && eventId}x
          auth={auth}
          login={this.login}
          logout={this.logout}
          handleAuthentication={auth.handleAuthentication}
        />
      
    
    <Router>
    <div>
    <Route exact path="/" component={Home} auth={auth}/>
    <Route path="/toyger/teams" component={Teams} auth={auth}/>
    <Route path="/toyger/races" component={Races} auth={auth}/>
    <Route path="/toyger/cyclists" component={Cyclists} auth={auth}/>
    <Route path="/toyger/commissaires" component={Commissaires} auth={auth}/>
    <Route path="/toyger/events/:eventID/cyclists" component={Riders} auth={auth}/>
    <Route path="/toyger/events/:eventID/stages" component={Stages} auth={auth}/>
    <Route path="/toyger/events/:eventID/sprints" component={Sprints} auth={auth}/>
    <Route path="/toyger/events/:eventId/results" component={Results} auth={auth}/>
    <Route path="/about" component={About} auth={auth}/>
    <Route path="/contacts" component={Contacts} auth={auth}/>
    <Route path="/callback" render={(props) => {
            auth.handleAuthentication(props)
            return <Callback {...props} />
          }} />
    </div>
    </Router>
  
      </div>
    );
  }
}
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default App;
