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
type CircleProps = {
  color: string;
  percentage: number;
};
const Circle = (props: CircleProps) => {
  const { color, percentage } = props;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start
  const dashArray = circ;
  const dashOffset = circ - (percentage * circ) / 100; // изменено направление анимации
  return (
    <circle
      style={{ transition: "0.7s  ease-in-out" }}
      r={r}
      cx={svgCenter}
      cy={svgCenter}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
    ></circle>
  );
};
type TextProps = {
  percentage: number;
};
const Text = (props: TextProps) => {
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
type ProgressCircleProps = {
  color: string;
  percentage: number;
};
const ProgressCircle = (props: ProgressCircleProps) => {
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
