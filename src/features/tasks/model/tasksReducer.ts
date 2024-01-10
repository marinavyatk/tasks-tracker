import { createSlice } from "@reduxjs/toolkit";
import { Task, TasksState, UpdateTaskArg, UpdateTaskModel } from "common/types";
import { createAppAsyncThunk } from "common/createAppAsyncThunk";
import { tasksApi } from "features/tasks/api/tasksApi";
import { ResultCode } from "common/enums";
import { todolistThunks } from "features/todolist/model/todolistReducer";

const initialState = {} as TasksState;
const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todoId];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.todoId].unshift(action.payload.task);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskIndex = state[action.payload.todoId].findIndex((task) => task.id === action.payload.taskId);
        if (taskIndex !== -1) {
          state[action.payload.todoId].splice(taskIndex, 1);
        }
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        const taskIndex = state[action.payload.todoId].findIndex((task) => task.id === action.payload.taskId);
        state[action.payload.todoId][taskIndex] = {
          ...state[action.payload.todoId][taskIndex],
          ...action.payload.domainModel,
        };
      });
  },
});
const fetchTasks = createAppAsyncThunk<{ todoId: string; tasks: Task[] }, string>(
  "tasks/fetchTasks",
  async (todoId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await tasksApi.fetchTasks(todoId);
    if (!res.data.error) {
      return { todoId, tasks: res.data.items };
    } else {
      return rejectWithValue(res.data.error);
    }
  },
);

const createTask = createAppAsyncThunk<{ task: Task; todoId: string }, { todoId: string; taskTitle: string }>(
  "tasks/createTask",
  async (arg: { todoId: string; taskTitle: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    const res = await tasksApi.createTask(arg.todoId, arg.taskTitle);
    if (res.data.resultCode === ResultCode.Success) {
      const task = res.data.data.item;
      return { todoId: arg.todoId, task };
    } else {
      return rejectWithValue(res.data.messages?.[0] ?? null);
    }
  },
);

const deleteTask = createAppAsyncThunk(
  "tasks/deleteTask",
  async (arg: { todoId: string; taskId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    const res = await tasksApi.deleteTask(arg.todoId, arg.taskId);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(res.data.messages?.[0] ?? null);
    }
  },
);
const changeTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>("tasks/changeTask", async (arg, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;

  const state = getState();
  const task = state.tasks[arg.todoId].find((task) => task.id === arg.taskId);
  if (!task) {
    return rejectWithValue(null);
  }

  const apiModel: UpdateTaskModel = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    title: task.title,
    status: task.status,
    ...arg.domainModel,
  };

  const res = await tasksApi.changeTask(arg.todoId, arg.taskId, apiModel);
  if (res.data.resultCode === ResultCode.Success) {
    return arg;
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});

const changeTaskOrder = createAppAsyncThunk<
  { todoId: string; taskId: string; putAfterItemId: string | null },
  {
    todoId: string;
    taskId: string;
    putAfterItemId: string | null;
  }
>("tasks/changeTaskOrder", async (arg, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const res = await tasksApi.changeTaskOrder(arg.todoId, arg.taskId, arg.putAfterItemId);
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(fetchTasks(arg.todoId));
    return arg;
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});
export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasks, createTask, deleteTask, changeTask, changeTaskOrder };
