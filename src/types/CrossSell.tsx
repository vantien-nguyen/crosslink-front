import { Product } from './Product';

export type CrossSellDiscount = {
  shop: number;
  id: number | null;
  cms_discount_id: string;
  code: string;
  value: number;
  value_type: string;
  start_date: string;
  end_date: string;
  status: string;
};

export type CrossSellWidget = {
  id: number | null;
  shop: number;
  name: string;
  cms_product_ids: string[];
  detailed_products: Product[];
  status: string;
  discount: CrossSellDiscount | null;
};
