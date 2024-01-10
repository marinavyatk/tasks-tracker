import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/createAppAsyncThunk";
import AuthApi from "features/loginForm/api/authApi";
import { ResultCode } from "common/enums";
import { DataForLogin } from "common/types";

const initialState = {
  isAuthorized: false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
      })
      .addMatcher(isPending(authThunks.me), (state) => {
        state.isAuthorized = true;
      })
      .addMatcher(isFulfilled(authThunks.me), (state) => {
        state.isAuthorized = true;
      })
      .addMatcher(isRejected(authThunks.me), (state) => {
        state.isAuthorized = false;
      });
  },
});
const me = createAppAsyncThunk<{ isAuthorized: boolean }, undefined>("auth/me", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await AuthApi.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isAuthorized: true };
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});

const login = createAppAsyncThunk<{ isAuthorized: boolean }, DataForLogin>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await AuthApi.logIn(arg);
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
export const authThunks = { me, login, logout };
