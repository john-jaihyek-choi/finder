import React from 'react';

export default class SetLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      value: 0
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className="my-2">
          <div className="justify-content-left">
            <h4 className="text-pink ml-3">Location (Zip Code)</h4>
          </div>
          <div className="wrapper d-flex mt-3">
            <i className="mag-glass2 fas fa-search fa-2x gray mt-2"></i>
            <input className="search text-secondary shadow w-130 px-1 py-2 justify-content-left" placeholder="Search"
              value={this.state.food} onChange={this.handleChange}></input>
            <i className="fas fa-map-marker-alt fa-3x pink ml-3 mb-2"></i>
          </div>
        </div>
        <div className="mt-5 pink">
          <h4>Distance Radius(mi.)</h4>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <label className="d-flex align-items-center">
            <input
              id="typeinp"
              type="range"
              min="0" max="24"
              value={this.state.value}
              onChange={this.handleChange}
              step="1"
              className="mr-3" />
            <div className="miles pink">
              {this.state.value}
            </div>
          </label>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button type="text" form="userSignUp" className="w-125 mt-2 mx-3 btn submit font-weight-bold"
            id="cancel" onClick={this.handleClick}>CANCEL</button>
          <button type="text" form="userSignUp" className="w-125 mt-2 mx-3 btn submit font-weight-bold"
            id="submit" onClick={this.handleClick}>SUBMIT</button>
        </div>
      </div>
    )
  }
}
