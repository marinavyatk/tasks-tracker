const r = 18;
const circ = 2 * Math.PI * r;
const strokeWidth = 5; // Ширина обводки
const svgSize = r * 2 + strokeWidth * 2;
const svgCenter = svgSize / 2;

const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};
type Circle = {
  color: string;
  percentage: number;
};
const Circle = (props: Circle) => {
  const { color, percentage } = props;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={svgCenter}
      cy={svgCenter}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};
type Text = {
  percentage: number;
};
const Text = (props: Text) => {
  const { percentage } = props;
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"12px"}
      fill={"#e6e6e6"}
      fontWeight={"bold"}
    >
      {percentage}%
    </text>
  );
};
type ProgressCircle = {
  color: string;
  percentage: number;
};
const ProgressCircle = (props: ProgressCircle) => {
  const { color, percentage } = props;
  const pct = cleanPercentage(percentage);
  return (
    <svg width={svgSize} height={svgSize}>
      <g transform={`rotate(90 ${svgCenter} ${svgCenter})`}>
        <Circle color="rgb(124,218,203, 0.4)" percentage={100} />
        <Circle color={color} percentage={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};
export default ProgressCircle;
