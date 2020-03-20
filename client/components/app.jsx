import React from 'react';
import IntroPages from './introPages';
import Splash from './splash';
import CardStack from './cardStack';
import GuestLogIn from './guestLogIn'
import CurrentSearch from './currentSearch'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login",
      likedRestaurants: []
    }
    this.setView = this.setView.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getLikedRestaurants = this.getLikedRestaurants.bind(this);
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

  getLikedRestaurants () {
    fetch('/api/likedRestaurants')
      .then(result => result.json())
      .then(likedRestaurantsArr => {
        this.setState({
          likedRestaurants: likedRestaurantsArr
        })
      })
  }

  render() {
    console.log(this.state.likedRestaurants)
    // return <CardStack setView={this.setView} getLikedRestaurants={this.getLikedRestaurants}/>;
    // if(this.state.view === "login") {
    //   return <GuestLogIn guestLogIn={this.registerUser} setView={this.setView} />;
    // }
    // if(this.state.view === "splash") {
    //   return <Splash setView={this.setView} />;
    // }
    return <CurrentSearch />
  }
}
