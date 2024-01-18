import s from "./sidebar.module.css";
import { Button } from "@mui/material";
import SidebarSection from "features/sidebar/sidebarSection";
import { useSelector } from "react-redux";
import { selectTasks, selectTodolists, selectUserEmail } from "common/selectors";
import { useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import { TaskStatuses } from "common/enums";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";
import AppsIcon from "@mui/icons-material/Apps";
import { ListsDirection } from "common/types";
import { appActions } from "app/appReducer";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectUserEmail);
  // useEffect(() => {
  //   dispatch(authActions.changeUserEmail(user));
  // }, [user]);
  const logOut = () => {
    dispatch(authThunks.logout());
  };
  const sections = todolists.map((tl) => {
    const completedTasks = tasks[tl.id]
      ? tasks[tl.id].filter((task) => task.status === TaskStatuses.Completed).length
      : 0;
    const progressValue = completedTasks === 0 ? 0 : Math.round((completedTasks / tasks[tl.id].length) * 100);
    return <SidebarSection sectionName={tl.title} key={tl.id} progressValue={progressValue} todoId={tl.id} />;
  });
  const changeDirection = (direction: ListsDirection) => {
    dispatch(appActions.setListsDirection({ direction }));
  };

  return (
    <div className={s.sidebar}>
      <div>
        <div className={s.logo}>
          <TaskAltIcon />
          &ensp;
          <p>TASKS TRACKER</p>
        </div>
        <p className={s.subTitle}>Appearance</p>
        <div className={s.buttonsPanel}>
          <div className={s.buttonContainer} onClick={() => changeDirection("column")}>
            <ReorderIcon />
          </div>
          <div className={s.buttonContainer} onClick={() => changeDirection("row")}>
            <AppsIcon />
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
