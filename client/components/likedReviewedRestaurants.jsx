import React from "react";
import LikedReviewedCards from './LikedReviewedCards'

export default class LikedReviewedRestaurants extends React.Component {
    constructor (props) {
        super(props);
        this.toSwipePage = this.toSwipePage.bind(this)
    }

    toSwipePage(event) {
        this.props.setView('cardstack')
    }

    render () {        
        return (
            <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
                <div className='w-100 sticky-top navTop' style={{ background: 'white' }}>
                    <div className='h-25 mt-2 d-flex align-items-start justify-content-around'>
                        <div className='d-flex align-items-center text-secondary' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x'></i></div>
                        <div className='d-flex align-items-center text-pink'><i className='fas fa-heart fa-2x'></i></div>
                        <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
                    </div>
                    <div className='mx-auto d-flex align-items-center justify-content-center tab'>
                    <span className='mx-auto text-pink h3'>Liked</span>
                    <span className='mx-auto text-secondary h4'>Reviewed</span>
                    </div>
                </div>
                <div className='w-100 h-75'>
                {this.props.likedRestaurantsArr < 1 
                    ?   <div className='h-100 text-center mt-4 pt-4'>
                            <i className='fas fa-heart fa-10x text-light mt-4 pt-4'></i>
                            <br/>
                            <h5 className="text-secondary align-bottom">There are no liked restaurants</h5>
                        </div>
                    :   this.props.likedRestaurantsArr.map( (restaurant, index) =>
                            <LikedReviewedCards key={this.props.likedRestaurantsArr.length === 0 ? "noRestaurantArr" : restaurant.yelpId} restaurant={restaurant}/>
                        )
                }
                </div>
            </div>
        )
    }
}