import React, { Component } from 'react'
import {
  Navbar, 
  NavItem,
  Nav, 
  MenuItem,
  NavDropdown,
} from "react-bootstrap"
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom'
import About from "./about"
import Contacts from "./contacts"
import Commissaires from "./commissaires"
import Cyclists from "./cyclists"
import Login from "./login"
import Logout from "./logout"
import Races from "./races"
import Riders from "./riders"
import Stages from "./stages"
import Teams from "./teams"
import Results from "./results"
import Sprints from "./sprints"
import Auth from "../Auth/auth"
import Callback from "../Callback/callback"


class MenuBar extends Component {
  
  render() {
    const {eventId} = this.props
    const { isAuthenticated } = this.props.auth

    return (
      <div>
      <Navbar collapse navbar-collapse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">Toyger</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/about">About</NavItem>
          <NavItem eventKey={11} onClick={this.props.onAboutClick}>About with click{this.props.clickCount}</NavItem>
          <NavItem eventKey={2} href="/contacts">Contacts</NavItem>
          <NavItem eventKey={3} href="/toyger/races">Races</NavItem>
          { eventId && 
            (
              <NavDropdown eventKey={3} title="Races" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href={`/toyger/events/${eventId}/cyclists`}>Riders</MenuItem>
              <MenuItem eventKey={3.2} href={`/toyger/events/${eventId}/stages`}>Stages</MenuItem>
              <MenuItem eventKey={3.3} href={`/toyger/events/${eventId}/sprints`} >Sprints</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} href={`/toyger/events/${eventId}/results`}>Results</MenuItem>
              </NavDropdown>    
            )
          }
          <NavItem eventKey={4} href="/toyger/commissaires">Commissaires</NavItem>
          <NavItem eventKey={5} href="/toyger/cyclists">Cyclists</NavItem>
          <NavItem eventKey={6} href="/toyger/teams">Teams</NavItem>
        </Nav>
        <Nav pullRight>

        {
          !isAuthenticated() && (
          <NavItem eventKey={1} onClick={this.props.login} >Sign in</NavItem>
        )}
        {
          isAuthenticated() && (
          <NavItem eventKey={1} onClick={this.props.login} >Sign out</NavItem>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <BrowserRouter>
    
    <Router>
    <div>
    <Route exact path="/home" component={Home} auth={Auth}/>
    <Route path="/toyger/teams" component={Teams}/>
    <Route path="/toyger/races" component={Races}/>
    <Route path="/toyger/cyclists" component={Cyclists}/>
    <Route path="/toyger/commissaires" component={Commissaires}/>
    {/* <Route path="/login" component={Login}/>
    <Route path="logout" component={Logout}/> */}
    <Route path="/toyger/events/:eventID/cyclists" component={Riders}/>
    <Route path="/toyger/events/:eventID/stages" component={Stages}/>
    <Route path="/toyger/events/:eventID/sprints" component={Sprints}/>
    <Route path="/toyger/events/:eventId/results" component={Results}/>
    <Route path="/about" component={About}/>
    <Route path="/contacts" component={Contacts}/>
    <Route path="/" compoenent={Auth}/>
    <Route path="/logout" component={Auth}/>
    {/* <Route path="/callback" render={(props) => {
            this.props.handleAuthentication
            return <Callback {...props} /> 
          }}/> */}
    </div>
    </Router>
    </BrowserRouter>
    </div>
  )
}
}
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default MenuBar
