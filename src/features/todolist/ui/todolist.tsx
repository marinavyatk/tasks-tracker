import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import EditableSpan from "common/components/editableSpan";
import s from "./todolist.module.css";
import ProgressSlider from "common/components/progressSlider";
import { useSelector } from "react-redux";
import { selectAppError, selectTasks } from "common/selectors";
import Task from "features/tasks/ui/task";
import { useAppDispatch } from "app/store";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import { TaskStatuses } from "common/enums";
import { todolistActions, todolistThunks } from "features/todolist/model/todolistReducer";
import AddNewItemField from "common/components/addNewItemField";
import { Filter, RequestStatus, Sound } from "common/types";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { selectSound } from "common/selectors";

type Todolist = {
  todoTitle: string;
  todoId: string;
  todoEntityStatus: RequestStatus;
};
const Todolist = (props: Todolist) => {
  const error = useSelector(selectAppError);
  const disabled = props.todoEntityStatus === "loading";
  const [currentFilter, setCurrentFilter] = useState("all" as Filter);
  const [dragStartTaskId, setDragStartTaskId] = useState("");
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  const [play] = useSound(clickSound);
  const sound = useSelector(selectSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  const completedTasks = tasks[props.todoId]
    ? tasks[props.todoId].filter((task) => task.status === TaskStatuses.Completed).length
    : 0;
  const progressValue = completedTasks === 0 ? 0 : Math.round((completedTasks / tasks[props.todoId].length) * 100);
  const changeTodoTitle = (newTodoTitle: string) => {
    dispatch(todolistThunks.changeTodolistTitle({ todoId: props.todoId, newTodoTitle }));
  };
  const handleAddTask = (newTaskTitle: string) => {
    dispatch(tasksThunks.createTask({ todoId: props.todoId, taskTitle: newTaskTitle }));
  };
  const handleDeleteTodolist = () => {
    dispatch(todolistThunks.deleteTodolist(props.todoId));
    playSound(sound);
  };
  const handleChangeFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const filterValue = e.currentTarget.value as Filter;
    console.log(filterValue);
    todolistActions.changeFilter({ todoId: props.todoId, filter: filterValue });
    setCurrentFilter(filterValue);
    playSound(sound);
  };

  const changeTaskOrder = (data: { todoId: string; taskId: string; putAfterItemId: string | null }) => {
    dispatch(tasksThunks.changeTaskOrder(data));
  };

  const handleDragStart = (taskId: string) => {
    setDragStartTaskId(taskId);
  };

  let tasksForTodolist = tasks[props.todoId];

  if (currentFilter === "active") {
    tasksForTodolist = tasks[props.todoId].filter((t) => t.status === TaskStatuses.New);
  }
  if (currentFilter === "completed") {
    tasksForTodolist = tasks[props.todoId].filter((t) => t.status === TaskStatuses.Completed);
  }
  const tasksForDisplay = !tasksForTodolist.length ? (
    <span className={s.noTasksString}>{`No ${currentFilter !== "all" ? currentFilter : ""} tasks`}</span>
  ) : (
    tasksForTodolist.map((task, index) => {
      const handleChangeTaskOrder = () => {
        if (dragStartTaskId !== tasksForTodolist[index].id) {
          changeTaskOrder({
            todoId: props.todoId,
            taskId: dragStartTaskId,
            putAfterItemId: tasksForTodolist[index - 1]?.id || null,
          });
        }
      };
      return (
        <Task
          key={task.id}
          title={task.title}
          todoId={props.todoId}
          taskId={task.id}
          taskStatus={task.status}
          todoEntityStatus={props.todoEntityStatus}
          onDragStart={handleDragStart}
          onDrop={handleChangeTaskOrder}
        />
      );
    })
  );

  return (
    <div className={s.todoContainer}>
      <Card
        sx={{
          backgroundColor: "rgba(39, 41, 45, 0.6);",
          // width: "500px",
          width: "100%",
          minWidth: "300px",
        }}
        raised={true}
        id={props.todoId}
      >
        <CardContent sx={{ padding: "20px 0" }}>
          <Typography
            variant="h5"
            color="primary.light"
            gutterBottom
            sx={{
              width: "80%",
              margin: " 5px auto",
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
              lineHeight: "normal",
              height: "35.5px",
            }}
          >
            <EditableSpan
              content={props.todoTitle}
              changeTitle={changeTodoTitle}
              todoId={props.todoId}
              isTodolistTitle
            />{" "}
            <IconButton onClick={handleDeleteTodolist} sx={{ padding: "0" }} disabled={disabled}>
              <ClearIcon color={"primary"} />
            </IconButton>
          </Typography>
          <AddNewItemField
            width={"80%"}
            placeholder={"Add new task..."}
            addItem={handleAddTask}
            error={error}
            todoId={props.todoId}
          />
        </CardContent>
        <div className={s.tasksBlock}>{tasksForDisplay}</div>
        <ProgressSlider progressValue={progressValue} />

        <CardActions sx={{ padding: "0" }}>
          <div className={s.buttonBlock}>
            <Button
              variant="outlined"
              color={"secondary"}
              value={"all"}
              onClick={handleChangeFilter}
              className={currentFilter === "all" ? s.activeFilter : ""}
            >
              All
            </Button>
            <Button
              variant="outlined"
              color={"secondary"}
              value={"active"}
              onClick={handleChangeFilter}
              className={currentFilter === "active" ? s.activeFilter : ""}
            >
              Active
            </Button>
            <Button
              variant="outlined"
              color={"secondary"}
              value={"completed"}
              onClick={handleChangeFilter}
              className={currentFilter === "completed" ? s.activeFilter : ""}
            >
              Completed
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Todolist;
