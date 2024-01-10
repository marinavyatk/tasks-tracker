import React from "react";
import s from "features/sidebar/sidebarSection.module.css";
import ProgressCircle from "common/components/ProgressCircle/ProgressCircle";
import { useAppDispatch } from "app/store";
import { appActions } from "app/appReducer";

type SidebarSectionProps = {
  sectionName: string;
  progressValue?: number;
  todoId: string;
};

const SidebarSection = (props: SidebarSectionProps) => {
  const dispatch = useAppDispatch();
  const handleClick = (todoId: string) => {
    dispatch(appActions.setActiveTodo({ todoId }));
  };
  return (
    <div className={s.sidebarSection} onClick={() => handleClick(props.todoId)}>
      <p className={s.item}>{props.sectionName}</p>
      {props.sectionName !== "All" && (
        <div className={s.item}>
          <ProgressCircle color={"#1ddecb"} percentage={props.progressValue ? props.progressValue : 0} />
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
