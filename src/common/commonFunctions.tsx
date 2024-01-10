export const handleChangeDraggable = (todoId: string, taskId: string | undefined, isDraggable: "true" | "false") => {
  const draggableTodo = document.getElementById(todoId);
  const draggableTask = taskId && document.getElementById(taskId);
  if (draggableTodo) {
    draggableTodo.setAttribute("draggable", isDraggable);
  }
  if (draggableTask) {
    draggableTask.setAttribute("draggable", isDraggable);
  }
};
