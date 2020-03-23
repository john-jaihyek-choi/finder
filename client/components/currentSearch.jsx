import React from 'react';

export default class CurrentSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { food: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.setView = this.setView.bind(this);
    this.currentQuery = '';
  }

  // setView(viewMode) {
  //   this.setState({
  //     view: viewMode
  //   });
  // }

  handleChange(event) {
    this.setState({ food: event.target.value })
  }

  handleClick(event) {
    event.preventDefault();
    this.currentQuery = this.state.food;
    this.setState({ food:''});
    this.props.setView('cardstack');
}

  render() {
    const resCats = ["African", "American", "Arabian", "Armenian", "Baguettes", "Bangladeshi", "Barbeque",
      "Brazilian", "Breakfast", "Brunch", "Burgers", "Cafes", "Cambodian", "Caribbean",
      "Cheesesteaks", "Chicken Shop", "Chicken Wings", "Chilean", "Chinese", "Creperies",
      "Cuban", "Delis", "Dinner Theater", "Ethiopian", "Filipino", "Fish & Chips", "Fondue",
      "French", "Gastropubs", "German", "Greek", "Guamanian", "Halal", "Hawaiian", "Hot Dogs",
      "Hungarian", "Indian", "Indonesian", "Irish", "Israeli", "Italian", "Japanese", "Korean",
      "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Mongolian", "Moroccan", "Noodles",
      "Pakistani", "Persian", "Pizza", "Polish", "Polynesian", "Portuguese", "Salad", "Sandwiches",
      "Soup", "Spanish", "Steakhouses", "Sushi Bars", "Tex-Mex", "Thai", "Vegan", "Vietnamese",
      "Waffles", "Wraps"];

    let randomRest = [];
    function shuffle(resCats) {
      var i = 0;
      var j = 0;
      var temp = null;
      for (i = resCats.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = resCats[i];
        resCats[i] = resCats[j];
        resCats[j] = temp;
      }
    }
    shuffle(resCats);
    for (var i = 0; i < 7; i++) {
      randomRest += ' ' + resCats[i];
    }

    return (
      <div className="container column display-flex">
        <div className="column w-90 my-3 display-flex">
          <div className="display-flex justify-content-left">
            <i className="fas fa-arrow-left fa-3x gray"></i>
          </div>
          <div className="my-5">
            <div className="justify-content-left">
              <h4 className="pink justify-content-left ml-3">Current Query</h4>
            </div>
            <div className="justify-content-center">
              <h4 className="query w-95 px-1 py-2 justify-content-center">{this.currentQuery}</h4>
            </div>
            </div>
          <div className="wrapper justify-content-center mt-5">
            <i className="mag-glass fas fa-search fa-2x gray"></i>
            <input className="search shadow w-100 px-1 py-2 justify-content-left" placeholder="Search"
              value={this.state.food} onChange={this.handleChange}></input>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button type="text" form="userSignUp" className="form-control shadow d-flex submit btn font-weight-bold"
              onClick={this.handleClick}>SUBMIT</button>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <h5>Or try one of our suggestions below:</h5>
          </div>
          <div className="col-6 display-flex">
            <ul className="foodCategory pink">
              <li className="categoryList justify-content-left" onClick={this.handleClick}>{randomRest}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
