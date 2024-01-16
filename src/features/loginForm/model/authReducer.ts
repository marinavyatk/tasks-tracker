import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/createAppAsyncThunk";
import AuthApi from "features/loginForm/api/authApi";
import { ResultCode } from "common/enums";
import { DataForLogin, UserData } from "common/types";

const initialState = {
  isAuthorized: false,
  user: "",
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserEmail(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
        state.user = action.payload.userData.login;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
        state.user = "";
      })
      .addMatcher(isPending(authThunks.me), (state) => {
        state.isAuthorized = true;
      })
      .addMatcher(isFulfilled(authThunks.me), (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.userData.email;
      })
      .addMatcher(isRejected(authThunks.me), (state) => {
        state.isAuthorized = false;
      });
  },
});
const me = createAppAsyncThunk<{ isAuthorized: boolean; userData: UserData }, undefined>(
  "auth/me",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await AuthApi.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isAuthorized: true, userData: res.data.data };
    } else {
      return rejectWithValue("notShow"); // it is necessary so that the error is not shown on the login page when the user is not registered
    }
  },
);

const login = createAppAsyncThunk<{ isAuthorized: boolean }, DataForLogin>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await AuthApi.logIn(arg);
  dispatch(me());
  if (res.data.resultCode === ResultCode.Success) {
    return { isAuthorized: true };
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});

const logout = createAppAsyncThunk<{ isAuthorized: boolean }, undefined>("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  const res = await AuthApi.logOut();
  if (res.data.resultCode === ResultCode.Success) {
    return { isAuthorized: false };
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { me, login, logout };
