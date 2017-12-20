import React, { Component } from 'react'
import api from './api'
import '../App.css'
import NewForm from './newForm'

class Races extends Component {
   constructor(props){
       super(props);
       this.state = {
           events: [],
           eventName: '',
           modalOpen: false,
           token: '',
           profile: '',
       }
   }

   componentWillMount(){
    const { userProfile, getProfile, token } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile , token: token});
      });
    } else {
      this.setState({ profile: userProfile,  token: token});
    }
    api.getRovers(token, "events").then((res) => {
        this.setState({
            events: res,
            eventName: res[0].name
        })
    })
   }
  
    render()
     {
        const {modalOpen, profile} = this.state        
        return (
            <div className="container">
             <h1> Races </h1>
            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Participants</th>
                <th scope="col">Stages</th>  
                <th scope="col">Total KM</th>                           
              </tr>
              </thead>
              {this.state.events.map(function (c, ind) {
                  return   <tbody>
                      <tr className="table-primary"> 
                      <th scope="col">{ind+1}</th>
                       <td> {c.name}</td>
                       <td> {c.date}</td> 
                       <td> {c.location}</td>   
                       <td> {c.no_participants} </td> 
                      <td> {c.no_stages}</td>
                      <td> {c.total_km}</td>
                      { profile.nickname === "migle.brs" && (
                          <button type="button" className="btn btn-primary">Edit</button>
                    )}
                       { profile.nickname === "migle.brs" && (
                            <button type="button" className="btn btn-danger">Delete</button> 
                       )}
                  </tr>
                  </tbody>
              })}
          </table> 
          { profile.nickname === "migle.brs" && (
          <button type="button" onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Race</button>
          )}
          { modalOpen && <NewForm auth={this.props.auth}/> }
              </div>
        )
    }
}



export default Races