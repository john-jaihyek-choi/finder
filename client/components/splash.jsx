import React from 'react';

export default class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promptCheck: true
    }
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    if(this.props.locationPermission === 'denied' && this.state.promptCheck) return this.setState({promptCheck: false})
    this.props.setView('profile')
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.setLocation(position.coords.latitude, position.coords.longitude, '', this.props.userInfo.distanceRadius)
      navigator.permissions.query({name: 'geolocation'})
        .then(result => this.props.locationPrompt(result.state))}
      ,
      () => navigator.permissions.query({name: 'geolocation'})
        .then(result => this.props.locationPrompt(result.state)));
  }

  render() {

    if(this.state.promptCheck) {
      return (
        <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
          <div className='w-100 h-100 my-3'></div>
          <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'>
            <h1>Welcome,</h1>
            <h1>{this.props.userInfo.userName}</h1>
          </div>
          <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
            <button
              type='button'
              className='w-75 btn btn-outline-light button-outline font-weight-bold'
              onClick={this.getLocation}>
              LET'S EAT
            </button>
          </div>
          <div className='w-100 h-100 mb-3'></div>
        </div>
      )
    }

    if(!this.state.promptCheck) {
      return (
        <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
          <div className='w-100 h-100 my-3'></div>
          <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start text-center'>
            <span className="w-75 h6">Your geolocation is currently disabled</span>
            <br/>
            <span className="w-75 h6">For the best experience, it is suggested that the geolocation setting is enabled</span>
            <br/>
            <span className="w-75 h6">If you would like to proceed your search with geolocation, please <a className="underline text-white" href="https://www.clockspot.com/support/articles/how-to-enable-geolocation-tracking/" target="_blank"><u>reconfigure your geolocation settings</u></a></span>
          </div>
          <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-center'>
            <button
              id="reject"
              type='button'
              className='w-75 mt-4 btn btn-outline-light button-outline font-weight-bold'
              onClick={this.getLocation}>
                <span className="h6">Continue to Profile Page</span> 
            </button>
          </div>
          <div className='w-100 h-100 mb-3'></div>
        </div>
      )
    }
  }
}
