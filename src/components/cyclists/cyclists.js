import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import Modal from './modal'
import ApiDelete from '../api/apiDelete'
import EditModal from './EditModalCyclist'

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
            render: false,
            
        }
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
        this.deleteCyclist = this.deleteCyclist.bind(this)
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
        api.getRovers(token, "cyclists").then((res) => {
            this.setState({
                cyclist: res,
            })
        })
       }

       onSaveButtonClick(res){
        this.setState({
            cyclist: res,
            modalOpen: false,
            render: true,
            edit: false,
        })
       }

    //    onCloseButtonClick(res){
    //     this.setState({
    //         cyclist: res,
    //         edit: false
    //     })
    //    }

       deleteCyclist(id){
        const { token } = this.props.auth;
        console.log(id)
        ApiDelete.delete(token, `cyclists/${id}/delete`).then((res) => {
            console.log(res)
            this.setState({
                cyclist: res
            })
        })
       }

       editStateOnChange(){
           this.setState({
               edit: true
           })
       }

       onChangeHandler(e){
           this.setState({
                uciId: e.target.value
           })
       }

       onCloseButtonClick(){
           console.log("ciaa")
           this.setState({
               cyclist: this.state.cyclist,
               edit: false,
               modalOpen: false,
           })
       }
    
      
    render() {
        const {modalOpen, edit, profile, render, cyclist} = this.state
        const deletecyclist = this.deleteCyclist
        const editStateOnChange = this.editStateOnChange
        const onSaveButtonClick = this.onSaveButtonClick
        const onCloseButtonClick= this.onCloseButtonClick
        const {auth} = this.props
    
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
                         <td > {c.uci_id}</td>
                         <td > {c.name}</td> 
                         <td > {c.surname}</td>   
                         <td > {c.uci_category} </td> 
                        <td> {c.nationality}</td>
                        { profile.nickname === "migle.brs" && (
                            <button onClick={editStateOnChange} type="button" className="btn btn-primary">Edit</button>
                        )}
                        { edit &&  <EditModal auth={auth} edit={edit} ind={c.uci_id} onCloseButtonClick={onCloseButtonClick} onSaveButtonClick={onSaveButtonClick}/>}
                        {   profile.nickname === "migle.brs" && (
                            <button onClick={() => deletecyclist(c.uci_id)} type="button" className="btn btn-danger">Delete</button>
                        )}
                    </tr>
                    </tbody>
                })}
            </table>
            { profile.nickname === "migle.brs" && (
                 <button onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Cyclist</button>            
           )}
            { modalOpen && <Modal auth={this.props.auth} modalOpen={this.state.modalOpen}
                cyclist={this.state.cyclist} onCloseButtonClick={onCloseButtonClick} onSaveButtonClick={this.onSaveButtonClick} /> }
            </div>
        )
    }
}

export default Cyclists