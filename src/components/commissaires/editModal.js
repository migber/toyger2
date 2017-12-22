import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import {
   Modal,
   Button
  } from "react-bootstrap"
import Forms from './fieldGroup'

class ModalWindow extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      onChange: ''
    }
    
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.closeButtonClick = this.closeButtonClick.bind(this)
}
onChangeHandler(e){
  this.setState({
       onChange: e.target.value
  })
}

onSaveButtonClick(){
  this.props.onSaveButtonClick()
}

closeButtonClick(){
  this.props.closeButtonClick()
}

    render() {
        return(
            <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit Commissaire</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Forms auth={this.props.auth} onChange={this.onChangeHandler} data={this.props.data} ind={this.props.ind} edit={this.props.edit}
                         action={this.props.onSaveButtonClick} closeButtonClick={this.closeButtonClick}/>
              </Modal.Body>
        
              <Modal.Footer>
              </Modal.Footer>
        
            </Modal.Dialog>
          </div>
        )
    }
}

export default ModalWindow