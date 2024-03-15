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
import { appActions } from "app/appReducer";
import { ListsDirection, Sound } from "common/types";
import { HiddenMenuTrigger } from "common/components/hiddenMenuTrigger/hiddenMenuTrigger";

const TodolistsList = () => {
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    dispatch(todolistThunks.fetchTodolists());

    const direction = localStorage.getItem("direction") as ListsDirection;
    if (direction) {
      dispatch(appActions.setListsDirection({ direction: direction }));
    }
    const sound = localStorage.getItem("sound") as Sound;
    if (sound) {
      dispatch(appActions.setSound({ sound: sound }));
    }
  }, []);

  const [sidebarHidden, setSidebarHidden] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const todolists = useSelector(selectTodolists);
  const activeTodo = useSelector(selectActiveTodo);
  const error = useSelector(selectAppError);
  const listsDirection = useSelector(selectListsDirection);

  const addTodolist = (newTodoTitle: string) => {
    dispatch(todolistThunks.createTodolist(newTodoTitle));
  };

  const todolistsForDisplay =
    activeTodo === "All"
      ? todolists.map((tl) => {
          return <Todolist key={tl.id} todoTitle={tl.title} todoId={tl.id} todoEntityStatus={tl.entityStatus} />;
        })
      : todolists
          .filter((tl) => tl.id === activeTodo)
          .map((tl) => {
            return <Todolist key={tl.id} todoTitle={tl.title} todoId={tl.id} todoEntityStatus={tl.entityStatus} />;
          });

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={s.mainContainer}>
      {sidebarHidden ? (
        <HiddenMenuTrigger onClick={setSidebarHidden} />
      ) : (
        <Sidebar setSidebarHidden={setSidebarHidden} />
      )}
      <div className={s.todoBlock}>
        <AddNewItemField width={"500px"} placeholder={"Let`s create a list..."} addItem={addTodolist} error={error} />
        <div className={`${s.todos} ${listsDirection === "column" ? s.columnOrientation : s.rowOrientation}`}>
          {todolistsForDisplay}
        </div>
      </div>
    </div>
  );
};

export default TodolistsList;
