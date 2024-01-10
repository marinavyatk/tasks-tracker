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
  selectTodolists,
} from "common/selectors";
import s from "./todolistsList.module.css";
import Sidebar from "features/sidebar/sidebar";
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import { tasksThunks } from "features/tasks/model/tasksReducer";

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
    dispatch(todolistThunks.changeTodolistOrder(data));
  };
  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={2}>
          <Sidebar /> {/*лучше внутри этого компонента запрашивать тудулисты или передавать их через пропсы?*/}
        </Grid>

        <Grid container item xs={10} justifyContent={"center"}>
          <Grid item>
            <div className={s.addItemField}>
              <AddNewItemField
                width={"500px"}
                placeholder={"Let`s create a list..."}
                addItem={addTodolist}
                error={error}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={s.todoBlock}>
              {activeTodo === "All"
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
                    })}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodolistsList;
