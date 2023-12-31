import axios from "axios";

export const loginCall = async(user, dispatch) => {
  const baseUrl = "https://my-wordbooks.onrender.com/api";

  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
}