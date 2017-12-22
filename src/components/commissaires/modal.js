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
    this.closeButtonClick = this.closeButtonClick.bind(this)
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
                <Modal.Title>New Commissaire</Modal.Title>
              </Modal.Header>
        
              <Modal.Body>
                  <Forms auth={this.props.auth} edit={this.props.edit} action={this.props.onSaveButtonClick} closeButtonClick={this.closeButtonClick}/>
              </Modal.Body>
        
              <Modal.Footer>
              </Modal.Footer>
        
            </Modal.Dialog>
          </div>
        )
    }
}

export default ModalWindow