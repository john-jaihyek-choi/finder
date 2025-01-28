import React from "react";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      validation: true,
      validationMessage: null,
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitUserName = this.submitUserName.bind(this);
    this.cancelSignUp = this.cancelSignUp.bind(this);
  }

  signUp(userName) {
    fetch("/api/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: userName }),
    })
      .then((result) => result.json())
      .then((userInfo) => {
        if (userInfo.err)
          return this.setState({ validationMessage: userInfo.err });
        this.props.userIdentification(userInfo);
        this.props.setView("splash");
      })
      .catch((err) => console.error(err));
  }

  submitUserName(event) {
    event.preventDefault();
    this.signUp(this.state.userName);
  }

  cancelSignUp(event) {
    event.preventDefault();
    this.setState({ userName: "" });
    this.props.setView("login");
  }

  inputChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  render() {
    return (
      <div className="mx-auto w-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient">
        {/* Form Section */}
        <div className="w-100 h-auto mb-3 d-flex flex-column align-items-center justify-content-center">
          <form
            id="userSignUp"
            className="d-flex flex-column align-items-center"
            onSubmit={this.submitUserName}
            onReset={this.cancelSignUp}
          >
            {/* Label and Input Group */}
            <div
              className="d-flex flex-column align-items-start mb-4"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <label
                htmlFor="signUpUserName"
                className="text-white font-weight-bold mb-1"
              >
                CREATE USERNAME
              </label>
              <input
                id="signUpUserName"
                type="text"
                className="text-center font-weight-bold text-white"
                onChange={this.inputChange}
                style={{
                  maxWidth: "100%",
                  minWidth: "300px",
                  width: "100%",
                  height: "50px",
                  border: "2px solid white",
                  borderRadius: "25px",
                  backgroundColor: "transparent",
                  color: "white",
                  outline: "none",
                  padding: "0 15px",
                }}
              />
            </div>
          </form>
        </div>

        {/* Buttons Section */}
        <div className="w-100 h-auto mb-3 d-flex flex-column align-items-center justify-content-center">
          <button
            type="submit"
            form="userSignUp"
            className="btn btn-outline-light button-outline font-weight-bold mb-3"
            style={{
              maxWidth: "300px",
              width: "100%",
              borderRadius: "25px",
              height: "50px",
            }}
          >
            SUBMIT
          </button>
          <button
            type="reset"
            form="userSignUp"
            className="btn btn-outline-light button-outline font-weight-bold"
            style={{
              maxWidth: "300px",
              width: "100%",
              borderRadius: "25px",
              height: "50px",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  }
}
