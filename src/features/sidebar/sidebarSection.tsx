import React from "react";
import s from "features/sidebar/sidebarSection.module.css";
import ProgressCircle from "common/components/ProgressCircle/ProgressCircle";
import { useAppDispatch } from "app/store";
import { appActions } from "app/appReducer";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveTodo } from "common/selectors";

type SidebarSectionProps = {
  sectionName: string;
  progressValue?: number;
  todoId: string;
  badgeContent?: number;
};

const SidebarSection = (props: SidebarSectionProps) => {
  const dispatch = useAppDispatch();
  const activeTodo = useSelector(selectActiveTodo);
  const handleClick = (todoId: string) => {
    dispatch(appActions.setActiveTodo({ todoId }));
  };
  return (
    <div className={s.sidebarSection} onClick={() => handleClick(props.todoId)}>
      <div className={`${s.inner} ${activeTodo === props.todoId ? s.activeTodo : ""}`}>
        {props.sectionName !== "All" ? (
          // <div className={s.item}>
          <p>{props.sectionName}</p>
        ) : (
          // </div>

          <Badge
            badgeContent={<span style={{ fontWeight: "bold" }}>{props.badgeContent}</span>}
            color={"secondary"}
            showZero
            className={s.all}
            // sx={{ display: "block", width: "100%" }}
          >
            <p>{props.sectionName}</p>
            &ensp;
          </Badge>
        )}
        {props.sectionName !== "All" && (
          <div className={s.item}>
            <ProgressCircle color={"#1ddecb"} percentage={props.progressValue ? props.progressValue : 0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSection;
