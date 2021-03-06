import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  exchangeCodeForToken,
  handleLogin,
  handleRestoreSession,
} from "../actions/userActionsCreator";
import { Redirect } from "react-router-dom";

const USER_ID = "issue_tracker_user";
const API_TOKEN = "issue_tracker_token";
const USER_EMAIL = "issue_tracker_email";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(handleLogin({ ...this.state }));
    this.setState({
      email: "",
      password: "",
    });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const code = (this.props.location.search.match(/code=([^&]+)/) || [])[1];
    if (code) {
      this.props.dispatch(exchangeCodeForToken(code));
    }

    const token = localStorage.getItem(API_TOKEN);
    const id = localStorage.getItem(USER_ID);
    const email = localStorage.getItem(USER_EMAIL);
    if (token && id && email) {
      this.props.dispatch(handleRestoreSession({ id, token, email }));
    }
  }
  render() {
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="wrap-login">
          <div className="logo-login" />
          <form className="mt-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={this.state.email}
                required
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleOnChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <a
              href={
                "https://github.com/login/oauth/authorize?client_id=7ffbe14966ece454891b"
              }
              className="btn btn-primary ml-1"
            >
              <i className="fa fa-github" />
            </a>
            <span className="float-right">
              <Link to="/register">Create an account</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  const redirect = user && user.token;
  return {
    redirect,
  };
}
export default connect(mapStateToProps)(Login);
