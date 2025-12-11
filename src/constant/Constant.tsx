import CrossSellIcon from "../assets/icons/crosssell.svg";
import DashboardIcon from "../assets/icons/dashboard.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import UpsellIcon from "../assets/icons/upsell.svg";
import ClickIcon from "../assets/icons/clicks.svg";
import ConversionIcon from "../assets/icons/conversion.svg";
import ImpressionIcon from "../assets/icons/impression.svg";
import SaleIcon from "../assets/icons/sales.svg";

import Moment from "moment";

export const EMPTY_EMAIL_MSG = "Please input email!";

export const INVALID_EMAIL_MSG = "Email is invalid";

export const EMPTY_PASSWORD_MSG = "Please input password!";

export const EMAIL_NOT_FOUND_MSG = "Email not found.";

export const WRONG_PASSWORD_MSG = "Wrong password.";

export const LOGIN_FAILED_MSG = "Login failed!";

export const DASHBOARD = 1;

export const CROSS_SELL = 2;

export const UPSELL = 3;

export const SETTINGS = 4;

export const NAVIGATION_ITEM_DASHBOARD = {
  id: DASHBOARD,
  name: "Dashboard",
  href: "/dashboard",
  icon: DashboardIcon,
};

export const NAVIGATION_ITEM_CROSS_SELL = {
  id: CROSS_SELL,
  name: "CrossSell",
  href: "/crosssell",
  icon: CrossSellIcon,
};

export const NAVIGATION_ITEM_UPSELL = {
  id: UPSELL,
  name: "Upsell",
  href: "/upsell",
  icon: UpsellIcon,
};

export const NAVIGATION_ITEM_SETTING = {
  id: SETTINGS,
  name: "Settings",
  href: "/settings",
  icon: SettingsIcon,
};

export const NAVIGATIONS = [
  NAVIGATION_ITEM_DASHBOARD,
  NAVIGATION_ITEM_CROSS_SELL,
  NAVIGATION_ITEM_UPSELL,
  NAVIGATION_ITEM_SETTING,
];

export const STRONG_PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#€$%^&*()_+=[\]{}\\|;:'",.<>/?]).{8,}$/;

export const STRONG_PASSWORD_MSG =
  "The format of your password is invalid. Please use at least 1 letter, 1 number, 1 special character";

export const CONFIRM_PASSWORD_MSG = "Please make sure your passwords match.";

export const WIDGET_LIMIT_PER_PAGE = 8;

export const PRODUCT_LIMIT_PER_PAGE = 5;

export const PERCENTAGE = "percentage";

export const FIXED_AMOUNT = "fixed_amount";

export const NONE = "none";

export const ALL_PRODUCTS = "all_products";

export const SPECIFIC_PRODUCTS = "specific_products";

export const ERROR = "error";

export const SUCCESS = "success";

export const IMPRESSIONS = {
  key: 1,
  name: "Impressions",
  icon: ImpressionIcon,
  metricName: "impressions",
  dailyMetricName: "daily_impressions",
};

export const CLICKS = {
  key: 2,
  name: "Clicks",
  icon: ClickIcon,
  metricName: "clicks",
  dailyMetricName: "daily_clicks",
};

export const CTR = {
  key: 3,
  name: "CTR",
  icon: ConversionIcon,
  metricName: "ctr",
  dailyMetricName: "daily_ctrs",
};

export const SALES = {
  key: 4,
  name: "Sales",
  icon: SaleIcon,
  metricName: "sales",
  dailyMetricName: "daily_sales",
};

export const TOTAL_SALES = {
  key: 5,
  name: "Total sales",
  icon: SaleIcon,
  metricName: "total_sales",
  dailyMetricName: "daily_total_sales",
};

export const CONVERSIONS = {
  key: 6,
  name: "Conversions",
  icon: ConversionIcon,
  metricName: "cr",
  dailyMetricName: "daily_crs",
};

export const METRICS = [
  IMPRESSIONS,
  CLICKS,
  CTR,
  SALES,
  TOTAL_SALES,
  CONVERSIONS,
];

export const WIDGET_TYPES = [
  {
    key: "cross_sell",
    name: "Cross sell",
  },
  {
    key: "upsell",
    name: "Upsell",
  },
];

export const INITIAL_DATA = {
  [Moment().add(-6, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().add(-5, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().add(-4, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().add(-3, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().add(-2, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().add(-1, "days").format("YYYY-MM-DD").toString()]: 0,
  [Moment().format("YYYY-MM-DD").toString()]: 0,
};

export const INITIAL_SHOPACTIVITIES = {
  impressions: {
    upsell: 0,
    cross_sell: 0,
  },
  clicks: {
    upsell: 0,
    cross_sell: 0,
  },
  total_sales: {
    upsell: 0,
    cross_sell: 0,
  },
  sales: {
    upsell: 0,
    cross_sell: 0,
  },
  ctr: {
    upsell: 0,
    cross_sell: 0,
  },
  cr: {
    upsell: 0,
    cross_sell: 0,
  },
  daily_impressions: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
  daily_clicks: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
  daily_total_sales: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
  daily_sales: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
  daily_ctrs: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
  daily_crs: {
    upsell: INITIAL_DATA,
    cross_sell: INITIAL_DATA,
  },
};
