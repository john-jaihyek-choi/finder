import React from 'react';

export default class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsRate: null
        }
        this.thumbsDown = this.thumbsDown.bind(this)
        this.thumbsUp = this.thumbsUp.bind(this)
    }

    thumbsUp(event) {
        if(this.state.thumbsRate === false) {
            return this.setState({thumbsRate: true})
        }
        this.setState({
            thumbsRate: this.state.thumbsRate === null ? true : null
        })
    }

    thumbsDown(event) {
        if(this.state.thumbsRate === true) {
            return this.setState({thumbsRate: false})
        }
        this.setState({
            thumbsRate: this.state.thumbsRate === null ? false : null
        })
    }

    render() {
        console.log(this.state.thumbsRate)
        return (
            <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center'>
                <div className='w-100 my-3'>
                    <div className='h-25 mt-2 d-flex align-items-start justify-content-around'>
                        <div className='d-flex align-items-center text-secondary'><i className='fas fa-arrow-left fa-2x'></i></div>
                        <div className='d-flex align-items-center text-white'><i className='fas fa-utensils fa-2x'></i></div>
                        <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
                    </div>
                </div>
                <div className='row text-center d-flex flex-column align-items-center justify-content-around'>
                    <span className='col text-pink h4'>Name of the Restaurant</span>
                    <div className='col w-75 my-4 text-pink d-flex justify-content-around'>
                        <i onClick={this.thumbsUp} className={`fa-4x ${this.state.thumbsRate === true ? "fas fa-thumbs-up" : "far fa-thumbs-up"}`}></i>
                        <i onClick={this.thumbsDown} className={`fa-4x ${this.state.thumbsRate === false ? "fas fa-thumbs-down" : "far fa-thumbs-down"}`}></i>
                    </div>
                </div>
                <form className='w-100 my-4' id="reviewForm">
                    <textarea form='reviewForm' className='w-75 mx-auto px-4 d-flex flex-column align-items-center justify-content-center card rounded shadow'
                        style={{ height: '300px' }}
                        placeholder='Please input your review'></textarea>
                </form>
                <div className='row w-100 h-25 pb-4 text-center d-flex flex-column align-items-center justify-content-center'>
                    <button className='w-50 h-25 btn text-white submitButton'>
                        <span className="h6">SUBMIT</span> 
                    </button>
                    <button type='submit' form="reviewForm" className='w-50 h-25 mt-4 btn text-white submitButton'>
                        <span className="h6">CLEAR</span> 
                    </button>
                </div>
            </div>
        )
    }
}