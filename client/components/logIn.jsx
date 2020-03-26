import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [{ id: 12, name: 'Blake' }, { id: 400, name: 'Shrimp' }] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.guestClick = this.guestClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
  }

  handleClick(e) {
    if (e.currentTarget.id === 'guest') return this.guestClick();
    if (e.currentTarget.id === 'signup') return console.log('signup');
  }

  guestClick() {
    this.props.setView('splash');
    this.props.guestLogIn();
  }

  renderUsers() {
    return this.state.users.map(user => <option value={user.id}>{user.name}</option>);
  }

  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>

        <div className='w-100 h-100 my-3 d-flex align-items-end justify-content-center'>
          <h1 className="title">finder<i className="fas fa-utensils text-white mx-2"></i></h1>
        </div>

        <div className='w-100 h-100 mb-3 d-flex align-items-end '>
          <form className='w-75 mx-auto' id='login' onSubmit={this.handleSubmit}>
            <label htmlFor="username">USERNAME</label>
            <div>
              <select className='w-100 btn btn-outline-light button-outline font-weight-bold' name="username" id="username" form="login">
                {this.renderUsers()}
              </select>
            </div>
          </form>
        </div>

        <div className='w-100 h-100 mb-3 d-flex align-items-end justify-content-center'>
          <div className='text-white btn' id='signup' onClick={this.handleClick} style={{ textDecoration: 'underline' }}>CREATE NEW USERNAME</div>
        </div>

        <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'>
          <button
            type='submit'
            form='login'
            className='w-75 mb-4 btn btn-outline-light button-outline font-weight-bold'>
            LOG IN
          </button>
          <button
            type='button'
            className='w-75 btn btn-outline-light button-outline font-weight-bold'
            id='guest'
            onClick={this.handleClick}>
            CONTINUE AS GUEST
          </button>
        </div>

      </div>
    );
  }
}
