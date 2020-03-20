import React from "react";

export default class LikedRestaurants extends React.Component {
    render () {
        return (
            <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
            <div className='w-100 h-50 my-3'>
                <div className='h-25 mt-4 d-flex align-items-start justify-content-around'>
                    <div className='d-flex align-items-center text-secondary'><i className='fas fa-utensils fa-2x'></i></div>
                    <div className='d-flex align-items-center text-pink'><i className='fas fa-heart fa-2x'></i></div>
                    <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
                </div>
                <div className='mx-auto d-flex align-items-center justify-content-center tab'>
                  <h3 className='mx-auto text-pink'>Liked</h3>
                  <h3 className='mx-auto text-secondary'>Reviewed</h3>
                </div>
            </div>
            <div className='w-100 h-100 mb-3'>
              <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
              </div>
            </div>
          </div>
        )
    }
}