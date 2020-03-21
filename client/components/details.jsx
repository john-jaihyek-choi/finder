import React from 'react';
import restaurantData from '../../database/restaurants.json';

export default function Details(props) {
  return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '550px' }}>
      <div className='w-100 h-100'>
        <img
          className='rounded'
          onClick={() => props.toCardStack()}
          src={props.restaurant.storeImageUrl}
          alt={props.restaurant.restaurantName}
          style={{ objectFit: 'cover', objectPosition: 'center bottom', height: '150px', width: '100%' }} />
      </div>
        <div className='w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center'>
          <div className='w-50'>{props.rating}</div> |
          <div className='w-50'>{props.price}</div>
        </div>
        <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          <div>{props.restaurant.restaurantName}</div>
          <div>{props.restaurant.location.city}, {props.restaurant.location.state}</div>
          <div><i className="fas fa-map-marker-alt mr-2"></i>{(props.restaurant.distance * 0.000621371).toFixed(1)} mi</div>
        </div>
      </div>
    );
}
