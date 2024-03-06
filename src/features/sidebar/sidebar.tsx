import s from "./sidebar.module.css";
import { Button } from "@mui/material";
import SidebarSection from "features/sidebar/sidebarSection";
import { useSelector } from "react-redux";
import { selectListsDirection, selectSound, selectTasks, selectTodolists, selectUserEmail } from "common/selectors";
import { useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import { TaskStatuses } from "common/enums";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";
import AppsIcon from "@mui/icons-material/Apps";
import { ListsDirection, Sound } from "common/types";
import { appActions } from "app/appReducer";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { useState } from "react";
import { todolistThunks } from "features/todolist/model/todolistReducer";

type Sidebar = {
  setSidebarHidden: (hidden: boolean) => void;
};

const Sidebar = (props: Sidebar) => {
  const dispatch = useAppDispatch();
  const [play] = useSound(clickSound);
  //useSelector block
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectUserEmail);
  const listsDirection = useSelector(selectListsDirection);
  const sound = useSelector(selectSound);

  const [dragStartTodoId, setDragStartTodoId] = useState("");

  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  // useEffect(() => {
  //   dispatch(authActions.changeUserEmail(user));
  // }, [user]);
  const logOut = () => {
    dispatch(authThunks.logout());
  };
  const handleDragStart = (todoId: string) => {
    setDragStartTodoId(todoId);
  };
  const changeTodoOrder = (data: { todoId: string; putAfterItemId: string | null }) => {
    console.log("todoId:");
    console.log(data.todoId);
    console.log("putAfterItemId:");
    console.log(data.putAfterItemId);
    dispatch(todolistThunks.changeTodolistOrder(data));
  };

  const sections = todolists.map((tl, index) => {
    const completedTasks = tasks[tl.id]
      ? tasks[tl.id].filter((task) => task.status === TaskStatuses.Completed).length
      : 0;
    const progressValue = completedTasks === 0 ? 0 : Math.round((completedTasks / tasks[tl.id].length) * 100);
    const handleChangeTodoOrder = () => {
      if (dragStartTodoId !== todolists[index]?.id) {
        changeTodoOrder({
          todoId: dragStartTodoId,
          putAfterItemId: todolists[index - 1]?.id || null,
        });
      }
    };
    return (
      <SidebarSection
        sectionName={tl.title}
        key={tl.id}
        progressValue={progressValue}
        todoId={tl.id}
        onDragStart={handleDragStart}
        onDrop={handleChangeTodoOrder}
      />
    );
  });
  const changeDirection = (direction: ListsDirection) => {
    dispatch(appActions.setListsDirection({ direction }));
    localStorage.setItem("direction", direction);
    playSound(sound);
  };
  const changeSound = (sound: Sound) => {
    dispatch(appActions.setSound({ sound }));
    localStorage.setItem("sound", sound);
    playSound(sound);
  };

  return (
    <div className={s.sidebar}>
      <div>
        <div className={s.logo} onClick={() => props.setSidebarHidden(true)} title={"close menu"}>
          <TaskAltIcon />
          &ensp;
          <p>TASKS TRACKER</p>
        </div>
        <p className={s.subTitle}>Customization</p>
        <div className={s.buttonsBlock}>
          <div className={s.buttonsSwitcher}>
            <div
              className={`${s.buttonContainer} ${listsDirection === "column" ? s.activeMode : ""}`}
              onClick={() => changeDirection("column")}
            >
              <ReorderIcon />
            </div>
            <div
              className={`${s.buttonContainer} ${listsDirection === "row" ? s.activeMode : ""}`}
              onClick={() => changeDirection("row")}
            >
              <AppsIcon />
            </div>
          </div>
          <div className={s.buttonsSwitcher}>
            <div
              className={`${s.buttonContainer} ${sound === "on" ? s.activeMode : ""}`}
              onClick={() => changeSound("on")}
            >
              <VolumeDownIcon />
            </div>
            <div
              className={`${s.buttonContainer} ${sound === "off" && s.activeMode}`}
              onClick={() => changeSound("off")}
            >
              <VolumeOffIcon />
            </div>
          </div>
        </div>

        <p className={s.subTitle}>Tasks</p>
        <div className={s.lists}>
          <SidebarSection sectionName={"All"} todoId={"All"} badgeContent={todolists.length} />
          {sections}
        </div>
      </div>
      <div className={s.sidebarFooter}>
        <Button onClick={logOut} sx={{ color: "#e7e7e7" }}>
          Log out &ensp; <LogoutIcon fontSize={"inherit"} />
        </Button>
        <p className={s.user}>{user}</p>
      </div>
    </div>
  );
};

export default Sidebar;
