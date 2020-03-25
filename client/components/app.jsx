import React from 'react';
import IntroPages from './introPages';
import Splash from './splash';
import CardStack from './cardStack';
import GuestLogIn from './guestLogIn';
import CurrentSearch from './currentSearch';
import LikedReviewedRestaurants from './likedReviewedRestaurants';
import WriteReview from './writeReview';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login",
      likedRestaurants: [],
      reviewedRestaurants: [],
      review: {},
      location: null
    }
    this.setView = this.setView.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getLikedRestaurants = this.getLikedRestaurants.bind(this);
    this.getReviewedRestaurants = this.getReviewedRestaurants.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.getReview = this.getReview.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.currentQuery = '';
    this.setLocation = this.setLocation.bind(this);
    this.postReview = this.postReview.bind(this);
    this.saveCardStackPos = this.saveCardStackPos.bind(this);
    this.cardStack = null;
    this.index = 0;
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
      .then(likedRestaurantsArr =>
        this.setState({
          likedRestaurants: likedRestaurantsArr
        })
      )
      .catch(err => console.error(err))
  }

  getReviewedRestaurants() {
    fetch('/api/reviewedRestaurants')
      .then(result => result.json())
      .then(reviewedRestaurants =>
        this.setState({
          reviewedRestaurants: reviewedRestaurants
        })
      )
      .catch(err => console.error(err))
  }

  deleteRestaurant(yelpId, tableName) {
    fetch('/api/likedReviewedRestaurants', {
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          yelpId: yelpId,
          tableName: tableName
        })
      })
        .then(result =>
            this.getLikedRestaurants()
        )
        .catch(err => console.error(err))
  }

  getReview(yelpId, restaurantName) {
      fetch(`/api/reviews?yelpId=${yelpId}&restaurantName=${restaurantName}`)
          .then(result => result.json())
          .then(review => {
              this.setState({
                review: review
              })
            }
          )
          .catch(err => console.error(err))
  }

  postReview(yelpId, note, thumbsRate, newReview) {
    fetch('/api/reviews', {
      method: `${newReview ? 'POST' : 'PATCH'}`,
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
          thumbsRate: thumbsRate,
          note: note,
          yelpId: yelpId
      })
    })
      .then(result => result.json())
      .catch(err => console.error(err))
  }

  searchQuery(currentQuery) {
    this.currentQuery = currentQuery;
  }

  setLocation(lat, long) {
    this.setState({ location: { lat, long } });
  }

  saveCardStackPos(restaurants, index) {
    this.cardStack = restaurants;
    this.index = index;
  }

  render() {
    if (this.state.view === "login") {
      return <GuestLogIn guestLogIn={this.registerUser} setView={this.setView} />;
    }
    if (this.state.view === "splash") {
      return <Splash setView={this.setView} setLocation={this.setLocation} />;
    }
    if (this.state.view === "cardstack") {
      return <CardStack setView={this.setView} getLikedRestaurants={this.getLikedRestaurants} location={this.state.location} currentQuery={this.currentQuery} index={this.index} cardStack={this.cardStack} saveCardStackPos={this.saveCardStackPos} />;
    }
    if (this.state.view === "likedRestaurants" || this.state.view === "reviewed") {
      return (
        <LikedReviewedRestaurants
          setView={this.setView}
          getLikedRestaurants={this.getLikedRestaurants}
          getReviewedRestaurants={this.getReviewedRestaurants}
          deleteRestaurant={this.deleteRestaurant}
          getReview={this.getReview}
          postReview={this.postReview}
          likedRestaurantsArr={this.state.likedRestaurants}
          reviewedRestaurantsArr={this.state.reviewedRestaurants}
          viewState={this.state.view}/>
      )
    }
    if (this.state.view === "search") {
      return <CurrentSearch searchQuery={this.searchQuery} setView={this.setView} />;
    }
    if (this.state.view === "writeReview") {
      return <WriteReview setView={this.setView} postReview={this.postReview} reviewInfo={this.state.review}/>;
    }
  }
}
