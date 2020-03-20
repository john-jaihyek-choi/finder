import React from 'react';
import IntroPages from './introPages';
import Splash from './splash';
import GuestLogIn from './guestLogIn'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login"
    }
    this.setView = this.setView.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  setView(viewMode) {
    this.setState({
      view: viewMode
    });
  }

  registerUser(userName) {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(result => result.json())
      .then(newUser => console.log(newUser));
  }

  render() {
    if(this.state.view === "login") {
      return <GuestLogIn guestLogIn={this.registerUser} setView={this.setView} />;
    }
    if(this.state.view === "splash") {
      return <Splash setView={this.setView}/>;
    }
  }
}
