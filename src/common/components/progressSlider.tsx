import React from "react";
import { Slider, styled } from "@mui/material";

type ProgressSliderProps = {
  progressValue: number;
};
const ProgressSlider = (props: ProgressSliderProps) => {
  const SliderForProgress = styled(Slider)({
    width: "80%",
    marginTop: "50px",
    color: "#1ddecb",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      transform: props.progressValue > 50 ? "translate(-100%, -50%)" : "translate(0%,-50%)",
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
      color: "#212121",
      lineHeight: 1.2,
      fontSize: 14,
      fontWeight: "bold",
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#1ddecb",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
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
