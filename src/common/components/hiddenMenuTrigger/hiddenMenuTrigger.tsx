import React from "react";
import s from "./hiddenMenuTrigger.module.css";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

type HiddenMenuTriggerProps = {
  onClick: (hidden: boolean) => void;
};
export const HiddenMenuTrigger = (props: HiddenMenuTriggerProps) => {
  return (
    <div className={s.triggerContainer} onClick={() => props.onClick(false)}>
      <DensityMediumIcon />
    </div>
  );
};
