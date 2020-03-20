import React from "react";

export default class LikedRestaurants extends React.Component {
    render () {
        return (
            <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
            <div className='w-100 sticky-top navTop' style={{ background: 'white' }}>
                <div className='h-25 mt-2 d-flex align-items-start justify-content-around'>
                    <div className='d-flex align-items-center text-secondary'><i className='fas fa-utensils fa-2x'></i></div>
                    <div className='d-flex align-items-center text-pink'><i className='fas fa-heart fa-2x'></i></div>
                    <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
                </div>
                <div className='mx-auto d-flex align-items-center justify-content-center tab'>
                  <h3 className='mx-auto text-pink'>Liked</h3>
                  <h3 className='mx-auto text-secondary'>Reviewed</h3>
                </div>
            </div>
            <div className='w-100 h-75'>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
              <div className='w-100 my-1 d-flex flex-column align-items-center justify-content-center card rounded cardShadow' style={{ height: '150px' }}>
              </div>
            </div>
          </div>
        )
    }
}