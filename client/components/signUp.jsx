import React from 'react';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            validation: true,
            validationMessage: null
        }
        this.inputChange = this.inputChange.bind(this);
        this.submitUserName = this.submitUserName.bind(this);
        this.cancelSignUp = this.cancelSignUp.bind(this);
    }

    signUp(userName) {
        fetch('/api/signUp', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify({ userName: userName })
        })
          .then(result => result.json())
          .then(userInfo => {
            if(userInfo.err) return this.setState({ validationMessage: userInfo.err });
            this.props.userIdentification(userInfo);
            this.props.setView('splash')
          })
          .catch(err => console.error(err))
      }

    submitUserName(event) {
        event.preventDefault()
        this.signUp(this.state.userName)
    }

    cancelSignUp(event) {
        event.preventDefault();
        this.setState({userName: ""})
        this.props.setView('login')
    }

    inputChange(event) {
        this.setState({
            userName: event.target.value
        })
    }

    render() {
        return (
            <div
            className='mx-auto w-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient'>
                <div className='w-100 h-25 my-3'></div>
                <div className='w-100 h-25 mb-3'>
                    <form id="userSignUp" className="d-flex flex-wrap justify-content-center w-100 h-75" onSubmit={this.submitUserName} onReset={this.cancelSignUp}>
                        <label htmlFor="signUpUserName" className="text-white font-weight-bold w-75 mt-4 ml-4">CREATE USERNAME</label>
                        <input id="signUpUserName" type="text" className="w-75 h-50 text-center text-white font-weight-bold text-"
                            onChange={this.inputChange}/>
                    </form>
                    <div className="d-flex flex-wrap justify-content-center w-100 h-75">
                        <h6>{this.state.validationMessage}</h6>
                    </div>
                </div>
                <div className='w-100 h-25 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-end'>
                    <button type="submit" form="userSignUp" className="w-75 h-25 btn btn-outline-light button-outline font-weight-bold">SUBMIT</button>
                    <button type="reset" form="userSignUp" className="w-75 h-25 my-3 btn btn-outline-light button-outline font-weight-bold">CANCEL</button>
                </div>
                <div className="w-100 h-25 mb-3 d-flex flex-wrap align-items-center justify-content-center align-content-start">
                </div>
            </div>
        )
    }
}
