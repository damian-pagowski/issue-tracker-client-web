import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { handleUpdate } from "../actions/userActionsCreator";

class Settings extends Component {
  state = {
    displayName: "",
    defaultProject: "",
    email: "",
    password: "",
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelectChange = selectedOption => {
    this.setState({ defaultProject: selectedOption.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = this.props.user;
    this.props.dispatch(handleUpdate({ ...user, ...this.state }));
    this.props.history.push("/");
  };

  componentDidMount() {
    const { displayName, defaultProject, email, id } = this.props.user;
    this.setState({
      displayName,
      defaultProject,
      email,
      id
    });
  }

  render() {
    const { redirect } = this.props;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    const { availableProjects } = this.props.user;

    const options = availableProjects
      ? availableProjects.map(project => ({
          value: project,
          label: project,
        }))
      : [];

    return (
      <div>
        <p className="h2 ml-3 my-2">Settings</p>

        <form className="issue-form mt-1" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayNameInput">Display name</label>
            <input
              type="text"
              className="form-control"
              id="displayNameInput"
              name="displayName"
              value={this.state.displayName}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="defaultProject">Default Project</label>
            <Select
              value={options.find(
                val => val.value === this.state.defaultProject
              )}
              onChange={this.handleSelectChange}
              options={options}
              name="defaultProject"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email</label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              name="email"
              disabled
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={this.state.password}
              name="password"
              onChange={this.handleOnChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  const redirect = !(user && user.token);
  return {
    redirect,
    user,
  };
}
export default connect(mapStateToProps)(Settings);
