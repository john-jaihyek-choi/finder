import React from 'react';
import IntroPages from './introPages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // until now, there should be 3 total states (login, signup, splash)
    this.state = {
      view: "login"
    }
    this.registerUser = this.registerUser.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(viewMode) {
    this.setState({
      view: viewMode
    });
  }

  registerUser(userName) {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(userName)
    })
      .then(result => result.json())
      .then(newUser => console.log(newUser))
  }
  
  render() {
    return <IntroPages registerUser={this.registerUser} setView={this.setView}/>;
  }
}
