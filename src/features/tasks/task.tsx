import React, { ChangeEvent, useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import EditableSpan from "common/components/editableSpan";
import CancelIcon from "@mui/icons-material/Cancel";
import s from "features/tasks/task.module.css";
import { useAppDispatch } from "app/store";
import { TaskStatuses } from "common/enums";
import { tasksThunks } from "features/tasks/tasksReducer";
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
  const [play] = useSound(clickSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  const disabled = props.todoEntityStatus === "loading";
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
  const handleDragStart = () => {
    props.onDragStart(props.taskId);
  };
  const handleDrop = () => {
    props.onDrop();
    setHovered(false);
  };
  const handleDragEnter = () => {
    setHovered(true);
  };

  return (
    <div
      className={s.task}
      draggable={true}
      id={props.taskId}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className={s.boxWithTitle}>
        <Checkbox
          checked={props.taskStatus === TaskStatuses.Completed}
          onChange={handleChangeTaskStatus}
          sx={{
            color: "#a486fc",
            marginLeft: "-9px",
            "& .Mui-disabled": {
              color: "#a486fc",
            },
          }}
          disabled={disabled}
          className={s.checkbox}
        />
        <span className={`${s.taskText} ${hovered ? s.hovered : ""}`}>
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
        <CancelIcon color={"primary"} />
      </IconButton>
    </div>
  );
};

export default Task;
