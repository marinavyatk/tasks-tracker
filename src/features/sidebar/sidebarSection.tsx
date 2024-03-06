import React, { useState } from "react";
import s from "features/sidebar/sidebarSection.module.css";
import ProgressCircle from "common/components/ProgressCircle/ProgressCircle";
import { useAppDispatch } from "app/store";
import { appActions } from "app/appReducer";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveTodo } from "common/selectors";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { selectSound } from "common/selectors";
import { Sound } from "common/types";

type SidebarSectionProps = {
  sectionName: string;
  progressValue?: number;
  todoId: string;
  badgeContent?: number;
  onDragStart?: (todoId: string) => void;
  onDrop?: () => void;
};

const SidebarSection = (props: SidebarSectionProps) => {
  const dispatch = useAppDispatch();
  const activeTodo = useSelector(selectActiveTodo);
  const [hovered, setHovered] = useState(false);

  const [play] = useSound(clickSound);
  const sound = useSelector(selectSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  const handleClick = (todoId: string) => {
    dispatch(appActions.setActiveTodo({ todoId }));
    playSound(sound);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <div
      className={`${s.sidebarSection} `}
      onClick={() => handleClick(props.todoId)}
      draggable={true}
      onDragStart={() => props.onDragStart && props.onDragStart(props.todoId)}
      onDrop={() => {
        props.onDrop && props.onDrop();
        setHovered(false);
      }}
      onDragOver={handleDragOver}
      onDragEnter={() => setHovered(true)}
      onDragLeave={() => setHovered(false)}
    >
      <div className={`${s.inner} ${activeTodo === props.todoId ? s.activeTodo : ""} ${hovered ? s.hovered : ""}`}>
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
            <ProgressCircle
              color={"#1ddecb"}
              // color={"#a96666"}
              percentage={props.progressValue ? props.progressValue : 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSection;
