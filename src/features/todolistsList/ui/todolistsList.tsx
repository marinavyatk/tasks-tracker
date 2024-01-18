import React, { useEffect, useState } from "react";
import AddNewItemField from "common/components/addNewItemField";
import Todolist from "features/todolist/ui/todolist";
import { useAppDispatch } from "app/store";
import { todolistThunks } from "features/todolist/model/todolistReducer";
import { useSelector } from "react-redux";
import {
  selectActiveTodo,
  selectAppError,
  selectAppStatus,
  selectIsAuthorized,
  selectListsDirection,
  selectTodolists,
} from "common/selectors";
import s from "./todolistsList.module.css";
import Sidebar from "features/sidebar/sidebar";
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TodolistsList = () => {
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    dispatch(todolistThunks.fetchTodolists());
  }, []);

  const [dragStartTodoId, setDragStartTodoId] = useState("");
  const dispatch = useAppDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const todolists = useSelector(selectTodolists);
  const activeTodo = useSelector(selectActiveTodo);
  const error = useSelector(selectAppError);
  const listsDirection = useSelector(selectListsDirection);

  const addTodolist = (newTodoTitle: string) => {
    dispatch(todolistThunks.createTodolist(newTodoTitle));
  };
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  const handleDragStart = (todoId: string) => {
    setDragStartTodoId(todoId);
  };
  const handleChangeTodoOrder = (data: { todoId: string; putAfterItemId: string | null }) => {
    console.log("change order!!!");
    console.log("todoId:");
    console.log(data.todoId);
    console.log("putAfterItemId:");
    console.log(data.putAfterItemId);
    dispatch(todolistThunks.changeTodolistOrder(data));
  };

  const todolistsForDisplay =
    activeTodo === "All"
      ? todolists.map((tl, index) => {
          return (
            <Todolist
              key={tl.id}
              todoTitle={tl.title}
              todoId={tl.id}
              todoEntityStatus={tl.entityStatus}
              onDragStart={handleDragStart}
              onDrop={() =>
                handleChangeTodoOrder({
                  todoId: dragStartTodoId,
                  putAfterItemId: todolists[index - 1]?.id || null,
                })
              }
            />
          );
        })
      : todolists
          .filter((tl) => tl.id === activeTodo)
          .map((tl, index) => {
            return (
              <Todolist
                key={tl.id}
                todoTitle={tl.title}
                todoId={tl.id}
                todoEntityStatus={tl.entityStatus}
                onDragStart={handleDragStart}
                onDrop={() =>
                  handleChangeTodoOrder({
                    todoId: tl.id,
                    putAfterItemId: todolists[index - 1]?.id || null,
                  })
                }
              />
            );
          });

  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };
  return (
    <Grid container justifyContent="center" sx={{ padding: "20px 0" }}>
      <Grid
        item
        xs={2}
        sx={
          {
            // backgroundColor: "white",
            // top: "0px",
            // bottom: "0px",
          }
        }
      >
        <Sidebar /> {/*лучше внутри этого компонента запрашивать тудулисты или передавать их через пропсы?*/}
      </Grid>
      <Grid container item xs={10} justifyContent={"center"}>
        <Grid item>
          {/*<div className={s.addItemField}>*/}
          <AddNewItemField width={"494px"} placeholder={"Let`s create a list..."} addItem={addTodolist} error={error} />
          {/*</div>*/}
          <Grid container direction={listsDirection} className={s.todoBlock} sx={{ position: "relative" }}>
            {todolistsForDisplay}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TodolistsList;
