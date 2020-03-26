import React from "react";
import LikedReviewedCards from './LikedReviewedCards'
import Details from './details';

export default class UserHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.toSwipePage = this.toSwipePage.bind(this)
  }

  toSwipePage(event) {
    this.props.setView('cardstack')
  }

  render() {

    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 h-100 my-3'>
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <div className='d-flex align-items-center'></div>
            <div className='d-flex align-items-center'><i className='fas fa-user-alt fa-2x text-pink'></i></div>
            <div className='d-flex align-items-center' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x hover gray'></i></div>
          </div>
        </div>

        <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start text-pink'>
          <h1>FiNdEr_Tim</h1>
        </div>

        <div className='w-100 h-100 mb-3'>
          <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
            <div className="col-md align-items-center">
              <button type='button' className='stack-button gray btn button-outline shadow justify-content-left' onClick={this.handleClick}>
                <i className='fas fa-map-marker-alt fa-2x'></i>
                <p>LOCATION</p>
              </button>
            </div>

            <div className="col-md align-items-center">
              <button type='button' className='stack-button gray btn button-outline shadow' onClick={this.handleClick}>
                <i className='fas fa-search fa-2x'></i>
                <p clas ='m-4'>SEARCH</p>
              </button>
            </div>

          </div>
        </div>

        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='w-75 btn btn-outline-light button-outline shadow text-pink'
            onClick={() => props.setView('userHomepage')}>
            LOGOUT
        </button>
        </div>

      </div>
    )

  }

}
