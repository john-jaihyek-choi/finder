import React from 'react';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurants: []};
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

  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center gradient'>
        <div className='w-100 h-100 my-3'>
          <div className='h-25 d-flex justify-content-around'>
            <button className='shadow'>PROFILES</button>
            <div className='d-flex align-items-center shadow'>STACK</div>
            <button className='shadow'>LIKED</button>
          </div>
        </div>
        <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'></div>
        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='d-flex justify-content-around'>
            <button className='shadow'>X</button>
            <button className='shadow'>REDO</button>
            <button className='shadow'>O</button>
          </div>
        </div>
      </div>
    );
  }
}
