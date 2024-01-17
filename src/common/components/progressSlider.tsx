import React, { useEffect, useState } from "react";
import { Slider, styled } from "@mui/material";

type ProgressSliderProps = {
  progressValue: number;
};
const ProgressSlider = (props: ProgressSliderProps) => {
  const SliderForProgress = styled(Slider)({
    transition: "transform 0.3s ease-in-out",
    width: "80%",
    marginTop: "50px",
    color: "#1ddecb",
    // color: "#1ddecb",
    // color: "linear-gradient(124deg, rgba(187,134,252,1) 28%, rgba(29,222,203,1) 97%)",

    // backgroundClip: "text",
    // color: "transparent",
    // backgroundImage: "linear-gradient(124deg, rgba(187,134,252,1) 28%, rgba(29,222,203,1) 97%)",

    height: 8,
    "& .MuiSlider-track": {
      transition: "transform 0.3s ease-in-out",
      border: "none",
      // borderRadius: props.progressValue > 50 ? "" : "4px 0 0 4px",
      borderRadius: props.progressValue <= 50 && "4px 0 0 4px",
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
      transition: "transform 0.3s ease-in-out",
      height: 24,
      width: 24,
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
      transition: "transform 0.3s ease-in-out",
      color: "#212121",
      lineHeight: 1.2,
      fontSize: 14,
      fontWeight: "bold",
      // background: "unset",
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
    <div>
      <SliderForProgress valueLabelDisplay="on" defaultValue={0} value={props.progressValue} />
    </div>
  );
};

export default ProgressSlider;
