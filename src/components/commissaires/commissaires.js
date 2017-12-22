import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import Modal from './modal'
import ApiDelete from '../api/apiDelete'
import EditModal from './editModal'

class Commissaires extends Component {
    constructor(props){
        super(props);
        this.state = {
            commissaires: [],
            modalOpen: false,
            commName: '',
            token: '',
            profile: '',
            edit: false,
            modalOpen: false,
        }
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
        this.deleteCommissaire = this.deleteCommissaire.bind(this)
        this.editStateOnChange = this.editStateOnChange.bind(this)
        this.closeButtonClick = this.closeButtonClick.bind(this)
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
            })
        })
       }

       onSaveButtonClick(res){
            console.log(res)
            this.setState({
                commissaires: res,
                modalOpen: false,
                edit: false,
            })
       }

       deleteCommissaire(id){
        const { token } = this.props.auth;
        console.log(id)
        ApiDelete.delete(token, `commissaires/${id}/delete`).then((res) => {
            console.log(res)
            this.setState({
                commissaires: res
            })
        })
       }

       editStateOnChange(){
           this.setState({
               edit: true
           })
       }

       closeButtonClick(){
           console.log("Close window")
           this.setState({
               commissaires: this.state.commissaires,
               modalOpen: false,
               edit: false,
           })
       }

    render() {
        const {modalOpen, edit, profile, commissaires} = this.state
        const deleteCommissaire= this.deleteCommissaire
        const editStateOnChange = this.editStateOnChange
        const onSaveButtonClick = this.onSaveButtonClick
        const closeButtonClick = this.closeButtonClick
        const {auth} = this.props
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
                        <button onClick={editStateOnChange} type="button" className="btn btn-primary">Edit</button>
                    )}
                    { edit &&  <EditModal auth={auth} edit={edit} ind={c.uciid} onSaveButtonClick={onSaveButtonClick} closeButtonClick={closeButtonClick}/>}
                    { profile.nickname === "migle.brs" && (
                        <button onClick={() => deleteCommissaire(c.uciid)} type="button" className="btn btn-danger">Delete</button>   
                    )} 
                     </tr>
                </tbody>
            })}
            </table>
            { profile.nickname === "migle.brs" && (
            <button type="button" onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Commissaire</button>
            )}
             { modalOpen && <Modal auth={this.props.auth} modalOpen={this.state.modalOpen} commissaires={this.state.commissaires}
              onSaveButtonClick={this.onSaveButtonClick} closeButtonClick={this.closeButtonClick} edit={this.state.edit}/> }
        </div>
        )
    }
}

export default Commissaires