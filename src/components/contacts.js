import React, { Component } from 'react'

class Contacts extends Component {
    render() {
        return (
            <div className="jumbotron container">
            <div className="row">
            <div className="col-sm-6"> 
            <h1 class="display-3">Contacts</h1>
            <h1> </h1>
            <p> Name: Migle Beresineviciute </p>
            <p> Adress: Kaunas, Lithuania </p>
            <p> Group: IFF-4/1 </p>
            <p> University: Kaunas University of Technology </p>
            <p> Phone: +37063015*90 </p>
            </div>
             <div className="col-sm-4">
             <img src={require('../toyger04.png')} className="picture2" alt="logo"/>
                 </div>
                 </div>
                 </div>
        )
    }
}

export default Contacts