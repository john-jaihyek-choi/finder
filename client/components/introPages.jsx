//es
import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import Splash from './splash';

export default class IntroPages extends React.Component {
  render() {
    return (

      <div
        className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
        <SignUp registerUser={this.props.registerUser} setView={this.props.setView}/>
      </div>
    );
  }
}
