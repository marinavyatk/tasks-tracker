import React, { ChangeEvent, useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import EditableSpan from "common/components/editableSpan";
import CancelIcon from "@mui/icons-material/Cancel";
import s from "./task.module.css";
import { useAppDispatch } from "app/store";
import { TaskStatuses } from "common/enums";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import { RequestStatus, Sound } from "common/types";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { selectSound } from "common/selectors";
import { useSelector } from "react-redux";

type TaskProps = {
  todoId: string;
  taskId: string;
  title: string;
  taskStatus: TaskStatuses;
  todoEntityStatus: RequestStatus;
  onDrop: () => void;
  onDragStart: (taskId: string) => void;
};
const Task = (props: TaskProps) => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();
  const sound = useSelector(selectSound);
  const todoStatus = props.todoEntityStatus;
  const disabled = todoStatus === "loading";
  const [play] = useSound(clickSound);

  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };

  const handleChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(
      tasksThunks.changeTask({ todoId: props.todoId, taskId: props.taskId, domainModel: { status: checkedValue } }),
    );
    playSound(sound);
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
    playSound(sound);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!target.contains(relatedTarget)) {
      setHovered(false);
    }
  };

  return (
    <div
      className={s.task}
      draggable={true}
      id={props.taskId}
      onDragStart={() => props.onDragStart(props.taskId)}
      onDrop={() => {
        props.onDrop();
        setHovered(false);
      }}
      onDragOver={handleDragOver}
      onDragEnter={() => setHovered(true)}
      onDragLeave={handleDragLeave}
    >
      <div className={s.boxWithTitle}>
        <Checkbox
          checked={props.taskStatus === TaskStatuses.Completed}
          disabled={disabled}
          onChange={handleChangeTaskStatus}
          sx={{
            color: "#a486fc",
            marginLeft: "-9px",
          }}
        />
        <span className={`${s.taskText} ${hovered ? s.hovered : ""}`} id={"taskText"}>
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
        sx={{
          "&: hover": { backgroundColor: "rgba(187, 134, 252, 0.04)" },
          marginRight: "-9px",
        }}
        disabled={disabled}
      >
        <CancelIcon color={"primary"} className={s.delete} />
      </IconButton>
    </div>
  );
};

export default Task;
