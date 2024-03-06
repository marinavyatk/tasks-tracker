import React from "react";
import s from "./hiddenMenuTrigger.module.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type HiddenMenuTrigger = {
  onClick: (hidden: boolean) => void;
};
export const HiddenMenuTrigger = (props: HiddenMenuTrigger) => {
  return (
    <div className={s.triggerContainer} onClick={() => props.onClick(false)}>
      <TaskAltIcon />
    </div>
  );
};
