import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./types";

//Login user - Set User token
export const loginUser = userData => ({
  type: LOGIN_USER,
  payload: userData
});

//Logout user
export const logoutUser = () => {
  console.log("logiut");
  return { type: LOGOUT_USER };
};

//Register user
export const registerUser = (userData, history) => ({
  type: REGISTER_USER,
  payload: { userData, history }
});
