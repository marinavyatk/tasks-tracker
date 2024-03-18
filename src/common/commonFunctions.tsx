export const handleChangeDraggable = (taskId: string | undefined, isDraggable: "true" | "false") => {
  const draggableTask = taskId && document.getElementById(taskId);
  if (draggableTask) {
    draggableTask.setAttribute("draggable", isDraggable);
  }
};
