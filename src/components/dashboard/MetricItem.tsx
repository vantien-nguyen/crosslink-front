import ArrowDown from "../../assets/icons/arrow_down.svg";
import ArrowUp from "../../assets/icons/arrow_up.svg";
import MinusIcon from "../../assets/icons/minus.svg";
import { CONVERSIONS, CTR, SALES } from "../../constant/Constant";
import { formatNumber } from "../../utils";

interface Props {
  value: number;
  metric: {
    key: number;
    name: string;
    icon: string;
    metricName: string;
    dailyMetricName: string;
  };
  currentMetric: string;
  percentageGrowth: number;
  handleOnClick: (metricName: string, dailyMetricName: string) => void;
}

const MetricItem = ({
  value,
  metric,
  currentMetric,
  percentageGrowth,
  handleOnClick,
}: Props) => {
  return (
    <div
      className={`rounded-lg ${metric.metricName === currentMetric && "bg-blue-100"} p-4 min-w-40
      max-w-48 border border-gray-200 shadow hover:cursor-pointer hover:bg-blue-200
      md:min-w-40`}
      onClick={() => handleOnClick(metric.metricName, metric.dailyMetricName)}
    >
      <img className="mb-2 min-h-6 min-w-6 max-h-6 max-w-6" src={metric.icon} />
      <p className="text-xl font-bold text-gray-700 dark:text-white md:text-base">
        {metric.key === SALES.key ? "€" : ""}
        {formatNumber(value)}
        {[CTR.key, CONVERSIONS.key].includes(metric.key) ? "%" : ""}
      </p>
      <div className="flex justify-between">
        <div className="flex-initial">
          <p className="text-sm font-medium text-gray-500 dark:text-white">
            {metric.name}
          </p>
        </div>
        <div className="flex flex-initial ml-auto items-stretch">
          <p className="text-sm font-medium text-gray-500 dark:text-white self-center">
            {formatNumber(Math.abs(percentageGrowth))}%
          </p>
          <img
            className="self-center max-h-5"
            src={
              percentageGrowth > 0
                ? ArrowUp
                : percentageGrowth < 0
                  ? ArrowDown
                  : MinusIcon
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MetricItem;
