import React from "react";
import s from "features/sidebar/sidebarSection.module.css";
import ProgressCircle from "common/components/ProgressCircle/ProgressCircle";
import { useAppDispatch } from "app/store";
import { appActions } from "app/appReducer";
import { Badge } from "@mui/material";
type SidebarSectionProps = {
  sectionName: string;
  progressValue?: number;
  todoId: string;
  badgeContent?: number;
};

const SidebarSection = (props: SidebarSectionProps) => {
  const dispatch = useAppDispatch();
  const handleClick = (todoId: string) => {
    dispatch(appActions.setActiveTodo({ todoId }));
  };
  return (
    <div className={s.sidebarSection} onClick={() => handleClick(props.todoId)}>
      {props.sectionName !== "All" ? (
        <p className={s.item}>{props.sectionName}</p>
      ) : (
        <Badge
          badgeContent={<span style={{ fontWeight: "bold" }}>{props.badgeContent}</span>}
          color={"secondary"}
          showZero
        >
          <p className={s.item}>{props.sectionName}</p> &ensp;
        </Badge>
      )}
      {props.sectionName !== "All" && (
        <div className={s.item}>
          <ProgressCircle color={"#1ddecb"} percentage={props.progressValue ? props.progressValue : 0} />
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
