import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import {
   Modal,
   Button
  } from "react-bootstrap"
import Forms from './FieldGroup'

class ModalWindow extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      onChange: ''
    }
    
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this)
}
onChangeHandler(e){
  this.setState({
       onChange: e.target.value
  })
}

onSaveButtonClick(){
  this.props.onSaveButtonClick()
}

onCloseButtonClick(){
  this.props.onCloseButtonClick()
}
    render() {
        return(
            <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit Cyclist</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Forms auth={this.props.auth} onChange={this.onChangeHandler} data={this.props.data}
                  onCloseButtonClick={this.onCloseButtonClick} ind={this.props.ind} edit={this.props.edit} action={this.props.onSaveButtonClick}/>
              </Modal.Body>
        
              <Modal.Footer>
              </Modal.Footer>
        
            </Modal.Dialog>
          </div>
        )
    }
}

export default ModalWindow