import { configureStore } from "@reduxjs/toolkit";
import { todolistReducer } from "features/todolist/model/todolistReducer";
import { tasksReducer } from "features/tasks/model/tasksReducer";
import { useDispatch } from "react-redux";
import { authReducer } from "features/loginForm/model/authReducer";
import { appReducer } from "app/appReducer";

export const store = configureStore({
  reducer: {
    todolists: todolistReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer,
  },
});
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
