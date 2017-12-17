import React, { Component } from 'react'

class About extends Component {
    render() {
        return (
            <div className="jumbotron container">
            <div className="row">
            <div className="col-sm-8">
            <h1 class="display-3">About Us</h1>
                <p>
                 With Toyger, it`s easy to look cycling road races results.</p>
                 <p> You can see all the information related to particular race. </p>
                 <p>Only privilleged users can modify data. </p>
                 <p> All rights reserved by Miglei Beresineviciute IFF-4/1 KTU. </p>
                </div>
                <div className="col-sm-4">
                <img src={require('../toyger03.png')} className="picture2" alt="logo"/>
                    </div>
             </div>
            </div>
        )
    }
}

export default About