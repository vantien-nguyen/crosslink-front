export type Product = {
  id: number;
  cms_product_id: string;
  title: string;
  shortened_title: string;
  description: string;
  image_url: string;
  image_urls: string[];
  inventory_quantity: number;
  price: number;
};
