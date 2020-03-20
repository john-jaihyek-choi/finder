import React from 'react';

export default class GuestLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.guestClick = this.guestClick.bind(this);
  }

  guestClick(event) {
  event.preventDefault();
  this.props.setView('splash');
    fetch("/api/users", {
      method: 'POST'
      // headers: {"Content-Type": "application/json"}
      // body: JSON.stringify()
    })
    .then(response => console.log(response))
  }

render() {
  return (
    <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
      <div className='w-100 h-100 my-3'></div>
      <div className="flex-row my-5">
        <h1 className="title">finder<i className="fas fa-utensils fa-lg white mx-2"></i></h1>
      </div>
      <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        <button
          type='button'
          className='w-75 py-3 btn btn-outline-light button-outline font-weight-bold'
          onClick={this.guestClick}>
          CONTINUE AS GUEST
        </button>
      </div>
      <div className='w-100 h-100 mb-3'></div>
    </div>
  );
 }
}
