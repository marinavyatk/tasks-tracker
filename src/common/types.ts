import { TaskPriorities, TaskStatuses } from "common/enums";

//app
export type ActiveTodo = {
  todoId: string;
  todoTitle: string;
};

export type DataForAuthorization = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

//todos
export type TodoListItem = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TodoListforUI = TodoListItem & { filter: Filter; entityStatus: RequestStatus };
export type Filter = "all" | "active" | "completed";

//tasks
export type Task = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoId: string;
  order: number;
  addedDate: string;
};
export type TasksState = {
  [key: string]: Array<Task>;
};
export type UpdateTaskModel = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type UpdateDomainTaskModel = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type UpdateTaskArg = {
  taskId: string;
  domainModel: UpdateDomainTaskModel;
  todoId: string;
};
//types for API
export type CommonResponse<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[] | null;
};
export type TaskResponse = {
  items: Task[];
  totalCount: number;
  error: string | null;
};
export type UserData = {
  id: number;
  email: string;
  login: string;
};

export type DataForLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};

export type ListsDirection = "row" | "row-reverse" | "column" | "column-reverse";
