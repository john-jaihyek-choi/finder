import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infoIndex: this.props.restaurant.reviews.length, photoIndex: 0 };
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.props.restaurant.coordinates.latitude, lng: this.props.restaurant.coordinates.longitude },
      zoom: 18,
    });

    const marker = new google.maps.Marker({
      position: { lat: this.props.restaurant.coordinates.latitude, lng: this.props.restaurant.coordinates.longitude },
      map: map,
      title: 'Restaurant'
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.restaurant !== this.props.restaurant) this.setState({ infoIndex: 3, photoIndex: 0 });
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
    if (!this.props.restaurant.hours.length) return <h5>No hours data</h5>;
    const days = ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, ind) => {
      let hours;
      if (!this.props.restaurant.hours[0].open.length) hours = `${day}: No data`;
      else if (!this.props.restaurant.hours[0].open[ind]) hours = `${day}: Closed`;
      else hours = `${day}: ${this.calculateTime(this.props.restaurant.hours[0].open[ind].start)} - ${this.calculateTime(this.props.restaurant.hours[0].open[ind].end)}`;
      return <div key={day}>{hours}</div>;
    });
  }

  cycleInfo() {
    if (this.state.infoIndex === this.props.restaurant.reviews.length) return this.renderHours();
    if (!this.props.restaurant.reviews.length) return;
    const rating = this.props.renderRating(this.props.restaurant.reviews[this.state.infoIndex]);

    return (
      <div className='col-11 d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-2'>{this.props.restaurant.reviews[this.state.infoIndex].text}</div>
        <div className='mb-2'>{`- ${this.props.restaurant.reviews[this.state.infoIndex].user.name}`}</div>
        <div className='mb-2'>{rating}</div>
      </div>
    );
  }

  render() {
    return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '600px' }}>
        <div className='w-100 h-50'>
          <img
            className='rounded hover' onClick={() => this.setState({ photoIndex: (this.state.photoIndex + 1) % this.props.restaurant.photosUrl.length })}
            src={this.props.restaurant.photosUrl[this.state.photoIndex]}
            alt={this.props.restaurant.restaurantName}
            style={{ objectFit: 'cover', objectPosition: 'center bottom', height: '200px', width: '100%' }} />
        </div>
        <div className='w-100 h-25 mt-2 d-flex flex-column details-text'>
          <div className='w-100 h-100 text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
            <div className=''>{this.props.restaurant.restaurantName}</div>
            <div className=''>{this.props.restaurant.location.city}, {this.props.restaurant.location.state}</div>
          </div>
          <div className='w-100 h-25 text-center text-pink font-weight-bold d-flex align-items-center justify-content-center'>
            <div className='w-100'>{this.props.renderRating(this.props.restaurant)}</div> |
            <div className='w-100'>{this.props.renderPrice(this.props.restaurant)}</div> |
            <div className='w-100'><i className="fas fa-map-marker-alt mr-2"></i>{(this.props.restaurant.distance * 0.000621371).toFixed(1)} mi</div>
          </div>
        </div>
        <div
          className='w-100 h-75 row mb-2 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center details-text hover'
          onClick={() => this.setState({ infoIndex: (this.state.infoIndex + 1) % (this.props.restaurant.reviews.length + 1) })}>
          {this.cycleInfo()}
        </div>
        <div className='w-100 h-75' id="map"></div>
      </div>
    );
  }
}
