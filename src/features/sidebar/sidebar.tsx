import React, { useEffect } from "react";
import s from "./sidebar.module.css";
import { Badge, Button } from "@mui/material";
import SidebarSection from "features/sidebar/sidebarSection";
import { useSelector } from "react-redux";
import { selectTasks, selectTodolists } from "common/selectors";
import { useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import AuthApi from "features/loginForm/api/authApi";
import { tasksThunks } from "features/tasks/model/tasksReducer";
import { TaskStatuses } from "common/enums";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);

  const logOut = () => {
    dispatch(authThunks.logout());
    // AuthApi.logOut();
  };
  return (
    <div className={s.sidebar}>
      <div className={s.logo}>
        <TaskAltIcon />
        <p>TASKS TRACKER</p>
      </div>
      <Badge
        badgeContent={todolists.length}
        color={"secondary"}
        sx={{ "&: MuiBadge-standard": { fontWeight: "bold" } }}
      >
        <SidebarSection sectionName={"All"} todoId={"All"} />
      </Badge>

      {todolists.map((tl) => {
        const completedTasks = tasks[tl.id]
          ? tasks[tl.id].filter((task) => task.status === TaskStatuses.Completed).length
          : 0;
        const progressValue = completedTasks === 0 ? 0 : Math.round((completedTasks / tasks[tl.id].length) * 100);
        return <SidebarSection sectionName={tl.title} key={tl.id} progressValue={progressValue} todoId={tl.id} />;
      })}
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
};

export default Sidebar;
