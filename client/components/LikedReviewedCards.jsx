import React from 'react'

export default class LikedReviewedCards extends React.Component {
    constructor(props) {
        super(props)
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
        this.addReview = this.addReview.bind(this);
    }

    deleteRestaurant(event) {
        fetch('/api/likedRestaurants', {
            method: 'DELETE',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ yelpId: event.target.getAttribute('data-yelpid')})
          })
            .then(result => {
                this.props.getLikedRestaurants()
                return result.json()
            })
            .catch(err => console.error(err))
    }

    addReview(event) {
        console.log(event.target.getAttribute('data-yelpid'))
        fetch(`/api/reviews/${event.target.getAttribute('data-yelpid')}`)
            .then(result => console.log(result.json()))
            .catch(err => console.error(err))
    }

    render() {
        const price = [];
        for (let i = 0; i < this.props.restaurant.price.length; i++) {
            price.push(<i className='fas fa-dollar-sign fa-sm' key={'price' + i}></i>);
        }

        const rating = [];
        for (let i = 0; i < Math.floor(this.props.restaurant.rating); i++){
            rating.push(<i className='fas fa-star fa-sm' key={'rating' + i}></i>);
        }

        if (!Number.isInteger(this.props.restaurant.rating) && this.props.restaurant.rating) {
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

                    <div className='d-flex flex-wrap mt-2 mb-4 text-pink'>
                        <div className="w-50 col-6">
                            {this.props.viewState === "likedRestaurants" 
                                ? rating 
                                : <i class="far fa-thumbs-up fa-2x"></i>}
                        </div> 
                        {this.props.viewState === "likedRestaurants" ? "|" : ""}
                        <div className={`w-50 ${this.props.viewState === "likedRestaurants" ? "col-5" : "col-6"}`}>
                            {this.props.viewState === "likedRestaurants" 
                                ? price 
                                : <i class="far fa-thumbs-down fa-2x"></i>}
                        </div>
                    </div>

                    <div className='d-flex flex-wrap mt-4 pt-2 text-pink'>
                        {this.props.viewState === "likedRestaurants"
                            ? <><i onClick={this.addReview} data-yelpid={this.props.restaurant.yelpId} className="fas fa-comment-dots fa-2x col-6"></i>
                                <i onClick={this.deleteRestaurant} data-yelpid={this.props.restaurant.yelpId} className="fas fa-trash-alt fa-2x col-6"></i></>
                            : <><i class="fas fa-info-circle fa-2x col-6"></i>
                                <i class="fas fa-edit fa-2x col-6"></i></>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
