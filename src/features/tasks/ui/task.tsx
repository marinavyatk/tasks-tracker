import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@mui/material";
import EditableSpan from "common/components/editableSpan";
import CancelIcon from "@mui/icons-material/Cancel";
import s from "./task.module.css";
import { useAppDispatch } from "app/store";
import { TaskStatuses } from "common/enums";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import { RequestStatus } from "common/types";

type TaskProps = {
  todoId: string;
  taskId: string;
  title: string;
  taskStatus: TaskStatuses;
  todoEntityStatus: RequestStatus;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (taskId: string) => void;
};
const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const todoStatus = props.todoEntityStatus;
  const disabled = todoStatus === "loading";

  const handleChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(
      tasksThunks.changeTask({ todoId: props.todoId, taskId: props.taskId, domainModel: { status: checkedValue } }),
    );
  };

  const handleChangeTaskTitle = (newTaskTitle: string) => {
    dispatch(
      tasksThunks.changeTask({
        todoId: props.todoId,
        taskId: props.taskId,
        domainModel: { title: newTaskTitle },
      }),
    );
  };

  const handleRemoveTask = () => {
    dispatch(tasksThunks.deleteTask({ todoId: props.todoId, taskId: props.taskId }));
  };

  return (
    <div
      className={s.task}
      draggable={true}
      id={props.taskId}
      onDragStart={() => props.onDragStart(props.taskId)}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      <div className={s.boxWithTitle}>
        <Checkbox
          checked={props.taskStatus === TaskStatuses.Completed}
          disabled={disabled}
          onChange={handleChangeTaskStatus}
          sx={{
            color: "#bb86fc",
            padding: "9px 9px 9px 0",
          }}
        />
        <span className={s.taskText}>
          {
            <EditableSpan
              content={props.title}
              changeTitle={handleChangeTaskTitle}
              removeTask={handleRemoveTask}
              todoId={props.todoId}
              taskId={props.taskId}
            />
          }
        </span>
      </div>
      <IconButton
        onClick={handleRemoveTask}
        sx={{ "&: hover": { backgroundColor: "rgba(187, 134, 252, 0.04)" }, padding: "9px 0 9px 9px" }}
        disabled={disabled}
      >
        <CancelIcon color={"primary"} className={s.delete} />
      </IconButton>
    </div>
  );
};

export default Task;
