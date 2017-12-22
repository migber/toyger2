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
            no_participants: 0,
            no_stages: 0,
            date: null,
            location: "",
            no_commissaires: 0,
            total_km: 0,
            stages: [],
            participants: [],
            commissaires: [],
            edit: false
        }
    this.getValidationState = this.getValidationState.bind(this)
    this.getValidationUCIID = this.getValidationUCIID.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNoParticipants = this.handleChangeNoParticipants.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeNoStages = this.handleChangeNoStages.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.saveData = this.saveData.bind(this)
    this.handleChangeLocation = this.handleChangeLocation.bind(this)
    this.handleChangeNoCommissaires = this.handleChangeNoCommissaires.bind(this)
    this.handleChangetotalKm = this.handleChangetotalKm.bind(this)
    this.handleStages = this.handleStages.bind(this)
    this.handleParticipants = this.handleParticipants.bind(this)
    this.handleCommissaires = this.handleCommissaires.bind(this)
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
            api.getRovers(token, `events/${ind}`).then((res) => {
                console.log("STATIC")
                console.log(res)
                console.log("STATIC3")
                this.setState({
                    id: res.id,
                    name: res.name,
                    no_participants: res.no_participants,
                    no_stages: res.no_stages,
                    date: res.date,
                    location: res.location,
                    no_commissaires: res.no_commissaires,
                    total_km: res.total_km,
                    stages: res.stage,
                    participants: res.participants,
                    commissaires: res.commissaires,
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
        this.setState({date: e.target.value});
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

    handleChangeNoStages(e){
        this.setState({
            no_stages: e.target.value
        })
    }

    handleChangeNoParticipants(e){
        this.setState({no_participants: e.target.value})
    }

    handleChangeLocation(e){
        this.setState({
            location: e.target.value
        })

    }
    handleChangeNoCommissaires(e){
        this.setState({
          no_commissaires: e.target.value  
        })
    }
    handleChangetotalKm(e){
        this.setState({
            total_km: e.target.value
        })
    }
    handleStages(e){
        this.setState({
            stages: e.target.value
        })
    }
    handleParticipants(e){
        this.setState({
            participants : e.target.value
        })
    }
    handleCommissaires(e){
        this.setState({
            commissaires : e.target.value
        })
    }

    saveData(){
        console.log(this.state)
        const { token } = this.props.auth;
        const { id, name, no_participants, no_stages, location, date, 
            no_commissaires, total_km,stages, participants, commissaires} = this.state
        const data = {
            id: id,
            name: name,
            no_participants: Number(no_participants),
            no_stages: Number(no_stages),
            date: date,
            location: location,
            no_commissaires: Number(no_commissaires),
            total_km: Number(total_km),
            stages: stages,
            participants: participants,
            commissaires: commissaires,
        }
        console.log(this.props.edit)  
        if(this.props.edit){
            apiPost.postData(token, `events/${data.id}/update`, data).then((res) =>{
                console.log(res)
                api.getRovers(token, "events").then((res) => {
                    this.props.action(res)
                })
            })
        } else {
            apiPost.postData(token, 'events', data).then((res) =>{
                console.log(res)
                api.getRovers(token, "events").then((res) => {
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
            controlId="date"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Date</ControlLabel>
            <FormControl
            type="date"
            value={this.state.date}
            placeholder="Enter text"
            onChange={this.handleChangeDate}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="location"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Location</ControlLabel>
            <FormControl
            type="text"
            value={this.state.location}
            placeholder="Enter text"
            onChange={this.handleChangeLocation}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="fromBasicDate"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Participants</ControlLabel>
            <FormControl
            type="number"
            value={this.state.no_participants}
            placeholder="Enter text"
            onChange={this.handleChangeNoParticipants}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup
            controlId="fromBasicDate"
            // validationState={this.getValidationState()}
            >
            <ControlLabel>Stages</ControlLabel>
            <FormControl
            type="number"
            value={this.state.no_stages}
            placeholder="Enter text"
            onChange={this.handleChangeNoStages}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup>
            <ControlLabel>Total KM</ControlLabel>
            <FormControl
            type="number"
            value={this.state.total_km}
            placeholder="Enter text"
            onChange={this.handleChangetotalKm}
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