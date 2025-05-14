import api from "../../utils/api";
import { loginError, loginStarted, loginSuccess, logout } from "../userSlice";

export const loginUser = async (
  credential,
  dispatch,
  navigate,
  onHide,
  setError
) => {
  dispatch(loginStarted());
  try {
    const { data } = await api.post("/login", credential);
    dispatch(loginSuccess(data));

    localStorage.setItem("currentUser", data);
    onHide();

    setError([]);
    if (data.user.role === "admin") {
      navigate("/dashboard");
    }
  } catch (error) {
    setError(error?.response?.data?.message.split(","));
    dispatch(loginError(error?.response?.data?.message.split(",")));
  }
};
export const userRegister = async (
  credential,
  dispatch,
  navigate,
  onHide,
  setError
) => {
  try {
    dispatch(loginStarted());

    const { data } = await api.post("/register", credential);
    loginUser(
      { email: credential.email, password: credential.password },
      dispatch,
      navigate
    );
    setError([]);
    onHide();
  } catch (error) {
    dispatch(loginError(error?.response?.data?.message));
    setError(error?.response?.data?.message);
  }
};
export const userLogout = async (dispatch, navigate) => {
  try {
    const { data } = await api.get("/logout");
    dispatch(logout());
  } catch (error) {
    //console.log(error.response.data.message);
  }
};
