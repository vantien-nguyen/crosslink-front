// export type ShopActivity = {
//   impressions: number,
//   clicks: number,
//   total_sales: number,
//   sales: number,
//   ctr: number,
//   cr: number,
//   daily_metrics: number[]
// }

export type ShopActivity = {
  impressions: {
    upsell: number;
    cross_sell: number;
  };
  clicks: {
    upsell: number;
    cross_sell: number;
  };
  total_sales: {
    upsell: number;
    cross_sell: number;
  };
  sales: {
    upsell: number;
    cross_sell: number;
  };
  ctr: {
    upsell: number;
    cross_sell: number;
  };
  cr: {
    upsell: number;
    cross_sell: number;
  };
  daily_impressions: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
  daily_clicks: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
  daily_total_sales: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
  daily_sales: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
  daily_ctrs: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
  daily_crs: {
    upsell: {
      [key: string]: number;
    };
    cross_sell: {
      [key: string]: number;
    };
  };
};
