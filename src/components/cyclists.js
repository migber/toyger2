import React, { Component } from 'react'
import api from './api'
import '../App.css'
import NewForm from './newForm'
import Modal from './modal'
import ApiDelete from './apiDelete'

class Cyclists extends Component {
    constructor(props){
        super(props);
        this.state = {
            cyclist: [],
            uciID: '',
            modalOpen: false,
            token: '',
            profile: '',
            edit: false,
        }
        this.handler = this.handler.bind(this)
        this.deleteCyclist = this.deleteCyclist.bind(this)
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
        api.getRovers(token, "cyclists").then((res) => {
            this.setState({
                cyclist: res,
                uciID: res[0].uci_id
            })
        })
       }

       handler(){
        this.setState({
            modalOpen: false
        })
       }

       deleteCyclist(){
        const { token } = this.props.auth;
        const {uciID} = this.state
        console.log(uciID)
        ApiDelete.delete(token, `cyclists/${uciID}`).then((res) => {
            console.log(res)
        })
       }
    
      
    render() {
        const {modalOpen, edit, profile} = this.state

        return (
            
            <div className="container">
             <h1> Cyclists </h1>
                <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">UCI ID</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">UCI category</th>
                <th scope="col">Nationality</th>
              </tr>
            </thead>
                {this.state.cyclist.map(function (c, ind) {
                    return   <tbody>
                        <tr className="table-primary"> 
                        <th scope="col">{ind+1}</th>
                         <td> {c.uci_id}</td>
                         <td> {c.name}</td> 
                         <td> {c.surname}</td>   
                         <td> {c.uci_category} </td> 
                        <td> {c.nationality}</td>
                        { profile.nickname === "migle.brs" && (
                            <button onClick={() => this.setState({edit: true})} type="button" className="btn btn-primary">Edit</button>
                        )}
                        { edit &&  <Modal auth={this.props.auth} edit={this.state.edit}/>}
                        {   profile.nickname === "migle.brs" && (
                            <button onClick={() => this.deleteCyclist()} type="button" className="btn btn-danger">Delete</button>
                        )}
                    </tr>
                    </tbody>
                })}
            </table>
            {/* { this.state.profile.nickname === "migle.brs" && ( */}
                 <button onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Cyclist</button>            
           {/* )} */}
            { modalOpen && <Modal auth={this.props.auth} modalOpen={this.state.modalOpen}/> }
            </div>
        )
    }
}

export default Cyclists