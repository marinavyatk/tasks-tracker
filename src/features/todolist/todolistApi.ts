import { instance } from "common/api";
import { CommonResponse, TodoListItem } from "common/types";

export const todolistApi = {
  fetchTodolists() {
    return instance.get<TodoListItem[]>("todo-lists");
  },
  createTodolist(todoTitle: string) {
    return instance.post<CommonResponse<{ item: TodoListItem }>>("todo-lists", { title: todoTitle });
  },
  deleteTodolist(todoId: string) {
    return instance.delete<CommonResponse>(`todo-lists/${todoId}`);
  },
  changeTodolistTitle(todoId: string, todoTitle: string) {
    return instance.put<CommonResponse<{ item: TodoListItem }>>(`todo-lists/${todoId}`, { title: todoTitle });
  },
  changeTodolistOrder(todoId: string, putAfterItemId: string | null) {
    return instance.put(`todo-lists/${todoId}/reorder`, { putAfterItemId });
  },
};
