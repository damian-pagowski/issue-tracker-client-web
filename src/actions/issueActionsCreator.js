import { addIssue, receiveIssues, updateIssue, deleteIssue } from "./issues";
import { showLoading, hideLoading } from "react-redux-loading";
import { update } from "./users";
import api from "../helper/IssuesAPI";

export function handleAddIssue(issue) {
  return (dispatch, getState) => {
    api
      .createIssue(issue, getState().user.token)
      .then(data => dispatch(addIssue(data)))
      .catch(error => console.error(JSON.stringify(error)));
  };
}
export function handleUpdateIssue(issue) {
  return (dispatch, getState) => {
    api
      .updateIssue(issue, getState().user.token)
      .then(() => dispatch(updateIssue(issue)))
      .catch(error => console.error(JSON.stringify(error)));
  };
}
export function handleDeleteIssue(issue) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    api
      .deleteIssue(issue, getState().user.token)
      .then(() => {
        dispatch(deleteIssue(issue));
      })
      .catch(error => console.error(JSON.stringify(error)));
  };
}
export function handleRetrieveAvailableProjects() {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const user = getState().user;
    api
      .getProjects(user.token)
      .then(projects => {
        user.availableProjects = projects;
        dispatch(update(user));
        dispatch(hideLoading());
      })
      .catch(error => console.error(error));
  };
}

export function handleReceiveIssues(page, limit, search) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const user = getState().user;
    console.log("receiving issues: " + JSON.stringify(user));
    if (!(user && user.token && user.defaultProject)) {
      console.log("receiving issues: " + JSON.stringify(user));

      throw new Error(user);
    }
    api
      .getIssues(user.defaultProject, user.token, {
        page,
        limit,
        ...search,
      })
      .then(data => {
        dispatch(receiveIssues(data));
        dispatch(hideLoading());
      })
      .catch(error => console.error(JSON.stringify(error)));
  };
}
