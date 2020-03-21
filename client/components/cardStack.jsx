import React from 'react';
import restaurantData from '../../database/restaurants.json';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: restaurantData, index: 0, canRewind: false };
    this.handleClick = this.handleClick.bind(this);
    this.toLikedRestaurant = this.toLikedRestaurant.bind(this);
  }

  getRestaurants() {
    fetch('/api/restaurants/')
      .then(res => res.json())
      .then(data => this.setState({ restaurants: data }))
      .catch(err => console.error(err));
  }

  likeRestaurant(yelpId, index) {
    fetch('/api/likedRestaurants/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yelpId })
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    const newArr = Array.from(this.state.restaurants);
    newArr.splice(index, 1);
    return this.setState({ restaurants: newArr, index: this.state.index % newArr.length, canRewind: false });
  }

  handleClick(e) {
    if (e.currentTarget.id === 'like' && this.state.restaurants.length) return this.likeRestaurant(this.state.restaurants[this.state.index].yelpId, this.state.index);
    if (e.currentTarget.id === 'pass') return this.setState({ index: (this.state.index + 1) % this.state.restaurants.length, canRewind: true });
    if (e.currentTarget.id === 'rewind' && this.state.canRewind) return this.setState({ index: (this.state.index + this.state.restaurants.length - 1) % this.state.restaurants.length, canRewind: false });
  }

  toLikedRestaurant (e) {
    this.props.getLikedRestaurants();
    this.props.setView('likedRestaurants');
  }

  renderCard() {
    if (!this.state.restaurants.length) return <h1 className='text-pink text-center font-weight-bold'>No matches found</h1>;
  
    const price = [];
    for (let i = 0; i < this.state.restaurants[this.state.index].price.length; i++) price.push(<i className='fas fa-dollar-sign' key={'price' + i}></i>);

    const rating = [];
    for (let i = 0; i < Math.floor(this.state.restaurants[this.state.index].rating); i++) rating.push(<i className='fas fa-star' key={'rating' + i}></i>);
    if (!Number.isInteger(this.state.restaurants[this.state.index].rating) && this.state.restaurants[this.state.index].rating) rating.push(<i className='fas fa-star-half' key={'rating' + rating.length}></i>);

    return (
      <React.Fragment>
        <div className='w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center'>
          <div className='w-50'>{rating}</div> |
          <div className='w-50'>{price}</div>
        </div>
        <div className='w-100 h-100'>
          <img
            className='rounded'
            src={this.state.restaurants[this.state.index].storeImageUrl}
            alt={this.state.restaurants[this.state.index].restaurantName}
            style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
        </div>
        <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          <div>{this.state.restaurants[this.state.index].restaurantName}</div>
          <div>{this.state.restaurants[this.state.index].location.city}, {this.state.restaurants[this.state.index].location.state}</div>
          <div><i className="fas fa-map-marker-alt mr-2"></i>{(this.state.restaurants[this.state.index].distance * 0.000621371).toFixed(1)} mi</div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 h-100 my-3'>
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
            <div className='d-flex align-items-center text-pink'><i className='fas fa-utensils fa-2x'></i></div>
            <div className='d-flex align-items-center text-secondary' onClick={this.toLikedRestaurant}><i className='fas fa-heart fa-2x'></i></div>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
            {this.renderCard()}
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 d-flex align-items-center justify-content-around'>
            <button type='button' id='pass' className='stack-button pink btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-times fa-lg'></i>
            </button>
            <button type='button' id='rewind' className='stack-button yellow btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-undo fa-lg'></i>
            </button>
            <button type='button' id='like' className='stack-button green btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-heart fa-lg'></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
