import { loginStart, loginFailure, loginSuccess } from "./userRedux";
import { userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const response = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
