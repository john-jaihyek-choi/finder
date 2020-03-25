import React from 'react';

export default function Splash(props) {
  navigator.geolocation.getCurrentPosition((position) => props.setLocation(position.coords.latitude, position.coords.longitude));

  return (
    <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
      <div className='w-100 h-100 my-3'></div>
      <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'>
        <h1>Welcome,</h1>
        <h1>Tester</h1>
      </div>
      <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        <button
          type='button'
          className='w-75 btn btn-outline-light button-outline font-weight-bold'
          onClick={() => props.setView('set-search')}>
          LET'S EAT
        </button>
      </div>
      <div className='w-100 h-100 mb-3'></div>
    </div>
  );
}
