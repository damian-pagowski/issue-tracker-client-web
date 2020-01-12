import { signOut, logIn, update } from "./users";
import api from "../helper/UserAPI";
import {
  handleReceiveIssues,
  handleRetrieveAvailableProjects,
} from "./issueActionsCreator";
import { handleGetSettings } from "./settings";
import { showLoading, hideLoading } from "react-redux-loading";

const USER_ID = "issue_tracker_user";
const API_TOKEN = "issue_tracker_token";
const USER_EMAIL = "issue_tracker_email";

export function handleLogout() {
  return (dispatch, getState) => {
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(API_TOKEN);

    const user = getState().user;
    api
      .logout(user)
      .then(user => dispatch(signOut(user)))
      .catch(error => console.error(error));
  };
}

export function handleUpdate(user) {
  return dispatch => {
    api
      .update(user)
      .then(() => dispatch(update(user)))
      .catch(error => console.error(error));
  };
}

function handleGetUserDetails() {
  return (dispatch, getState) => {
    const user = getState().user;
    console.log('handleGetUserDetails > user' + JSON.stringify(user))
    api
      .getUserDetails(user)
      .then(user => dispatch(update(user)))
      .catch(error => console.error(error));
  };
}
export function handleRegister(user) {
  return dispatch => {
    api
      .register(user)
      .then(() => dispatch(update(user)))
      .catch(error => console.error(error));
  };
}

export function handleLogin(user) {
  return dispatch => {
    dispatch(showLoading());

    api.login(user).then(data => {
      localStorage.setItem(USER_ID, data.id);
      localStorage.setItem(API_TOKEN, data.token);
      localStorage.setItem(USER_EMAIL, data.email);
      dispatch(logIn({ ...user, ...data }));
      dispatch(handleGetUserDetails());
      dispatch(handleRetrieveAvailableProjects());
      dispatch(handleReceiveIssues());
      dispatch(handleGetSettings());
      dispatch(hideLoading());
    });
  };
}

export function handleRestoreSession(user) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(logIn(user));
    dispatch(handleGetUserDetails());
    dispatch(handleRetrieveAvailableProjects());
    dispatch(handleReceiveIssues());
    dispatch(handleGetSettings());
    dispatch(hideLoading());
  };
}
