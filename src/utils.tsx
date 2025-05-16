import { CROSS_SELL, DASHBOARD, SETTINGS, UPSELL } from './constant/Constant';
import { FIXED_AMOUNT, PERCENTAGE } from './constant/Constant';
import CrossSell from './pages/crossSell/CrossSell';
import Dashboard from './pages/dashboard/Dashboard';
import { Settings } from './pages/settings/Settings';
import Upsell from './pages/upsell/Upsell';

export function calculateFinalPrice(
  originalPrice: number,
  discountType: string,
  discountValue: number,
) {
  let discountedPrice = originalPrice;

  if (discountType === PERCENTAGE) {
    discountedPrice = originalPrice * (1 - discountValue / 100);
  } else if (discountType === FIXED_AMOUNT) {
    discountedPrice = Math.max(originalPrice - discountValue, 0);
  }

  return discountedPrice.toFixed(2);
}

export function getView(href: string) {
  switch (href) {
    case '/dashboard':
      return <Dashboard />;
    case '/upsell':
      return <Upsell />;
    case '/crosssell':
      return <CrossSell />;
    case '/settings':
      return <Settings />;
    default:
      return <></>;
  }
}

export function getNavigation(href: string) {
  switch (href) {
    case '/dashboard':
      return DASHBOARD;
    case '/upsell':
      return UPSELL;
    case '/crosssell':
      return CROSS_SELL;
    case '/settings':
      return SETTINGS;
    default:
      return DASHBOARD;
  }
}

export function formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function listDateLabels(startDate: Date, endDate: Date) {
  const dateList = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateList.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

export function percentageGrowth(data: number[]) {
  const start = data.at(0);
  const end = data.at(-1);

  if (start === 0 && end !== 0) {
    return 100;
  }
  if (start !== 0 && end == 0) {
    return -100;
  }
  if (start === end || !start || !end) {
    return 0;
  }

  return (100 * (end - start)) / start;
}

export function documentTitle(title: string) {
  document.title = title ? title : 'Crosslink';
}
