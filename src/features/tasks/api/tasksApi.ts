import { instance } from "common/api";
import { CommonResponse, Task, TaskResponse, UpdateTaskModel } from "common/types";

export const tasksApi = {
  fetchTasks(todoId: string) {
    return instance.get<TaskResponse>(`todo-lists/${todoId}/tasks`, { params: { count: 100 } });
  },
  createTask(todoId: string, taskTitle: string) {
    return instance.post<CommonResponse<{ item: Task }>>(`todo-lists/${todoId}/tasks`, { title: taskTitle });
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<CommonResponse>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  changeTask(todoId: string, taskId: string, apiModel: UpdateTaskModel) {
    return instance.put<CommonResponse>(`todo-lists/${todoId}/tasks/${taskId}`, apiModel);
  },
  changeTaskOrder(todoId: string, taskId: string, putAfterItemId: string | null) {
    return instance.put<CommonResponse>(`todo-lists/${todoId}/tasks/${taskId}/reorder`, { putAfterItemId });
  },
};
