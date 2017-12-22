import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import Modal from './modal'
import ApiDelete from '../api/apiDelete'
import EditModal from './editModal'

class Races extends Component {
   constructor(props){
       super(props);
       this.state = {
           events: [],
           token: '',
           profile: '',
           edit: false,
           modalOpen: false,
       }

       this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
       this.deleteEvent = this.deleteEvent.bind(this)
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
    api.getRovers(token, "events").then((res) => {
        this.setState({
            events: res,
        })
    })
   }

   onSaveButtonClick(res){
    console.log(res)
    this.setState({
        events: res,
        modalOpen: false,
        edit: false,
    })
    }

    deleteEvent(id){
    const { token } = this.props.auth;
    console.log(id)
    ApiDelete.delete(token, `events/${id}/delete`).then((res) => {
        console.log(res)
        this.setState({
            events: res
        })
    })
    }

    editStateOnChange(){
    this.setState({
        edit: true
    })
    }

    onCloseButtonClick(){
    console.log("Close window")
    this.setState({
        events: this.state.events,
        modalOpen: false,
        edit: false,
    })
    }

  
    render()
     {
        const {modalOpen, edit, profile, commissaires} = this.state
        const deleteEvent= this.deleteEvent
        const editStateOnChange = this.editStateOnChange
        const onSaveButtonClick = this.onSaveButtonClick
        const onCloseButtonClick = this.onCloseButtonClick
        const {auth} = this.props        
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
                          <button onClick={editStateOnChange} type="button" className="btn btn-primary">Edit</button>
                    )}
                    { edit &&  <EditModal auth={auth} edit={edit} ind={c.id} onSaveButtonClick={onSaveButtonClick} onCloseButtonClick={onCloseButtonClick}/>}

                       { profile.nickname === "migle.brs" && (
                            <button onClick={() => deleteEvent(c.id)} type="button" className="btn btn-danger">Delete</button> 
                       )}
                  </tr>
                  </tbody>
              })}
          </table> 
          { profile.nickname === "migle.brs" && (
          <button type="button" onClick={() => this.setState({modalOpen: true})} className="btn btn-success btn-lg">Add Race</button>
          )}
          { modalOpen && <Modal auth={this.props.auth} modalOpen={this.state.modalOpen} events={this.state.events}
              onSaveButtonClick={this.onSaveButtonClick} onCloseButtonClick={this.onCloseButtonClick} edit={this.state.edit}/> }
              </div>
        )
    }
}



export default Races