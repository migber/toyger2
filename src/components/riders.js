import React, { Component } from 'react'
import api from './api/api'
import '../App.css'

class Riders extends Component {
    constructor(props){
        super(props);
        this.state = {
            riders: [],
            rider: '',
            participantNo: 0,
            uciId: ''
        }
    }

    componentWillMount(){
        api.getRovers("events/48a025b8-17d7-44b9-96f3-17d3fb490ccb/participants").then((res) => {
            this.setState({
                participant: res,
                participantName: res[1].rider.name,
                participantNo: res[1].no,
                uciId: res[1].rider.uci_id
            })
        })
       }


    render() {
        return (
            <div className="container">
                <h1> Riders </h1>
                <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">No</th>
                <th scope="col">UCI ID</th>
                <th scope="col">Name</th>
                <th scope="col">Total time</th>
                <th scope="col">Total points</th>
                <th scope="col">U23</th>
              </tr>
            </thead>
            <tbody>
            <tr className="table-primary">
                <th scope="row">1</th>
                <td>{this.state.participantNo}</td>
                <td>{this.state.uciId}</td>
                <td>{this.state.participantName}</td>
                <td>{this.state.uciId}</td>
                <td>{this.state.participantName}</td>
                <td>False</td>
                <button type="button" className="btn btn-primary">Edit</button>
              <button type="button" className="btn btn-danger">Delete</button>               
              </tr>
            </tbody>
            </table>
            <button type="button" className="btn btn-success btn-lg">Add Rider</button>
            </div>
        )
    }
}

export default Riders