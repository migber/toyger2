import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import Modal from "./modal"
import ApiDelete from '../api/apiDelete'
import EditModal from './editModal'

class Teams extends Component {
    constructor(props){
        super(props);
        this.state = {
            teams: [],
            modalOpen: false,
            token: '',
            profile: '',
            edit: false,
        }
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
        this.deleteTeam = this.deleteTeam.bind(this)
        this.editStateOnChange = this.editStateOnChange.bind(this)
        this.onCloseButtonClick = this.onCloseButtonClick.bind(this)
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
            })
        })
       }

       onSaveButtonClick(res){
        this.setState({
            teams: res,
            modalOpen: false,
            edit: false,
        })
       }

       deleteTeam(id){
        const { token } = this.props.auth;
        console.log(id)
        ApiDelete.delete(token, `teams/${id}/delete`).then((res) => {
            console.log(res)
            this.setState({
                teams: res
            })
        })
       }

       editStateOnChange(){
           this.setState({
               edit: true
           })
       }

       onCloseButtonClick(){
        console.log("ciaa")
        this.setState({
            teams: this.state.teams,
            edit: false,
            modalOpen: false,
        })
    }

    render() {
        const {modalOpen, edit, profile, teams} = this.state
        const deleteTeam = this.deleteTeam
        const editStateOnChange = this.editStateOnChange
        const onSaveButtonClick = this.onSaveButtonClick
        const onCloseButtonClick= this.onCloseButtonClick
        const {auth} = this.props


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
                <th scope="col">Manager Nationality</th>  
                <th scope="col">Manager Phone Number</th>                                              
              </tr>
            </thead>
            {this.state.teams.map(function (c, ind) {
                return   <tbody>
                    <tr className="table-primary"> 
                    <th scope="col">{ind+1}</th>
                     <td> {c.name}</td>
                     <td> {c.manager.name}</td> 
                     <td> {c.manager.surname}</td> 
                     <td> {c.manager.nationality}</td>  
                     <td> {c.manager.phone}</td>                                                                       
                     { profile.nickname === "migle.brs" && (
                         <button onClick={editStateOnChange} type="button" className="btn btn-primary">Edit</button>
                     )}
                { edit &&  <EditModal auth={auth} edit={edit} ind={c.id} onSaveButtonClick={onSaveButtonClick} onCloseButtonClick={onCloseButtonClick}/>}
                       { profile.nickname === "migle.brs" && (
                            <button onClick={() => deleteTeam(c.id)} type="button" className="btn btn-danger">Delete</button>
                       )}
                </tr>
                </tbody>
            })}
            </table>
            { profile.nickname === "migle.brs" && (
                <button onClick={() => this.setState({modalOpen: true})} type="button" className="btn btn-success btn-lg">Add Team</button>
            )}
            { modalOpen && <Modal auth={this.props.auth} modalOpen={this.state.modalOpen}
              teams={this.state.teams} onCloseButtonClick={onCloseButtonClick} onSaveButtonClick={this.onSaveButtonClick} /> }                                
            </div>
        )
    }
}

export default Teams