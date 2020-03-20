import React from 'react';

export default class CurrentSearch extends React.Component {
  constructor(props) {
    super(props);
    // this.currentQuery = this.currentQuery.bind(this);
  }

  // guestClick(event) {
  //   event.preventDefault();
  //   this.props.setView(' ');

  // }

  render() {
    return (
      <div className="container display-flex">
        <div className="row display-flex justify-content-left">
          <i className="fas fa-arrow-left fa-3x gray mx-3 my-3"></i>
        </div>
        <div className="column w-80 justify-content-flex-start">
          <div className="row justify-content-left">
            <h4 className="pink justify-content-left ml-3">Current Query</h4>
          </div>
          <div className="row justify-content-center">
            <h4 className="search w-99 px-1 py-1 justify-content-center">dummy search type</h4>
          </div>
        </div>
      </div>
    );
  }
}
