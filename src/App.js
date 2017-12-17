import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MenuBar             from './components/menuBar'
import Auth from "./Auth/auth"
import Callback from "./Callback/callback"


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
          eventId={eventId && eventId}
          auth={auth}
          login={this.login}
          handleAuthentication={auth.handleAuthentication}
        />
        <Router>
          <Route path="/callback" render={(props) => {
            auth.handleAuthentication(props)
            return <Callback {...props} />
          }} />
        </Router>
        {/* <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router> */}
      </div>
    );
  }
}
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)


export default App;
