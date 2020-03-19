//es
import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import Splash from './splash';

// Julian's template for Intro Pages (this will serve as a template for Log-in, Sign-up, and Splash Message)
export default class IntroPages extends React.Component {
  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
        <div className='w-100 h-100 my-3'></div>
        <div className='w-100 h-100 mb-3'></div>
        <div className='w-100 h-100 mb-3'></div>
        <div className='w-100 h-100 mb-3'></div>
      </div>
    );
  }
}
