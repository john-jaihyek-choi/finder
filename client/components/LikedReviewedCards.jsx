import React from 'react'

export default class LikedReviewedCards extends React.Component {

    render() {
        return (             
            <div className='w-100 my-1 d-flex flex-wrap align-items-center justify-content-center card rounded cardShadow' style={{ height: '200px' }}>
                <div className='d-flex align-items-center text-secondary col-7 p-1'>
                    <img className="restaurantPhoto" src={this.props.photos}/>
                </div>

                <div className='flex-column align-items-center text-secondary container col-5 p-1'>
                    <div className="col-12 p-1 h-25 text-dark pb-4">
                    <h6>{this.props.name}</h6>
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
        )
    }
}
