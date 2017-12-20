import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {}, token: null });
    const { userProfile, getProfile, getToken } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile , token: getToken()});
      });
    } else {
      this.setState({ profile: userProfile,  token: getToken()});
    }
  }
  render() {
    const { profile , token} = this.state
    console.log("TOKEN  "+ token)
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
