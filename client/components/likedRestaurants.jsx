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
              <div className='w-100 my-1 d-flex flex-wrap align-items-center justify-content-center card rounded cardShadow' style={{ height: '200px' }}>
                <div className='d-flex align-items-center text-secondary col-7 p-1'>
                    <img className="restaurantPhoto" src="https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg" alt="https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg"/>
                </div>
                <div className='flex-column align-items-center text-secondary container col-5 p-1'>
                    <div className="col-12 p-1 h-25 text-dark pb-4">
                        <h6>Some Restaurant</h6>
                    </div>
                    <div className='d-flex flex-wrap mt-4'>
                        <i className="fas fa-thumbs-up fa-2x col-6"></i>
                        <i className="far fa-thumbs-down fa-2x col-6"></i>
                    </div>
                    <div className='d-flex flex-wrap mt-4'>
                        <i className="fas fa-comment-dots fa-2x col-6"></i>
                        <i className="fas fa-edit fa-2x col-6"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}