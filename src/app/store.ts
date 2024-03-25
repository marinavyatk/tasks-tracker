import { configureStore } from "@reduxjs/toolkit";
import { todolistReducer } from "features/todolist/todolistReducer";
import { tasksReducer } from "features/tasks/tasksReducer";
import { useDispatch } from "react-redux";
import { authReducer } from "features/loginForm/authReducer";
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
