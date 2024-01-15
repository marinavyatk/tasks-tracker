import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import EditableSpan from "common/components/editableSpan";
import s from "./todolist.module.css";
import ProgressSlider from "common/components/progressSlider";
import { useSelector } from "react-redux";
import { selectAppError, selectAppStatus, selectTasks } from "common/selectors";
import Task from "features/tasks/ui/task";
import { useAppDispatch } from "app/store";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import { TaskStatuses } from "common/enums";
import { todolistActions, todolistThunks } from "features/todolist/model/todolistReducer";
import AddNewItemField from "common/components/addNewItemField";
import { Filter, RequestStatus } from "common/types";

type Todolist = {
  todoTitle: string;
  todoId: string;
  todoEntityStatus: RequestStatus;
  onDragStart: (todoId: string) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};
const Todolist = (props: Todolist) => {
  const error = useSelector(selectAppError);
  const disabled = props.todoEntityStatus === "loading";
  const [currentFilter, setCurrentFilter] = useState("all" as Filter);
  const [dragStartTaskId, setDragStartTaskId] = useState("");
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  // useEffect(() => {
  //   dispatch(tasksThunks.fetchTasks(props.todoId));
  // }, [props.todoId]);
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
  };
  const handleChangeFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const filterValue = e.currentTarget.value as Filter;
    console.log(filterValue);
    todolistActions.changeFilter({ todoId: props.todoId, filter: filterValue });
    setCurrentFilter(filterValue);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleChangeTaskOrder = (data: { todoId: string; taskId: string; putAfterItemId: string | null }) => {
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
  return (
    <Card
      sx={{
        // minWidth: 275,
        backgroundColor: "#383838",
        width: "500px",
        // textAlign: "center",
        // minHeight: "150px"
      }}
      raised={true}
      draggable={true}
      onDragStart={() => props.onDragStart(props.todoId)}
      onDragOver={handleDragOver}
      onDrop={props.onDrop}
      id={props.todoId}
    >
      <CardContent sx={{ padding: "20px 0" }}>
        <Typography variant="h5" color="primary.light" gutterBottom sx={{ width: "80%", margin: " 5px auto" }}>
          <EditableSpan content={props.todoTitle} changeTitle={changeTodoTitle} todoId={props.todoId} />{" "}
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
      <div className={s.tasksBlock}>
        {!tasksForTodolist.length ? (
          <span className={s.noTasksString}>{`No ${currentFilter !== "all" ? currentFilter : ""} tasks`}</span>
        ) : (
          tasksForTodolist.map((task, index) => (
            <Task
              key={task.id}
              title={task.title}
              todoId={props.todoId}
              taskId={task.id}
              taskStatus={task.status}
              todoEntityStatus={props.todoEntityStatus}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() =>
                handleChangeTaskOrder({
                  todoId: props.todoId,
                  taskId: dragStartTaskId,
                  putAfterItemId: tasksForTodolist[index - 1]?.id || null,
                })
              }
            />
          ))
        )}
      </div>
      {/*<div style={{ transition: "transform 0.3s ease-in-out" }}>*/}
      <ProgressSlider progressValue={progressValue} />
      {/*</div>*/}

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
  );
};

export default Todolist;
