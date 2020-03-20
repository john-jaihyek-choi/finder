import React from 'react';
import restaurantData from '../../database/restaurants.json';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: restaurantData, index: 0, canRewind: false };
    this.handleClick = this.handleClick.bind(this);
  }

  getRestaurants() {
    fetch('/api/restaurants/', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => this.setState({ restaurants: [...this.state.restaurants, data] }))
      .catch(err => console.error(err));
  }

  handleClick(e) {
    if (e.target.id === 'like') return this.setState({ index: (this.state.index + 1) % this.state.restaurants.length, canRewind: true });
    if (e.target.id === 'pass') return this.setState({ index: (this.state.index + 1) % this.state.restaurants.length, canRewind: true });
    if (e.target.id === 'rewind' && this.state.canRewind) return this.setState({ index: (this.state.index + this.state.restaurants.length - 1) % this.state.restaurants.length, canRewind: false });
  }

  render() {
    console.log('restaurantData', this.state.restaurants);
    let price = [];
    for (let i = 0; i < this.state.restaurants[this.state.index].price.length; i++) price.push(<i className="fas fa-dollar-sign"></i>);

    let rating = [];
    for (let i = 0; i < Math.floor(this.state.restaurants[this.state.index].rating); i++) rating.push(<i className="fas fa-star"></i>);
    if (!Number.isInteger(this.state.restaurants[this.state.index].rating)) rating.push(<i class="fas fa-star-half"></i>);

    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center gradient'>
        <div className='w-100 h-100 my-3'>
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <button type='button' className='btn btn-outline-light button-outline shadow'>PROFILES</button>
            <button className='d-flex align-items-center btn btn-outline-light button-outline shadow'>STACK</button>
            <button type='button' className='btn btn-outline-light button-outline shadow'>LIKED</button>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
            <div className='w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center'>
              <div className='w-50'>{rating}</div>
              |
              <div className='w-50'>{price}</div>
            </div>
            <div className='w-100 h-100'>
              <img className='rounded' src={this.state.restaurants[this.state.index].storeImageUrl} alt="" style={{ objectFit: 'cover', height: '250px', width: '100%' }}/>
            </div>
            <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
              <div>{this.state.restaurants[this.state.index].restaurantName}</div>
              <div>{this.state.restaurants[this.state.index].location.city}, {this.state.restaurants[this.state.index].location.state}</div>
              <div><i className="fas fa-map-marker-alt mr-2"></i>{(this.state.restaurants[this.state.index].distance * 0.000621371).toFixed(1)} mi
              </div>
            </div>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 d-flex align-items-center justify-content-around'>
            <button type='button' id='pass' className='mr-5 btn btn-outline-light button-outline shadow' onClick={this.handleClick}>X</button>
            <button type='button' id='rewind' className='mr-5 btn btn-outline-light button-outline shadow' onClick={this.handleClick}>REDO</button>
            <button type='button' id='like' className='btn btn-outline-light button-outline shadow' onClick={this.handleClick}>O</button>
          </div>
        </div>
      </div>
    );
  }
}
