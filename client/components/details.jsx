import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapIsReady: false };
    this.map = null;
  }

  componentDidMount() {
    this.setState({ mapIsReady: true });
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.80587, lng: -122.42058 },
        zoom: 21,
      });
    }
  }

  calculateTime(time) {
    let num = Number(time.slice(0, 2));
    let period = 'AM';
    if (num >= 12) {
      period = 'PM';
      num -= 12;
    }
    if (num === 0) return `12:${time.slice(2, time.length)} ${period}`;
    return `${num.toString()}:${time.slice(2, time.length)} ${period}`;
  }

  renderHours() {
    const days = ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, ind) => {
      let hours;
      if (!this.props.restaurant.hours[0].open[ind]) hours = `${day}: Closed`;
      else hours = `${day}: ${this.calculateTime(this.props.restaurant.hours[0].open[ind].start)} - ${this.calculateTime(this.props.restaurant.hours[0].open[ind].end)}`;
      return <div>{hours}</div>;
    });
  }

  render() {
    return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '650px' }}>
        <div className='w-100 h-50'>
          <img
            className='rounded'
            onClick={() => this.props.toCardStack()}
            src={this.props.restaurant.storeImageUrl}
            alt={this.props.restaurant.restaurantName}
            style={{ objectFit: 'cover', objectPosition: 'center bottom', height: '200px', width: '100%' }} />
        </div>
          <div className='w-100 h-25 text-center text-pink font-weight-bold d-flex align-items-center justify-content-center'>
          <div className='w-100'>{this.props.rating}</div> |
          <div className='w-100'>{this.props.price}</div> |
          <div className='w-100'><i className="fas fa-map-marker-alt mr-2"></i>{(this.props.restaurant.distance * 0.000621371).toFixed(1)} mi</div>
        </div>
        <div className='w-100 h-25 text-center text-pink font-weight-bold d-flex align-items-center justify-content-center'>
          <div className='w-100'>{this.props.restaurant.restaurantName}</div> |
          <div className='w-100'>{this.props.restaurant.location.city}, {this.props.restaurant.location.state}</div>
        </div>
        <div className='w-100 h-75 mb-2 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center details-text'>
          {this.renderHours()}
        </div>
        <div className='w-100 h-75' id="map"></div>
      </div>
    );
  }
}
