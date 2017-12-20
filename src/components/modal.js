import React, { Component } from 'react'
import api from './api'
import '../App.css'
import {
   Modal,
   Button
  } from "react-bootstrap"
import Forms from './FieldGroup'

class ModalWindow extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
    
    this.handler = this.handler.bind(this)
}


handler(){
  this.props.handler()
}
    render() {
        return(
            <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>New Cyclist</Modal.Title>
              </Modal.Header>
        
              <Modal.Body>
                  <Forms auth={this.props.auth} action={this.handler}/>
              </Modal.Body>
        
              <Modal.Footer>
              </Modal.Footer>
        
            </Modal.Dialog>
          </div>
        )
    }
}

export default ModalWindow