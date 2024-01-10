import { useSelector } from "react-redux";
import { AppRootStateType } from "app/store";

export const selectTodolists = (state: AppRootStateType) => state.todolists;
export const selectTasks = (state: AppRootStateType) => state.tasks;
export const selectIsAuthorized = (state: AppRootStateType) => state.auth.isAuthorized;
// export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectAppStatus = (state: AppRootStateType) => state.app.status;
export const selectTodolistStatus = (state: AppRootStateType, todoId: string) =>
  state.todolists.find((tl) => tl.id === todoId)?.entityStatus;
export const selectAppError = (state: AppRootStateType) => state.app.error;
export const selectActiveTodo = (state: AppRootStateType) => state.app.activeTodo;
