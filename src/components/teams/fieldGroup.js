import React, { Component } from 'react'
import api from '../api/api'
import '../../App.css'
import {
    FormGroup,
    ControlLabel,
    HelpBlock,
    FormControl,
    Button
} from "react-bootstrap"
import apiPost from '../api/apiPost'

class Forms extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            managerid: "",
            managername: "",
            managersurname: "",
            managerbirth_date: null,
            managerphone: "",
            managernationality: "",
            edit: false
        }
    this.getValidationState = this.getValidationState.bind(this)
    this.getValidationUCIID = this.getValidationUCIID.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNameManager = this.handleChangeNameManager.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeSurname = this.handleChangeSurname.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.saveData = this.saveData.bind(this)
    this.handleChangeNationality = this.handleChangeNationality.bind(this)
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this)
    }

    componentWillMount(){
        console.log(this.props.auth)
        const { userProfile, getProfile, token } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile , token: token});
          });
        } else {
          this.setState({ profile: userProfile,  token: token});
        }
        const ind = this.props.ind
        console.log(ind)
        if(this.props.edit){
            api.getRovers(token, `teams/${ind}`).then((res) => {
                console.log("STATIC")
                console.log(res)
                console.log("STATIC3")
                this.setState({
                    id: res.id,
                    name: res.name,
                    managerid : res.manager.id,
                    managername: res.manager.name,
                    managersurname: res.manager.surname,
                    managerbirth_date: res.manager.birth_date,
                    managerphone: res.manager.phone,
                    managernationality: res.manager.nationality,
                })
            })
        }
       }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationUCIID(){
        const num = this.state.uci_id;
        // console.log(num)
        if (num.length === 11){
            return 'success';
        } else return 'error';
        return null;
    }
    
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    
    handleChangeDate(e){
        this.setState({managerbirth_date: e.target.value});
    }

    handleChangeName(e){
        this.setState({name: e.target.value});
    }

    handleChangeSurname(e){
        this.setState({managersurname: e.target.value});
    }

    handleChangeNameManager(e){
        this.setState({managername: e.target.value});
    }   

    handleChangeUCICat(e){
        this.setState({
            uci_cat: e.target.value
        })
    }

    handleChangeNationality(e){
        this.setState({
            managernationality: e.target.value
        })
    }

    handleChangePhoneNumber(e){
        this.setState({managerphone: e.target.value})
    }

    saveData(){
        console.log(this.state)
        const { token } = this.props.auth;
        const { id, name, managername, managersurname, 
                managerbirth_date, managerphone,
                managernationality, managerid} = this.state
        const data = {
            id: id,
            name: name,
            manager: {
                name: managername,
                surname: managersurname,
                birth_date: managerbirth_date,
                phone: managerphone,
                nationality: managernationality,
            },
            riders: []
        }
        console.log(this.props.edit)  
        if(this.props.edit){
            apiPost.postData(token, `teams/${data.id}/update`, data).then((res) =>{
                console.log(res)
                api.getRovers(token, "teams").then((res) => {
                    this.props.action(res)
                })
            })
        } else {
            apiPost.postData(token, 'teams', data).then((res) =>{
                console.log(res)
                api.getRovers(token, "teams").then((res) => {
                    this.props.action(res)
                })
            })
        }
    }
    
    render() {
        return (
            <form>
            
            <FormGroup
            controlId="formBasicName"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Name</ControlLabel>
            <FormControl
            type="text"
            value={this.state.name}
            placeholder="Enter text"
            onChange={this.handleChangeName}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="formatManagerName"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Manager Name</ControlLabel>
            <FormControl
            type="text"
            value={this.state.managername}
            placeholder="Enter text"
            onChange={this.handleChangeNameManager}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="formBasicText"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Manager Surname</ControlLabel>
            <FormControl
            type="text"
            value={this.state.managersurname}
            placeholder="Enter text"
            onChange={this.handleChangeSurname}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="fromBasicDate"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Birthdate</ControlLabel>
            <FormControl
            type="date"
            value={this.state.managerbirth_date}
            placeholder="Enter text"
            onChange={this.handleChangeDate}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="fromBasicDate"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Phone number</ControlLabel>
            <FormControl
            type="text"
            value={this.state.managerphone}
            placeholder="Enter text"
            onChange={this.handleChangePhoneNumber}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup>
            <ControlLabel>Nationality</ControlLabel>
            <FormControl
            type="text"
            value={this.state.managernationality}
            placeholder="Enter text"
            onChange={this.handleChangeNationality}
            />
            <FormControl.Feedback />
            </FormGroup>

            
            <Button onClick={this.props.onCloseButtonClick}>Close</Button>
            <Button onClick={this.saveData} bsStyle="primary">Save changes</Button>
            </form>
        );
    }
}

export default Forms