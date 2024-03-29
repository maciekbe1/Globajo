import * as API from "api/API";

export const signInService = (email, password) => {
  return API.request(`/api/auth`, {
    email,
    password
  });
};

export const getMeService = () => {
  return API.request(`/api/users/me`, null, "get");
};

export const signUpService = (name, password, email) => {
  return API.request(`/api/users/signUp`, {
    name,
    password,
    email
  });
};

export const verifyService = (hash) => {
  return API.request(`/api/users/verify/${hash}`);
};
