import React from "react";
import LikedReviewedCards from './LikedReviewedCards'
import Details from './details';

export default class LikedReviewedRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false, details: null };
    this.toSwipePage = this.toSwipePage.bind(this)
    this.toReviewedPage = this.toReviewedPage.bind(this)
    this.toLikedPage = this.toLikedPage.bind(this)
    this.toDetails = this.toDetails.bind(this)
    this.toPrevious = this.toPrevious.bind(this)
  }

  toSwipePage(event) {
    this.props.setView('cardstack')
  }

  toLikedPage(event) {
    this.props.setView('likedRestaurants')
  }

  toReviewedPage(event) {
    this.props.getReviewedRestaurants()
    this.props.setView('reviewed')
  }

  toDetails(restaurant) {
    this.setState({ showDetails: true, details: restaurant });
  }

  toPrevious() {
    this.setState({ showDetails: false });
  }

  renderCard() {
    let restaurantsArr = null
    if (this.props.viewState === "likedRestaurants") {
      restaurantsArr = this.props.likedRestaurantsArr
    } else if (this.props.viewState === "reviewed") {
      restaurantsArr = this.props.reviewedRestaurantsArr
    }

    // if (this.state.showDetails) return <Details price={price} rating={rating} restaurant={this.state.details} toCardStack={this.toCardStack} />;

    if (restaurantsArr < 1) {
      return (
        <div className='h-100 text-center mt-4 pt-4'>
          <i className='fas fa-heart fa-10x text-light mt-4 pt-4'></i>
          <br />
          <h5 className="text-secondary align-bottom">There are no {this.props.viewState === "likedRestaurants" ? "liked" : "reviewed"} restaurants</h5>
        </div>
      );
    }
    return (
      restaurantsArr.map(restaurant =>
        <LikedReviewedCards
          key={restaurantsArr.length === 0
            ? "noRestaurantArr"
            : restaurant.yelpId}
          restaurant={restaurant}
          viewState={this.props.viewState}
          getLikedRestaurants={this.props.getLikedRestaurants}
          getReview={this.props.getReview}
          deleteRestaurant={this.props.deleteRestaurant}
          setView={this.props.setView}
          toDetails={this.toDetails} />
      )
    );
  }

  render() {
    if (this.state.showDetails) return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 h-100 my-3'>
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
            <div className='d-flex align-items-center text-pink'><i className='fas fa-heart fa-2x'></i></div>
            <div className='d-flex align-items-center text-secondary'><i className='fas fa-heart fa-2x hover'></i></div>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <Details restaurant={this.state.details} toPrevious={this.toPrevious} />;
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 pb-4 d-flex align-items-end justify-content-around'>
            {/* <button type='button' id='pass' className='stack-button pink btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-times fa-lg'></i>
            </button>
            <button type='button' id='rewind' className='stack-button yellow btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-undo fa-lg'></i>
            </button>
            <button type='button' id='like' className='stack-button green btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-heart fa-lg'></i>
            </button> */}
          </div>
        </div>
      </div>
    );

    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 sticky-top navTop' style={{ background: 'white' }}>
          <div className='h-25 mt-2 d-flex align-items-start justify-content-around'>
            <div className='d-flex align-items-center text-secondary' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x'></i></div>
            <div className='d-flex align-items-center text-pink'><i className='fas fa-heart fa-2x'></i></div>
            <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
          </div>
          <div className='mx-auto d-flex align-items-center justify-content-center tab'>
            <span className={`mx-auto ${this.props.viewState === "reviewed" ? 'text-secondary h4' : 'text-pink h3'}`} onClick={this.toLikedPage}>Liked</span>
            <span className={`mx-auto ${this.props.viewState === "likedRestaurants" ? 'text-secondary h4' : 'text-pink h3'}`} onClick={this.toReviewedPage}>Reviewed</span>
          </div>
        </div>
        <div className='w-100 h-75'>
          {this.renderCard()}
          {/* {restaurantsArr < 1
            ? <div className='h-100 text-center mt-4 pt-4'>
              <i className='fas fa-heart fa-10x text-light mt-4 pt-4'></i>
              <br />
              <h5 className="text-secondary align-bottom">There are no {this.props.viewState === "likedRestaurants" ? "liked" : "reviewed"} restaurants</h5>
            </div>
            : restaurantsArr.map(restaurant =>
              <LikedReviewedCards
                key={restaurantsArr.length === 0
                  ? "noRestaurantArr"
                  : restaurant.yelpId}
                restaurant={restaurant}
                viewState={this.props.viewState}
                getLikedRestaurants={this.props.getLikedRestaurants}
                getReview={this.props.getReview}
                deleteRestaurant={this.props.deleteRestaurant}
                setView={this.props.setView} />
            )
          } */}
        </div>
      </div>
    )
  }
}
