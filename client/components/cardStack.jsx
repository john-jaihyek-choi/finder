import React from 'react';
import restaurantData from '../../database/restaurants.json';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: restaurantData };
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
    return null;
  }

  render() {
    console.log('restaurantData', this.state.restaurants);
    let price = [];
    for (let i = 0; i < this.state.restaurants[0].price.length; i++) price.push(<i class="fas fa-dollar-sign"></i>);
    let rating = [];
    for (let i = 0; i < this.state.restaurants[0].price.length; i++) rating.push(<i class="fas fa-star"></i>);

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
              <img className='rounded' src={this.state.restaurants[0].storeImageUrl} alt="" style={{ objectFit: 'cover', height: '250px', width: '100%' }}/>
            </div>
            <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
              <div>{this.state.restaurants[0].restaurantName}</div>
              <div>{this.state.restaurants[0].location.city}, {this.state.restaurants[0].location.state}</div>
              <div><i className="fas fa-map-marker-alt mr-2"></i>{(this.state.restaurants[0].distance * 0.000621371).toFixed(1)} mi
              </div>
            </div>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 d-flex align-items-center justify-content-around'>
            <button type='button' id='pass' className='mr-5 btn btn-outline-light button-outline shadow' onClick={this.handleClick}>X</button>
            <button type='button' id='redo' className='mr-5 btn btn-outline-light button-outline shadow' onClick={this.handleClick}>REDO</button>
            <button type='button' id='like' className='btn btn-outline-light button-outline shadow' onClick={this.handleClick}>O</button>
          </div>
        </div>
      </div>
    );
  }
}
