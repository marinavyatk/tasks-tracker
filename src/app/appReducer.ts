import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { ListsDirection, RequestStatus, Sound } from "common/types";
import { authThunks } from "features/loginForm/model/authReducer";

const initialState = {
  isInitialized: false,
  status: "idle" as RequestStatus,
  error: null as string | null,
  activeTodo: "All",
  listsDirection: "column" as ListsDirection,
  sound: "on" as Sound,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setActiveTodo: (state, action: PayloadAction<{ todoId: string }>) => {
      state.activeTodo = action.payload.todoId;
    },
    setListsDirection: (state, action: PayloadAction<{ direction: ListsDirection }>) => {
      state.listsDirection = action.payload.direction;
    },
    setSound: (state, action: PayloadAction<{ sound: Sound }>) => {
      state.sound = action.payload.sound;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed";
      })

      .addMatcher(isFulfilled(authThunks.me), (state) => {
        state.isInitialized = true;
      })
      .addMatcher(isRejected(authThunks.me), (state) => {
        state.isInitialized = true;
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        if (typeof action.payload === "string") {
          state.error = action.payload ? action.payload : null;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
