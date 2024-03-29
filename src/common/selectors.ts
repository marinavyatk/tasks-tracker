import { AppRootStateType } from "app/store";

export const selectTodolists = (state: AppRootStateType) => state.todolists;
export const selectTasks = (state: AppRootStateType) => state.tasks;
export const selectIsAuthorized = (state: AppRootStateType) => state.auth.isAuthorized;
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectAppStatus = (state: AppRootStateType) => state.app.status;
export const selectAppError = (state: AppRootStateType) => state.app.error;
export const selectActiveTodo = (state: AppRootStateType) => state.app.activeTodo;
export const selectUserEmail = (state: AppRootStateType) => state.auth.user;
export const selectListsDirection = (state: AppRootStateType) => state.app.listsDirection;
export const selectSound = (state: AppRootStateType) => state.app.sound;
