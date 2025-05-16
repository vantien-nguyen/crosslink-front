import { Product } from './Product';

export type UpsellWidget = {
  id: number | null;
  shop: number;
  name: string;
  offer_name: string;
  offer_description: string;
  upsell_product_id: string;
  detailed_upsell_product: Product | null;
  trigger_product_ids: string[];
  detailed_trigger_products: Product[];
  discount_value: number;
  discount_type: string;
  status: string;
};
