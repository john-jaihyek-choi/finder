import React from 'react'

export default class UserHomepage extends React.Component {
  constructor(props){
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
            <div className='d-flex align-items-center'><i className='fas fa-user-alt fa-2x text-pink'></i></div>
            <div className='d-flex align-items-center' id='likedRes' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x hover gray'></i></div>
          </div>
        </div>

        <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'>
          <h1>Welcome,</h1>
          <h1>Tester</h1>
        </div>
        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='w-75 btn btn-outline-light button-outline font-weight-bold'
            onClick={() => props.setView('search')}>
            LET'S EAT
        </button>
        </div>
        <div className='w-100 h-100 mb-3'></div>



      </div>
    )

  }

}
