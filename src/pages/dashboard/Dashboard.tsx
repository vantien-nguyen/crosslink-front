import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import Moment from 'moment';

import { getShopActivities } from '../../api/DashboardAPIs';
import DateRangePicker from '../../components/dashboard/DateRangePicker';
import LineChart from '../../components/dashboard/LineChart';
import MetricItem from '../../components/dashboard/MetricItem';
import Loading from '../../components/ui/Loading';
import Selection from '../../components/ui/Selection';
import {
  IMPRESSIONS,
  INITIAL_SHOPACTIVITIES,
  METRICS,
  WIDGET_TYPES,
} from '../../constant/Constant';
import { documentTitle, listDateLabels, percentageGrowth } from '../../utils';

export default function Dashboard() {
  documentTitle('Dashboard');
  const [cookies] = useCookies(['shopId']);
  const [currentWidgetType, setCurrentWidgetType] = useState('cross_sell');
  const [currentMetric, setCurrentMetric] = useState(IMPRESSIONS.metricName);
  const [currentDailyMetric, setCurrentDailyMetric] = useState(
    IMPRESSIONS.dailyMetricName,
  );
  const [timeRangePicker, setTimeRangePicker] = useState({
    startDate: Moment().add(-7, 'days').toDate(),
    endDate: Moment().toDate(),
  });
  const {
    data: shopActivities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['shopActivities', timeRangePicker],
    queryFn: () => getShopActivities(cookies.shopId, timeRangePicker),
    initialData: INITIAL_SHOPACTIVITIES,
    enabled:
      timeRangePicker.startDate !== null && timeRangePicker.endDate !== null,
  });

  function onChangeTimeRangePicker(dates: { startDate: Date; endDate: Date }) {
    setTimeRangePicker(dates);
  }

  const handleOnClick = (metricName: string, dailyMetricName: string) => {
    setCurrentMetric(metricName);
    setCurrentDailyMetric(dailyMetricName);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className={'max-w-full mx-4 md:mx-16'}>
      <div className="my-4 w-full flex flex-grap md:flex justify-between gap-4">
        <Selection
          className="flex-initial w-40"
          id={'widgetType'}
          value={currentWidgetType}
          items={WIDGET_TYPES}
          handleChange={event => setCurrentWidgetType(event.target.value)}
        />
        <DateRangePicker
          className="flex flex-initial"
          startDate={timeRangePicker.startDate}
          endDate={timeRangePicker.endDate}
          setDate={onChangeTimeRangePicker}
        />
      </div>

      <div className="w-full flex flex-wrap gap-6 justify-between">
        {METRICS.map(metric => {
          return (
            <MetricItem
              key={metric.key}
              value={shopActivities?.[metric.metricName]?.[currentWidgetType]}
              metric={metric}
              currentMetric={currentMetric}
              percentageGrowth={percentageGrowth(
                Object.values(
                  shopActivities?.[metric.dailyMetricName]?.[currentWidgetType],
                ),
              )}
              handleOnClick={() =>
                handleOnClick(metric.metricName, metric.dailyMetricName)
              }
            />
          );
        })}
      </div>

      <div
        className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg bg-white
          lg:h-64 p-7"
      >
        <LineChart
          labels={listDateLabels(
            timeRangePicker.startDate,
            timeRangePicker.endDate,
          )}
          data={Object.values(
            shopActivities?.[currentDailyMetric]?.[currentWidgetType],
          )}
        />
      </div>
    </div>
  );
}
