import React, { Component } from 'react'
import api from './api/api'
import './../App.css'


class NewForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            path: '',
            isOpen: false
        }
    }
    
    componentWillMount(){
        const { getToken } = this.props.auth;
        api.getRovers(getToken(), "cyclists").then((res) => {
            this.setState({
                cyclist: res,
                cyclistName: res[0].name
            })
        })
       }
       
    render() {
        return (
            <div className="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                <div className="modal-body">
                        <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                     <button type="button" className="btn btn-primary">Save changes</button>
                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                 </div>
            </div>
        </div>
</div>
        )
    }

}

export default NewForm