import React from "react";

export default class UserHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null
    }
    this.toSwipePage = this.toSwipePage.bind(this)
    this.swipeToSearch = this.swipeToSearch.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.logout = this.logout.bind(this)
  }

  toSwipePage(event) {
    if(this.props.location === null && this.state.loading === null) {
      this.setState({ loading: true });
    }
    if(this.props.location !== null && this.state.loading) {
      this.setState({ loading: false });
    }
    if(!this.props.currentQuery) {
      this.props.searchQuery('food');
    }
    this.props.setView('cardstack')
  }

  swipeToSearch(event) {
    this.props.setView('search')
  }

  getLocation(event) {
    this.props.setView('locationSettings')
  }

  logout() {
    this.props.setView('login')
  }

  componentDidMount() {
    if(this.props.location === null && this.state.loading === null) this.setState({loading: true});
  }

  componentDidUpdate() {
    // if(this.props.location === null && this.state.loading === null) this.setState({loading: true});
    if(this.props.location !== null && this.state.loading) this.setState({loading: false});
  }

  render() {
  if(this.state.loading) {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
        <div className='w-100 h-100 my-3'></div>
        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
          <div className="w-90 h-50 d-flex flex-column">
            <div className="w-100">
              <h1 className='text-white font-weight-bold title'>Locating
              <span className="ml-2 spinner-border spinner-grow text-white" role="status" style={ {width: '0.1rem', height: '0.1rem'} }></span>
              <span className="spinner-border spinner-grow text-white" role="status" style={ {width: '0.1rem', height: '0.1rem'} }></span>
              <span className="spinner-border spinner-grow text-white" role="status" style={ {width: '0.1rem', height: '0.1rem'} }></span>
              </h1>
            </div>
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-white mt-3" role="status" style={ {width: '5rem', height: '5rem'} }>
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row my-5">
        </div>
        <div className='w-100 h-100 mb-3'></div>
      </div>
    );
  }
  return(
      <div className = 'mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center' >
      <div className='container my-3'>
        <div className='flex-row h-100 mt-4 mb-5 d-flex align-items-start justify-content-around'>
          <div className='d-flex pl-4'></div>
          <div className='d-flex align-items-center'><i className='fas fa-user-alt fa-2x text-pink'></i></div>
          <div className='d-flex' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x hover gray'></i></div>
        </div>
      </div>
      <div className="flex-row my-5 gray">
        <h1 className="title">{this.props.userInfo.userName}</h1>
      </div>
      <div className='w-100 vh-100 mb-3 d-flex align-items-center justify-content-center'>
        <div className="col-md d-flex flex-column align-items-center">
          <div>
            <button type='button' className='stack-button gray btn button-outline shadow m-4 align-items-center' onClick={this.getLocation}>
              <i className='fas fa-map-marker-alt fa-2x'></i>
            </button>
          </div>
          <div>
            <p className='d-flex flex-column m-2 gray font-weight-bold align-items-center'>LOCATION</p>
          </div>
        </div>
        <div className="col-md d-flex flex-column align-items-center">
          <div>
            <button type='button' className='stack-button round-btn gray btn button-outline shadow m-4 align-items-center' onClick={this.swipeToSearch}>
              <i className='fas fa-search fa-2x'></i>
            </button>
          </div>
          <div>
            <p className='d-flex flex-column m-2 gray font-weight-bold align-items-center'>SEARCH</p>
          </div>
        </div>
      </div>

      <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        <button
          type='button'
          className='w-75 btn btn-outline-light button-outline shadow text-pink font-weight-bold'
          onClick={this.logout}>
          LOGOUT
        </button>
      </div>

      </div>
    )

  }

}
