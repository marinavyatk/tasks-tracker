import { createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { Filter, RequestStatus, TodoListforUI, TodoListItem } from "common/types";
import { todolistApi } from "features/todolist/api/todolistApi";
import { createAppAsyncThunk } from "common/createAppAsyncThunk";
import { ResultCode } from "common/enums";
import { tasksThunks } from "features/tasks/model/tasksReducer";

const initialState = [] as TodoListforUI[];
const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<{ todoId: string; filter: Filter }>) {
      const todoIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
      state[todoIndex].filter = action.payload.filter;
    },
    changeEntityStatus(state, action: PayloadAction<{ todoId: string; entityStatus: RequestStatus }>) {
      const todoIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
      state[todoIndex].entityStatus = action.payload.entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload?.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        const newTodolist = { ...action.payload?.todolist, filter: "all", entityStatus: "idle" } as TodoListforUI;
        state.unshift(newTodolist);
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const todoIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
        if (todoIndex >= 0) {
          state.splice(todoIndex, 1);
        }
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todoIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
        state[todoIndex].title = action.payload.newTodoTitle;
      });
  },
});
const fetchTodolists = createAppAsyncThunk<{ todolists: TodoListItem[] }, void>(
  "todolists/fetchTodolists",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const res = await todolistApi.fetchTodolists();
    res.data.forEach((el) => dispatch(tasksThunks.fetchTasks(el.id)));
    return { todolists: res.data };
  },
);
const createTodolist = createAppAsyncThunk("todolists/createTodolist", async (todoTitle: string, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await todolistApi.createTodolist(todoTitle);
  if (res.data.resultCode === ResultCode.Success) {
    return { todolist: res.data.data.item };
  } else {
    return rejectWithValue(res.data.messages?.[0] ?? null);
  }
});
const deleteTodolist = createAppAsyncThunk<{ todoId: string }, string>(
  "todolists/deleteTodolist",
  async (todoId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todolistActions.changeEntityStatus({ todoId, entityStatus: "loading" }));
    const res = await todolistApi.deleteTodolist(todoId).finally(() => {
      dispatch(todolistActions.changeEntityStatus({ todoId, entityStatus: "idle" }));
    });
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(todolistActions.changeEntityStatus({ todoId, entityStatus: "succeeded" }));
      return { todoId };
    } else {
      return rejectWithValue(res.data.messages?.[0] ?? null);
    }
  },
);
const changeTodolistTitle = createAppAsyncThunk(
  "todolists/changeTodolistTitle",
  async (arg: { todoId: string; newTodoTitle: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todolistActions.changeEntityStatus({ todoId: arg.todoId, entityStatus: "loading" }));
    const res = await todolistApi.changeTodolistTitle(arg.todoId, arg.newTodoTitle).finally(() => {
      dispatch(todolistActions.changeEntityStatus({ todoId: arg.todoId, entityStatus: "idle" }));
    });
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      dispatch(todolistActions.changeEntityStatus({ todoId: arg.todoId, entityStatus: "failed" }));
      return rejectWithValue(res.data.messages?.[0] ?? null);
    }
  },
);
const changeTodolistOrder = createAppAsyncThunk<undefined, { todoId: string; putAfterItemId: string | null }>(
  "todolists/changeTodolistOrder",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await todolistApi.changeTodolistOrder(arg.todoId, arg.putAfterItemId);
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(fetchTodolists());
    } else {
      return rejectWithValue(res.data.messages?.[0] ?? null);
    }
  },
);
export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = {
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistTitle,
  changeTodolistOrder,
};
