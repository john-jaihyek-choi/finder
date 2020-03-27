import React from 'react';
import SignUp from './signUp';
import Splash from './splash';
import CardStack from './cardStack';
import GuestLogIn from './guestLogIn';
import CurrentSearch from './currentSearch';
import LikedReviewedRestaurants from './likedReviewedRestaurants';
import WriteReview from './writeReview';
import Login from './login';
import SetLocation from './setLocation';
import UserHomepage from './userHomepage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      view: "login",
      likedRestaurants: [],
      reviewedRestaurants: [],
      review: {},
      currentQuery: '',
      cardStack: null,
      index: null,
      location: null,
      validation: null
    }
    this.setView = this.setView.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getLikedRestaurants = this.getLikedRestaurants.bind(this);
    this.getReviewedRestaurants = this.getReviewedRestaurants.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.getReview = this.getReview.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.postReview = this.postReview.bind(this);
    this.saveCardStackPos = this.saveCardStackPos.bind(this);
    this.signUp = this.signUp.bind(this);
    this.userIdentification = this.userIdentification.bind(this);
    this.from = null;
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

  signUp(userName) {
    fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ userName: userName })
    })
      .then(result => result.json())
      .then(userInfo => {
        console.log(userInfo)
        if(userInfo.err) return this.setState({ validation: userInfo.err });
        this.setState({ userInfo: userInfo})
      })
      .catch(err => console.error(err))
  }

  userIdentification (userInfoObj) {
    this.setState({
      userInfo: userInfoObj
    })
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

  getReview(yelpId, restaurantName, from) {
      this.from = from;
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
    this.setState({ currentQuery, index: 0, cardStack: null });
  }

  setLocation(lat, long, keyword, radius) {
    const locationObj = {
      lat: lat,
      long: long,
      keyword: keyword,
      radius: radius
    }
    this.setState({ location: locationObj})
  }

  saveCardStackPos(restaurants, index) {
    this.setState({ cardStack: restaurants, index })
  }

  render() {
    if (this.state.view === "login") {
      return <Login guestLogIn={this.registerUser} setView={this.setView} userIdentification={this.userIdentification} />;
    }
    if (this.state.view === "signup") {
      return <SignUp signUp={this.signUp} setView={this.setView} validation={this.state.validation} />;
    }
    if (this.state.view === "splash") {
      return <Splash setView={this.setView} setLocation={this.setLocation} userInfo={this.state.userInfo} />;
    }
    if (this.state.view === "cardstack") {
      return <CardStack setView={this.setView} getLikedRestaurants={this.getLikedRestaurants} location={this.state.location} currentQuery={this.state.currentQuery} index={this.state.index} cardStack={this.state.cardStack} saveCardStackPos={this.saveCardStackPos} />;
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
      return <CurrentSearch searchQuery={this.searchQuery} setView={this.setView} currentQuery={this.state.currentQuery} location={this.state.location} />;
    }
    if (this.state.view === "locationSettings") {
      return <SetLocation searchQuery={this.searchQuery} setView={this.setView} currentQuery={this.state.currentQuery} setLocation={this.setLocation} location={this.state.location} userInfo={this.state.userInfo}/>;
    }
    if (this.state.view === "writeReview") {
      return <WriteReview setView={this.setView} from={this.from} postReview={this.postReview} reviewInfo={this.state.review}/>;
    }
    if(this.state.view === "profile"){
      return <UserHomepage setView={this.setView} location={this.state.location} searchQuery={this.searchQuery} userInfo={this.state.userInfo}/>
    }
  }
}
