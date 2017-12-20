import React, { Component } from 'react'
import api from './api'
import '../App.css'
import NewForm from './newForm'

class Teams extends Component {
    constructor(props){
        super(props);
        this.state = {
            teams: [],
            teamName: '',
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
        api.getRovers(token, "teams").then((res) => {
            this.setState({
                teams: res,
                teamName: res[0].name
            })
        })
       }

    render() {
        const {modalOpen, profile} = this.state

        return (
            <div className="container">
                <h1> Teams </h1>
                <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Manager Name</th>
                <th scope="col">Manager Surname</th>
              </tr>
            </thead>
            {this.state.teams.map(function (c, ind) {
                return   <tbody>
                    <tr className="table-primary"> 
                    <th scope="col">{ind+1}</th>
                     <td> {c.name}</td>
                     <td> {c.manager.name}</td> 
                     <td> {c.manager.surname}</td>   
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
                <button type="button" className="btn btn-success btn-lg">Add Team</button>
            )}
            { modalOpen && <NewForm auth={this.props.auth}/> }
            </div>
        )
    }
}

export default Teams