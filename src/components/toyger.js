import React, { Component } from 'react'

class Toyger extends Component {
    render() {
        return (
            <div className="jumbotron container">
            <h1 className="text">WELCOME TO TOYGER</h1>
                <img src={require('../bicycle.svg')} className="picture3" alt="logo"/>
            </div>
        )
    }
}

export default Toyger