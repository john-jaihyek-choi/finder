import React from 'react';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
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
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <button type='button' className='btn btn-outline-light button-outline shadow'>PROFILES</button>
            <button className='d-flex align-items-center btn btn-outline-light button-outline shadow'>STACK</button>
            <button type='button' className='btn btn-outline-light button-outline shadow'>LIKED</button>
          </div>
        </div>
        <div className='w-100 h-100 mb-3 d-flex justify-content-center align-items-center'>
          <div className='w-75 card rounded' style={{ height: '450px'}}></div>
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 d-flex align-items-center justify-content-around'>
            <button type='button' className='mr-5 btn btn-outline-light button-outline shadow'>X</button>
            <button type='button' className='mr-5 btn btn-outline-light button-outline shadow'>REDO</button>
            <button type='button' className='btn btn-outline-light button-outline shadow'>O</button>
          </div>
        </div>
      </div>
    );
  }
}
