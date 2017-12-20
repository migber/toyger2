import React, { Component } from 'react'
import api from './api'
import '../App.css'
import NewForm from './newForm'

class Commissaires extends Component {
    constructor(props){
        super(props);
        this.state = {
            commissaires: [],
            modalOpen: false,
            commName: '',
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
        api.getRovers(token, "commissaires").then((res) => {
            this.setState({
                commissaires: res,
                commName: res[0].name
            })
        })
       }

    render() {
        const {modalOpen, profile} = this.state
        return (
            <div className="container">
            <h1> Commissaires </h1>
            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">UCI ID</th>
                <th scope="col">Name</th>
                <th scope="col">UCI category</th>
                <th scope="col">Nationality</th>
              </tr>
            </thead>
            {this.state.commissaires.map(function (c, ind) {
                return   <tbody>
                    <tr className="table-primary"> 
                    <th scope="col">{ind+1}</th>
                     <td> {c.uciid}</td>
                     <td> {c.name}</td> 
                     <td> {c.uci_category}</td>
                    <td> {c.nationality}</td>
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
            { this.state.profile.nickname === "migle.brs" && (
            <button type="button" onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Commissaire</button>
            )}
            {modalOpen && <NewForm auth={this.props.auth}/> }
        </div>
        )
    }
}

export default Commissaires