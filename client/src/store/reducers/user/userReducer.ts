import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../appTypes";
import { userService } from "./userService";

//user in the localStorage is JSON. Get user and parse it direct in initialState
const user = localStorage.getItem("user");
const parsedUser = user && JSON.parse(user)

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  user: parsedUser || null
};

//register user
export const registerUser = createAsyncThunk(
  "/register",
  async (userData: { username: string; email: string; password: string }) => {
    try {
      const result = await userService.register(userData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  }
);

//login user
export const loginUser = createAsyncThunk(
  "/login",
  async (userData: { email: string; password: string }) => {
    try {
      const result = await userService.login(userData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk("/logout", async () => {
  const user = localStorage.getItem("user");
  if(user){
    return  localStorage.removeItem('user')
  }
  console.log('logout failed')
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = "FETCHING USER DATA";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User fetched successfully";
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = "FETCHING USER DATA";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User fetched successfully";
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User logged out";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});


export const { resetInitialState } = userSlice.actions;
export default userSlice.reducer;
