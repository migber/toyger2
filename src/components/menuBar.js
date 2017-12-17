import React, { Component } from 'react'
import {
  Navbar, 
  NavItem,
  Nav, 
  MenuItem,
  NavDropdown,
} from "react-bootstrap"


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
          {
          isAuthenticated() && (
          <NavItem eventKey={1} href="./toyger/profile" >Profile</NavItem>
        )}
        </Nav>
        <Nav pullRight>

        {
          !isAuthenticated() && (
          <NavItem eventKey={1} onClick={this.props.login} >Sign in</NavItem>
        )}
        {
          isAuthenticated() && (
          <NavItem eventKey={1} onClick={this.props.logout} >Sign out</NavItem>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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
