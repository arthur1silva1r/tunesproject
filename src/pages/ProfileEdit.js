import React, { Component } from 'react';
import Header from './Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">Profile</div>
      </>
    );
  }
}

export default ProfileEdit;
