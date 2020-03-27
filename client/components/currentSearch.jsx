import React from 'react';

export default class CurrentSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: '',
      catList: [],
      currentQuery: this.props.currentQuery,
      // loading: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categories = this.categories.bind(this);
    this.list = [];
    this.shuffle = this.shuffle.bind(this);
  }

  handleChange(event) {
    this.setState({ food: event.target.value })
  }

  handleClick(event) {
    if (event.target.id === 'submit') {
      if (!this.state.food) return;
      this.props.searchQuery(this.state.food);
      return this.props.setView('cardstack');
    }
    if (event.target.id === 'cardstack' && !this.state.currentQuery) return;
    if (event.target.id === 'cardstack' && this.state.currentQuery) return this.props.setView('cardstack');
    if (event.target.id === 'profile') return this.props.setView('profile');
    this.props.searchQuery(event.target.getAttribute('data-cat'));
    this.props.setView('cardstack');
  }

  shuffle(array){
      var i = 0;
      var j = 0;
      var temp = null;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
      array[i] = array[j];
        array[j] = temp;
      }
      return array;
  }

   categories() {
     const resCats = ["African", "American", "Arabian", "Armenian", "Baguettes", "Bangladeshi", "Barbeque",
       "Brazilian", "Breakfast", "Brunch", "Burgers", "Cafes ", "Cambodian", "Caribbean",
       "Cheesesteaks", "Chicken Shop", "Chicken Wings", "Chilean", "Chinese", "Creperies",
       "Cuban ", "Delis ", "Dinner Theater", "Ethiopian", "Filipino", "Fish & Chips", "Fondue",
       "French", "Gastropubs", "German", "Greek", "Guamanian", "Halal", "Hawaiian", "Hot Dogs",
       "Hungarian", "Indian", "Indonesian", "Irish", "Israeli", "Italian", "Japanese", "Korean",
       "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Mongolian", "Moroccan", "Noodles",
       "Pakistani", "Persian", "Pizza", "Polish", "Polynesian", "Portuguese", "Salad", "Sandwiches",
       "Soup", "Spanish", "Steakhouses", "Sushi Bars", "Tex-Mex", "Thai", "Vegan", "Vietnamese",
       "Waffles", "Wraps"];

     this.shuffle(resCats);

     const list = resCats.slice(0, 7);
     this.setState({
       catList: list
     })
   }

   componentDidMount(){
     this.categories();
   }

  render() {
    const listItems = (this.state.catList.map((restaurant) =>
      <li onClick={this.handleClick} className="hover underline" key={restaurant} data-cat={restaurant}>{restaurant}</li>
    ));
      return (
        <div className="container column display-flex">
          <div className="column w-90 my-5 display-flex">
            <div className="display-flex justify-content-left">
              <i className="fas fa-arrow-left fa-2x gray ml-4 hover" id="profile" onClick={this.handleClick}></i>
            </div>
            <div className="my-5">
              <div className="justify-content-left">
                <h4 className="text-pink justify-content-left ml-3">Current Query</h4>
              </div>
              <div className="justify-content-center">
                <h4 className="query w-95 px-1 py-2 justify-content-center">{this.state.currentQuery}</h4>
              </div>
              </div>
            <div className="wrapper justify-content-center mt-5">
              <i className="mag-glass fas fa-search fa-2x gray"></i>
              <input className="search text-secondary shadow w-100 px-1 py-2 justify-content-left" placeholder="Search"
                value={this.state.food} onChange={this.handleChange}></input>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button type="text" form="userSignUp" className="w-25 mt-2 btn submit font-weight-bold"
                id="submit" onClick={this.handleClick}>SUBMIT</button>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <h5 className="text-secondary">Or try one of our suggestions below:</h5>
            </div>
            <div className="d-flex justify-content-flex-start">
              <div className="ml-3">
                <ul className="foodCategory text-pink pl-0 mt-1">
                  <div className="categoryList text-left">{listItems}</div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
