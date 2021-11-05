import {
  failure,
  start,
  loginSuccess,
  forgotPasswordSuccess,
  reset,
  resetPasswordSuccess,
  registerSuccess,
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const register = async (dispatch, user) => {
  dispatch(start());
  try {
    const { data: res } = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    console.log(error.response.data.errorMessage);
    dispatch(failure(error.response.data.errorMessage));
    setTimeout(() => dispatch(reset()), 3000);
  }
};

export const login = async (dispatch, user) => {
  dispatch(start());
  try {
    const { data: res } = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(failure(error.response.data.errorMessage));
    setTimeout(() => dispatch(reset()), 3000);
  }
};

export const forgotPassword = async (dispatch, email) => {
  dispatch(start());
  try {
    const { data: res } = await publicRequest.post("/auth/forgotPassword", { email });
    dispatch(forgotPasswordSuccess(res.data));
  } catch (error) {
    dispatch(failure(error.response.data.errorMessage));
    setTimeout(() => dispatch(reset()), 3000);
  }
};

export const resetPassword = async (dispatch, history, resetToken, password) => {
  dispatch(start());
  try {
    await publicRequest.patch(`/auth/resetPassword/${resetToken}`, { password });
    dispatch(resetPasswordSuccess());
    history.push("/login");
  } catch (error) {
    dispatch(failure(error.response.data.errorMessage));
    setTimeout(() => dispatch(reset()), 3000);
  }
};
