import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Select User", users: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => this.setState({ users: data }))
      .catch((err) => console.error(err));
  }

  login(userId) {
    fetch(`/api/login/${userId}`)
      .then((res) => res.json())
      .then((data) => this.props.userIdentification(data))
      .catch((err) => console.error(err));
  }

  guestLogin() {
    fetch("/api/guest/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => this.props.userIdentification(data))
      .catch((err) => console.error(err));

    this.props.setView("splash");
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value === "Select User") return;
    this.login(this.state.value);
    this.props.setView("splash");
  }

  handleClick(e) {
    if (e.currentTarget.id === "guest") return this.guestLogin();
    if (e.currentTarget.id === "signup") return this.props.setView("signup");
  }

  renderUsers() {
    return this.state.users.map((user) => (
      <option key={user.userId} value={user.userId}>
        {user.userName}
      </option>
    ));
  }

  render() {
    return (
      <div className="mx-auto vw-100 vh-100 d-flex flex-column text-white align-items-center justify-content-center gradient">
        {/* Title Section */}
        <div className="w-100 h-auto my-3 d-flex align-items-end justify-content-center">
          <h1 className="title text-center">
            Finder<i className="fas fa-utensils text-white mx-2"></i>
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-100 h-auto mb-3 d-flex align-items-center justify-content-center">
          <form
            className="w-75 mx-auto"
            id="login"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="username" className="mb-2 d-block text-center">
              USERNAME
            </label>
            <div className="d-flex justify-content-center">
              <select
                className="form-control button-outline font-weight-bold mb-3"
                name="username"
                id="username"
                form="login"
                value={this.state.value}
                onChange={this.handleChange}
                style={{
                  maxWidth: "300px",
                  width: "100%",
                }}
              >
                <option value="Select User" hidden disabled>
                  Select User
                </option>
                {this.renderUsers()}
              </select>
            </div>
          </form>
        </div>

        {/* Create New Username Section */}
        <div className="w-100 h-auto mb-3 d-flex align-items-center justify-content-center">
          <div
            className="text-white btn text-center"
            id="signup"
            onClick={this.handleClick}
            style={{ textDecoration: "underline" }}
          >
            CREATE NEW USERNAME
          </div>
        </div>

        {/* Buttons Section */}
        <div className="w-100 h-auto mb-3 d-flex flex-column align-items-center justify-content-start">
          <button
            type="submit"
            form="login"
            className="btn btn-outline-light button-outline font-weight-bold mb-3"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            LOG IN
          </button>
          <button
            type="button"
            className="btn btn-outline-light button-outline font-weight-bold"
            id="guest"
            onClick={this.handleClick}
            style={{ maxWidth: "300px", width: "100%" }}
          >
            CONTINUE AS GUEST
          </button>
        </div>
      </div>
    );
  }
}
