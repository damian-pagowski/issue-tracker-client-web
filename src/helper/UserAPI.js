const BASE_URL = process.env.REACT_APP_API_URL;

const api = {
  register(user) {
    return fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(response => response.json());
  },
  login(user) {
    return fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(response => response.json());
  },

  logout(user) {
    return fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ email: user.email }),
    }).then(response => response.json());
  },
  update(user) {
    return fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultProject: user.defaultProject,
        displayName: user.displayName,
        password: user.password,
      }),
    }).then(response => response.json());
  },

  getUserDetails(user) {
    return fetch(`${BASE_URL}/users/${user.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(response => response.json());
  },
};

export default api;
