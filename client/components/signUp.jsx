// import React from 'react';

// export default class SignUp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userName: ""
//         }
//         this.inputChange = this.inputChange.bind(this);
//         this.submitUserName = this.submitUserName.bind(this);
//         this.cancelSignUp = this.cancelSignUp.bind(this);
//     }

//     submitUserName(event) {
//         event.preventDefault()
//         this.props.registerUser(this.state)
//         this.props.setView('splash')
//     }

//     cancelSignUp(event) {
//         event.preventDefault();
//         this.props.setView('login')
//     }

//     inputChange(event) {
//         this.setState({
//             userName: event.target.value
//         })
//     }

//     render() {
//         return (
//         <>
//             <div className='w-100 h-100 my-3'></div>
//             <div className='w-100 h-100 mb-3'>
//                 <form id="userSignUp" className="d-flex flex-wrap justify-content-center w-100 h-75" onSubmit={this.submitUserName} onReset={this.cancelSignUp}>
//                     <label htmlFor="signUpUserName" className="text-white font-weight-bold w-75 mt-4 ml-4">CREATE USERNAME</label>
//                     <input id="signUpUserName" type="text" className="w-75 h-50 text-center text-white font-weight-bold text-"
//                         onChange={this.inputChange}/>
//                 </form>
//                 <div className="d-flex flex-wrap justify-content-center w-100 h-75">
//                     {/* <h6>The user name already exists</h6> */}
//                     {/* <h6>Please enter a valid username</h6> */}
//                 </div>
//             </div>
//             <div className='w-100 h-100 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-end'>
//                 <button type="submit" form="userSignUp" className="w-75 py-3 btn btn-outline-light button-outline font-weight-bold">SUBMIT</button>
//             </div>
//             <div className="w-100 h-100 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-start">
//                 <button type="reset" form="userSignUp" className="w-75 py-3 my-3 btn btn-outline-light button-outline font-weight-bold">CANCEL</button>
//             </div>
//         </>
//         )
//     }
// }
