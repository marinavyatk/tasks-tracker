import { Slider, styled } from "@mui/material";

type ProgressSliderProps = {
  progressValue: number;
};
const ProgressSlider = (props: ProgressSliderProps) => {
  const SliderForProgress = styled(Slider)({
    width: "80%",
    color: "#1ddecb",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
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
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <SliderForProgress defaultValue={0} value={props.progressValue} />
      <p
        style={{
          width: "80%",
          textAlign: "start",
          fontSize: "12px",
          marginTop: "-8px",
          color: "#a8a8a8",
        }}
      >
        Done: {props.progressValue}%
      </p>
    </div>
  );
};

export default ProgressSlider;
