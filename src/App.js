import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import './App.css'
import MenuBar             from './components/menuBar'
import newForm from './components/newForm'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      clickCount: 0,
      eventId: null,
      profile: this.props.profile,
      token: null
    }

    this.onAboutClick = this.onAboutClick.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.goTo = this.goTo.bind(this)
    // this.openEditMode = this.openEditMode.bind(this)

  }

  onAboutClick() {
    console.log('click!')
    this.setState({
      clickCount: this.state.clickCount+1,
      eventId: 42,
    })
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  // openEditMode(name){
  //   newForm.openEditMode(name)
  // }

  render() {
    // const { isAuthenticated } = this.props.auth
    const {clickCount, eventId} = this.state
    console.log(this.state.profile)
    return (
      <div>
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
          login={this.login.bind(this)}
          logout={this.logout.bind(this)}
          auth={this.props.auth}
          goTo={this.goTo.bind(this)}
          // openEditMode={this.openEditMode("")}
        />
        </div>
      </div>
    );
  }
}

export default App;
