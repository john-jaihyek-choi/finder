import React from 'react';
import restaurantData from '../../database/restaurants.json';

export default function Details(props) {
  const calculateTime = (time) => {
    let num = Number(time.slice(0, 2));
    let period = 'AM';
    if (num >= 12) {
      period = 'PM';
      num -= 12;
    }
    if (num === 0) return `12:${time.slice(2, time.length)} ${period}`;
    return `${num.toString()}:${time.slice(2, time.length)} ${period}`;
  };

  const renderHours = () => {
    const days = ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, ind) => {
      let hours;
      if (!props.restaurant.hours[0].open[ind]) hours = `${day}: Closed`;
      else hours = `${day}: ${calculateTime(props.restaurant.hours[0].open[ind].start)} - ${calculateTime(props.restaurant.hours[0].open[ind].end)}`;
      return <div>{hours}</div>;
    });
  };

  return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '550px' }}>
        <div className='w-100 h-50'>
          <img
            className='rounded'
            onClick={() => props.toCardStack()}
            src={props.restaurant.storeImageUrl}
            alt={props.restaurant.restaurantName}
            style={{ objectFit: 'cover', objectPosition: 'center bottom', height: '200px', width: '100%' }} />
        </div>
        <div className='w-100 h-25 text-center text-pink d-flex align-items-center justify-content-center'>
          <div className='w-50'>{props.rating}</div> |
          <div className='w-50'>{props.price}</div>
        </div>
        <div className='w-100 h-25 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          <div>{props.restaurant.restaurantName}</div>
          <div>{props.restaurant.location.city}, {props.restaurant.location.state}</div>
          <div><i className="fas fa-map-marker-alt mr-2"></i>{(props.restaurant.distance * 0.000621371).toFixed(1)} mi</div>
        </div>
        <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          {renderHours()}
        </div>
        {/* <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex align-items-center justify-content-center'>
          <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
            <div>{props.restaurant.restaurantName}</div>
            <div>{props.restaurant.location.city}, {props.restaurant.location.state}</div>
            <div><i className="fas fa-map-marker-alt mr-2"></i>{(props.restaurant.distance * 0.000621371).toFixed(1)} mi</div>
          </div>
          <div className='w-50 h-100 text-center text-pink d-flex flex-column align-items-center justify-content-center'>
            <div className='w-100'>{props.rating}</div>
            <div className='w-100'>{props.price}</div>
          </div>
        </div> */}
      </div>
    );
}
