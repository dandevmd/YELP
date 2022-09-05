import axios from "axios";
import { User } from "../../../appTypes";

export const API_URL = "http://localhost:3001/api/user";

//register user
const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const result = await axios.post(API_URL + "/register", userData);
  // if(registerUser.data){
  //   localStorage.setItem('user', JSON.stringify(registerUser.data))
  // }
  return result.data;
};

//login user
const login = async (userData: { email: string; password: string }) => {
  const loggingUser = await axios.post(API_URL + "/login", userData);
  if (loggingUser.data) {
    localStorage.setItem("user", JSON.stringify(loggingUser.data));
  }
  return loggingUser.data;
};

//logout user
const logout = () => {
  return localStorage.removeItem("user");
};


export const userService = {
  register,
  login,
  logout,
};
