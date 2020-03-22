import React from 'react';
import IntroPages from './introPages';
import Splash from './splash';
import CardStack from './cardStack';
import GuestLogIn from './guestLogIn'
import CurrentSearch from './currentSearch'
import LikedReviewedRestaurants from './likedReviewedRestaurants'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login",
      likedRestaurants: [],
      reviewedRestaurants: []
    }
    this.setView = this.setView.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getLikedRestaurants = this.getLikedRestaurants.bind(this);
    this.getReviewedRestaurants = this.getReviewedRestaurants.bind(this);
  }

  setView(viewMode) {
    this.setState({
      view: viewMode
    });
  }

  registerUser() {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(result => result.json())
      .catch(err => console.error(err))
  }

  getLikedRestaurants() {
    fetch('/api/likedRestaurants')
      .then(result => result.json())
      .then(likedRestaurantsArr => {
        return this.setState({
          likedRestaurants: likedRestaurantsArr
        })
      })
  }

  getReviewedRestaurants() {
    fetch('/api/reviewedRestaurants')
      .then(result => result.json())
      .then(reviewedRestaurants => {
        return this.setState({
          reviewedRestaurants: reviewedRestaurants
        })
      })
  }


  render() {
    if (this.state.view === "login") {
      return <GuestLogIn guestLogIn={this.registerUser} setView={this.setView} />;
    }
    if (this.state.view === "splash") {
      return <Splash setView={this.setView} />;
    }
    if (this.state.view === "cardstack") {
      return <CardStack setView={this.setView} getLikedRestaurants={this.getLikedRestaurants} />;
    }
    if (this.state.view === "likedRestaurants" || this.state.view === "reviewed") {
      return (
        <LikedReviewedRestaurants
          setView={this.setView}
          getLikedRestaurants={this.getLikedRestaurants}
          getReviewedRestaurants={this.getReviewedRestaurants}
          likedRestaurantsArr={this.state.likedRestaurants}
          reviewedRestaurantsArr={this.state.reviewedRestaurants}
          viewState={this.state.view}/>
      )
    }
    if (this.state.view === "search") {
      return <CurrentSearch setView={this.setView} />;
    }
  }
}
