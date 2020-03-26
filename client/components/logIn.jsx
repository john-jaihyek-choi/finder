import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [{ id: 12, name: 'Blake' }, { id: 400, name: 'Shrimp' }] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  guestClick(event) {
    event.preventDefault();
    this.props.setView('splash');
    this.props.guestLogIn();
  }

  renderUsers() {
    return this.state.users.map(user => <option value={user.id}>{user.name}</option>);
  }

  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>

        <div className='w-100 h-100 my-3'></div>
        <div className='w-100 h-100 mb-3 d-flex flex-column align-items-center justify-content-start'></div>

        <div className='w-100 h-100 mb-3'>
          <form id='login' onSubmit={this.handleSubmit}>
            <label htmlFor="username">USERNAME</label>
            <select name="username" id="username" form="login">
              {this.renderUsers()}
            </select>
            <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
              <button
                type='submit'
                className='w-75 btn btn-outline-light button-outline font-weight-bold'
                onClick={this.getLocation}>
                LET'S EAT
              </button>
            </div>
          </form>
        </div>

        <div className='w-100 h-100 mb-3'></div>

        <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='w-75 btn btn-outline-light button-outline font-weight-bold'
            onClick={this.guestClick}>
            CONTINUE AS GUEST
          </button>
        </div>

      </div>
    );
  }
}
