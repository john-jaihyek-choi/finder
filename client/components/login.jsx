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
        <div className="w-100 h-25 my-3 d-flex align-items-end justify-content-center">
          <h1 className="title">
            finder<i className="fas fa-utensils text-white mx-2"></i>
          </h1>
        </div>

        <div className="w-100 h-25 mb-3 d-flex align-items-end ">
          <form
            className="w-75 mx-auto"
            id="login"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="username">USERNAME</label>
            <div>
              <select
                className="w-100 btn btn-outline-light button-outline font-weight-bold"
                name="username"
                id="username"
                form="login"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <option value="Select User" hidden disabled>
                  Select User
                </option>
                {this.renderUsers()}
              </select>
            </div>
          </form>
        </div>

        <div className="w-100 h-25 mb-3 d-flex align-items-end justify-content-center">
          <div
            className="text-white btn"
            id="signup"
            onClick={this.handleClick}
            style={{ textDecoration: "underline" }}
          >
            CREATE NEW USERNAME
          </div>
        </div>

        <div className="w-100 h-25 mb-3 d-flex flex-column align-items-center justify-content-start">
          <button
            type="submit"
            form="login"
            className="w-75 mb-4 btn btn-outline-light button-outline font-weight-bold"
          >
            LOG IN
          </button>
          <button
            type="button"
            className="w-75 btn btn-outline-light button-outline font-weight-bold"
            id="guest"
            onClick={this.handleClick}
          >
            CONTINUE AS GUEST
          </button>
        </div>
      </div>
    );
  }
}
