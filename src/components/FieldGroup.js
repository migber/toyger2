import React, { Component } from 'react'
import api from './api'
import '../App.css'
import {
    FormGroup,
    ControlLabel,
    HelpBlock,
    FormControl,
    Button
} from "react-bootstrap"
import apiPost from './apiPost'

class Forms extends Component {
    constructor(props){
        super(props);
        this.state = {
            no: 0,
            uciId: "",
            c_name: '',
            surname: "",
            uci_cat: "",
            nationality: "",
            date: null,
            gender: ''
        }
    this.getValidationState = this.getValidationState.bind(this)
    this.getValidationRaceNr = this.getValidationRaceNr.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNo = this.handleChangeNo.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeSurname = this.handleChangeSurname.bind(this)
    this.handleChangeGender = this.handleChangeGender.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.saveData = this.saveData.bind(this)
    this.handleChangeUCICat = this.handleChangeUCICat.bind(this)
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationRaceNr(){
        const num = this.state.no;
        console.log(num)
        if (num > 0){
            return 'success';
        } else return 'error';
        return null;
    }
    
    handleChange(e) {
        this.setState({ name: e.target.name });
    }

    handleChangeNo(e){
        this.setState({no: e.target.no});
    }

    handleChangeGender(e){
        this.setState({gender: e.target.gender});
    }
    
    handleChangeDate(e){
        this.setState({date: e.target.date});
    }

    handleChangeName(e){
        this.setState({c_name: e.target.c_name});
    }

    handleChangeSurname(e){
        this.setState({surname: e.target.surname});
    }

    handleChangeUCICat(e){
        this.setState({
            uci_cat: e.target.uci_cat
        })
    }

    saveData(){
        const { token } = this.props.auth;
        const {uciId, c_name, surname, uci_cat, nationality, date, gender} = this.state
        const data = {
            uci_id: uciId,
            name: c_name,
            surname: surname,
            birth_date: date,
            gender: gender,
            uci_category: uci_cat,
            nationality: nationality
        }
        console.log(data)
        apiPost.postData(token, 'cyclists', data).then((res) =>{
            console.log(res)
        })
        this.props.action
    }
    
    render() {
        return (
            <form>

            {/* <FormGroup
            controlId="fromBasicNumber"
            // validationState={this.getValidationRaceNr()}
            >
            <ControlLabel>No</ControlLabel>
            <FormControl
            type="number"
            value={this.state.no}
            placeholder="Enter number"
            onChange={this.handleChangeNo}
            />
            <HelpBlock>Validation is based on number from 1 to 200.</HelpBlock>
            <FormControl.Feedback />
            </FormGroup> */}

            <FormGroup
            controlId="basicUciID"
            // validationState={this.getValidationRaceNr()}
            >
            <ControlLabel>UCI ID</ControlLabel>
            <FormControl
            type="number"
            value={this.state.uci_id}
            placeholder="Enter UCI ID"
            onChange={this.handleChangeNo}
            />
            <HelpBlock>Validation is based on UCI number (11 digits).</HelpBlock>
            <FormControl.Feedback />
            </FormGroup>
            
            <FormGroup
            controlId="formBasicName"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Name</ControlLabel>
            <FormControl
            type="text"
            value={this.state.c_name}
            placeholder="Enter text"
            onChange={this.handleChangeName}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="formBasicText"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Surname</ControlLabel>
            <FormControl
            type="text"
            value={this.state.surname}
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
            value={this.state.date}
            placeholder="Enter text"
            onChange={this.handleChangeDate}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup>
            <ControlLabel>UCI Category</ControlLabel>
            <FormControl
            type="text"
            value={this.state.uci_cat}
            placeholder="Enter text"
            onChange={this.handleChangeUCICat}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
            <ControlLabel>Gender</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                 <option value="female">Female</option>
                 <option value="male">Male</option>
            </FormControl>
            </FormGroup>
            <Button onClick={this.props.action}>Close</Button>
            <Button onClick={() => this.saveData()} bsStyle="primary">Save changes</Button>
            </form>
        );
    }
}

export default Forms