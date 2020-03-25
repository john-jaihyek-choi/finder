import React from 'react';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export default class SetLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      radius: [],
      currentQuery: this.props.currentQuery
    };
  }

  // const slider = () => {

  //   const [value, setValue] = useState(0);

  //   return (
  //     <RangeSlider
  //       value={value}
  //       onChange={changeEvent => setValue(changeEvent.target.value)}
  //     />
  //   );

  // };

  render() {
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
      </div>
    )
  }
}
