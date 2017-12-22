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
            uci_id: 0,
            uciId: "",
            c_name: '',
            surname: "",
            uci_cat: "",
            nationality: "",
            date: null,
            gender: '',
            edit: false
        }
    this.getValidationState = this.getValidationState.bind(this)
    this.getValidationUCIID = this.getValidationUCIID.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNo = this.handleChangeNo.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeSurname = this.handleChangeSurname.bind(this)
    this.handleChangeGender = this.handleChangeGender.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.saveData = this.saveData.bind(this)
    this.handleChangeUCICat = this.handleChangeUCICat.bind(this)
    this.handleChangeNationality = this.handleChangeNationality.bind(this)
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
        console.log(this.props.data)
        const ind = this.props.ind
        console.log(ind)
        console.log(this.props.key)
        if(this.props.edit){
            api.getRovers(token, `cyclists/${ind}`).then((res) => {
                console.log("STATIC")
                console.log(res)
                console.log("STATIC3")
                this.setState({
                    uci_id: res.uci_id,
                    c_name: res.name,
                    surname: res.surname,
                    uci_cat: res.uci_category,
                    nationality: res.nationality,
                    date: res.birth_date,
                    gender: res.gender
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

    handleChangeNo(e){
        this.setState({uci_id: e.target.value});
    }

    handleChangeGender(e){
        this.setState({gender: e.target.value});
    }
    
    handleChangeDate(e){
        this.setState({date: e.target.value});
    }

    handleChangeName(e){
        this.setState({c_name: e.target.value});
    }

    handleChangeSurname(e){
        this.setState({surname: e.target.value});
    }
x
    handleChangeUCICat(e){
        this.setState({
            uci_cat: e.target.value
        })
    }

    handleChangeNationality(e){
        this.setState({
            nationality: e.target.value
        })
    }

    saveData(){
        console.log(this.state)
        const { token } = this.props.auth;
        const {uci_id, c_name, surname, uci_cat, nationality, date, gender} = this.state
        const data = {
            uci_id: uci_id,
            name: c_name,
            surname: surname,
            birth_date: date,
            gender: gender,
            uci_category: uci_cat,
            nationality: nationality
        }
        console.log(this.props.edit)  
        if(this.props.edit){
            apiPost.postData(token, `cyclists/${data.uci_id}/update`, data).then((res) =>{
                console.log(res)
                api.getRovers(token, "cyclists").then((res) => {
                    this.props.action(res)
                })
            })
        } else {
            apiPost.postData(token, 'cyclists', data).then((res) =>{
                console.log(res)
                api.getRovers(token, "cyclists").then((res) => {
                    this.props.action(res)
                })
            })
        }
    }
    
    render() {
        return (
            <form>

            <FormGroup
            controlId="basicUciID"
            validationState={this.getValidationUCIID()}
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

            <FormGroup>
            <ControlLabel>Nationality</ControlLabel>
            <FormControl
            type="text"
            value={this.state.nationality}
            placeholder="Enter text"
            onChange={this.handleChangeNationality}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
            <ControlLabel>Gender</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                 <option value="female" onChange={this.handleChangeGender}>Female</option>
                 <option value="male" onChange={this.handleChangeGender}>Male</option>
            </FormControl>
            </FormGroup>
            <Button onClick={this.props.onCloseButtonClick}>Close</Button>
            <Button onClick={this.saveData} bsStyle="primary">Save changes</Button>
            </form>
        );
    }
}

export default Forms