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
      console.log("error for addform");
      console.log(action.payload.error);
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
      .addMatcher(isPending, (state, action: AnyAction) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state, action: AnyAction) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
      })

      .addMatcher(isFulfilled(authThunks.me), (state, action: AnyAction) => {
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

//типы ошибок:
// 1. ошибка ответа отсервера:
//     code: "ERR_BAD_REQUEST"
// config:{transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// message : "Request failed with status code 404"
// name:"AxiosError"
// request:XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// response:
// {data: '<!DOCTYPE html>\n    <html>\n    <head>\n        <met…ex.Metrika counter -->\r\n\n    </body>\n\n</html>\n\n\n\n', status: 404, statusText: '', headers: AxiosHeaders, config: {…}, …}
// stack
//     :
//     "AxiosError: Request failed with status code 404\n    at settle (http://localhost:3000/static/js/bundle.js:91889:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:90571:66)"
//         [[Prototype]]
// :
// Error
//
// то есть ошибка сидит в свойстве message  ответа

// 2. Если нет интернет-соединения
// code
//     :
//     "ERR_NETWORK"
// config
//     :
// {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// message
//     :
//     "Network Error"
// name
//     :
//     "AxiosError"
// request
//     :
//     XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// stack
//     :
//     "AxiosError: Network Error\n    at XMLHttpRequest.handleError (http://localhost:3000/static/js/bundle.js:90656:14)"
// То  есть название ошибки в свойстве message

// 3. C Resul code:
// config
//     :
// {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
//     :
//     data
//         :
//     {}
// fieldsErrors
//     :
//     [{…}]
// messages
//     :
//     Array(1)
// 0
// :
// "Incorrect anti-bot symbols"
// length
//     :
//     1
//         [[Prototype]]
// :
// Array(0)
// resultCode
//     :
//     10
//         [[Prototype]]
// :
// Object
// headers
//     :
//     AxiosHeaders {cache-control: 'private', content-length: '143', content-type: 'application/json; charset=utf-8'}
// request
//     :
//     XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// status
//     :
//     200
// statusText
//     :
//     ""
//
// То есть data.messages[0]
