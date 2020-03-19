import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import Splash from './splash';

// Julian's template for Intro Pages (this will serve as a template for Log-in, Sign-up, and Splash Message)
export default class IntroPages extends React.Component {
  render() {
    return (
      <div
        className='mx-auto d-flex flex-column text-white align-items-center justify-content-center gradient'
        style={{ width: '100vw', height: '100vh' }}>
        <div className='w-100 h-25 mb-3 bg-white'></div>
        <div className='w-100 h-25 mb-3 bg-white'></div>
        <div className='w-100 h-25 bg-white'></div>
      </div>
    );
  }
}
