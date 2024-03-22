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
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const activeTodo = useSelector(selectActiveTodo);
  const sound = useSelector(selectSound);
  const [play] = useSound(clickSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  const setActiveTodo = (todoId: string) => {
    dispatch(appActions.setActiveTodo({ todoId }));
    playSound(sound);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleEnter = () => {
    if (props.sectionName !== "All") {
      setHovered(true);
    }
  };
  const handleDragStart = () => {
    props.onDragStart && props.onDragStart(props.todoId);
  };
  const handleDrop = () => {
    props.onDrop && props.onDrop();
    setHovered(false);
  };
  return (
    <div
      className={`${s.sidebarSection} ${activeTodo === props.todoId ? s.activeTodo : ""} ${hovered ? s.hovered : ""}`}
      onClick={() => setActiveTodo(props.todoId)}
      draggable={props.sectionName !== "All"}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleEnter}
      onDragLeave={() => setHovered(false)}
    >
      {props.sectionName !== "All" ? (
        <p>{props.sectionName}</p>
      ) : (
        <Badge
          badgeContent={<span style={{ fontWeight: "bold" }}>{props.badgeContent}</span>}
          color={"secondary"}
          showZero
          className={s.all}
        >
          <p>{props.sectionName}</p>
          &ensp;
        </Badge>
      )}
      {props.sectionName !== "All" && (
        <div className={s.progressCircle}>
          <ProgressCircle color={"#1ddecb"} percentage={props.progressValue ? props.progressValue : 0} />
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
