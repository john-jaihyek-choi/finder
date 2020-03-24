import React from 'react';

export default class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsRate: null,
            reviewNote: ""
        }
        this.thumbsDown = this.thumbsDown.bind(this);
        this.thumbsUp = this.thumbsUp.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.backToCards = this.backToCards.bind(this);
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

    inputChange(event) {
        event.preventDefault();
        this.setState({
            reviewNote: event.target.value
        })
    }

    backToCards(){
        this.props.setView('cardstack')
    }

    submitForm(event) {
        event.preventDefault()
        console.log(this.state.thumbsRate)
        console.log(this.state.reviewNote)
    }

    componentDidUpdate(prevProps) {
        if((this.props.reviewInfo !== prevProps.reviewInfo)) {
            this.setState({
                reviewNote: this.props.reviewInfo.note,
                thumbsRate: this.props.reviewInfo.thumbsRate
            });
            if(this.props.reviewInfo.note === null){
                this.setState({
                    reviewNote: ""
                })
            }
        }
    }

    render() {
        return (
            <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center'>
                <div className='w-100 my-3'>
                    <div className='h-25 mt-2 d-flex align-items-start justify-content-around'>
                        <div className='d-flex align-items-center text-secondary'><i onClick={this.backToCards} className='fas fa-arrow-left fa-2x'></i></div>
                        <div className='d-flex align-items-center text-white'><i className='fas fa-utensils fa-2x'></i></div>
                        <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
                    </div>
                </div>
                <div className='row text-center d-flex align-items-center justify-content-around'>
                    <span className='col-12 text-pink h4'>{this.props.reviewInfo.restaurantName}</span>
                    <div className='col-12 w-75 my-4 text-pink d-flex justify-content-center'>
                        <i onClick={this.thumbsUp} className={`fa-4x mr-4 ${this.state.thumbsRate === true ? "fas fa-thumbs-up" : "far fa-thumbs-up"}`}></i>
                        <i onClick={this.thumbsDown} className={`fa-4x ml-4 ${this.state.thumbsRate === false ? "fas fa-thumbs-down" : "far fa-thumbs-down"}`}></i>
                    </div>
                </div>
                <form className='w-100 my-4' id="reviewForm" onSubmit={this.submitForm}>
                    <textarea
                        onChange={this.inputChange}
                        className='w-75 mx-auto px-4 d-flex flex-column align-items-center justify-content-center card rounded shadow'
                        style={{ height: '300px' }}
                        value={this.state.reviewNote}
                        placeholder='Please input your review here'></textarea>
                </form>
                <div className='row w-100 h-25 pb-4 text-center d-flex flex-column align-items-center justify-content-center'>
                    <button type='submit' form="reviewForm" className='w-50 h-25 btn text-white submitButton'>
                        <span className="h6">SUBMIT</span> 
                    </button>
                    <button type='reset' form="reviewForm" className='w-50 h-25 mt-4 btn text-white submitButton'>
                        <span className="h6">CLEAR</span> 
                    </button>
                </div>
            </div>
        )
    }
}