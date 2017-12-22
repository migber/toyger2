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
      show: false
    }
    
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this)
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this)
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
                <Modal.Title>New Team</Modal.Title>
              </Modal.Header>
        
              <Modal.Body>
                  <Forms auth={this.props.auth} onCloseButtonClick={this.onCloseButtonClick} action={this.props.onSaveButtonClick}/>
              </Modal.Body>
        
              <Modal.Footer>
              </Modal.Footer>
        
            </Modal.Dialog>
          </div>
        )
    }
}

export default ModalWindow