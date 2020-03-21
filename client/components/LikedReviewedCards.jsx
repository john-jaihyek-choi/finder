import React from 'react'

export default class LikedReviewedCards extends React.Component {

    render() {
        const price = [];
        for (let i = 0; i < this.props.restaurant.price.length; i++) {
            price.push(<i className='fas fa-dollar-sign fa-sm' key={'price' + i}></i>);
        }

        const rating = [];
        for (let i = 0; i < Math.floor(this.props.restaurant.rating); i++){
            rating.push(<i className='fas fa-star fa-sm' key={'rating' + i}></i>);
        } 
        if (!Number.isInteger(this.props.restaurant.rating)) {
            rating.push(<i className='fas fa-star-half fa-sm' key={'rating' + rating.length}></i>);
        }
        
        return (             
            <div className='w-100 my-1 d-flex flex-wrap align-items-center justify-content-center card rounded cardShadow' style={{ height: '200px' }}>
                <div className='d-flex align-items-center text-secondary col-7 p-1'>
                    <img className="restaurantPhoto" src={this.props.restaurant.photosUrl[0]}/>
                </div>

                <div className='flex-column align-items-center text-secondary container col-5 p-1'>
                    <div className="col-12 p-1 h-25 text-dark pb-4">
                    <h6>{this.props.restaurant.restaurantName}</h6>
                    </div>

                    <div className='d-flex flex-wrap mt-4 mb-2 text-pink'>
                        <div className='w-50 col-6'>{rating}</div> |
                        <div className='w-50 col-5'>{price}</div>
                    </div>

                    <div className='d-flex flex-wrap mt-4 text-pink'>
                        <i className="fas fa-comment-dots fa-2x col-6"></i>
                        <i class="fas fa-trash-alt fa-2x col-6"></i>
                    </div>
                </div>
            </div>
        )
    }
}
