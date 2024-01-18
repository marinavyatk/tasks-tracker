import React, { useEffect, useState } from "react";
import { Slider, styled } from "@mui/material";

type ProgressSliderProps = {
  progressValue: number;
};
const ProgressSlider = (props: ProgressSliderProps) => {
  const SliderForProgress = styled(Slider)({
    transition: "transform 0.3s ease-in-out",
    width: "80%",
    // marginTop: "50px",
    color: "#1ddecb",
    height: 8,
    "& .MuiSlider-track": {
      transition: "transform 0.3s ease-in-out",
      border: "none",
      // borderRadius: props.progressValue > 50 ? "" : "4px 0 0 4px",
      // borderRadius: props.progressValue <= 50 && "4px 0 0 4px",
      borderRadius: "4px",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: "4px",
        background: "linear-gradient(124deg, #a486fc 28%, rgba(29,222,203,1) 97%)",
      },
    },
    "& .MuiSlider-thumb": {
      display: "none",
      transition: "transform 0.3s ease-in-out",
      height: 15,
      width: 15,
      transform: props.progressValue > 50 ? "translate(-100%, -50%)" : "translate(-2%,-50%)",

      backgroundColor: "#e6e6e6",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      display: "none",
      transition: "transform 0.3s ease-in-out",
      color: "#212121",
      lineHeight: 1.2,
      fontSize: 14,
      fontWeight: "bold",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#1ddecb",
      // background: "linear-gradient(124deg, rgba(187,134,252,1) 28%, rgba(29,222,203,1) 97%)",
      // backgroundColor: "#a486fc",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transition: "transform 0.3s ease-in-out",
        transform: "rotate(45deg)",
      },
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <SliderForProgress valueLabelDisplay="on" defaultValue={0} value={props.progressValue} />
      <p
        style={{
          width: "80%",
          textAlign: "start",
          fontSize: "12px",
          marginTop: "-8px",
          color: "#a8a8a8",
          // padding: "0 4px",
        }}
      >
        Done: {props.progressValue}%
      </p>
    </div>
  );
};

export default ProgressSlider;
