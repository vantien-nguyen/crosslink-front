import { useCookies } from "react-cookie";

import { PERCENTAGE } from "../../constant/Constant";
import { CrossSellDiscount, CrossSellWidget } from "../../types/CrossSell";

interface Props {
  crossSellWidget: CrossSellWidget;
}

const PreviewCrossSellWidget = ({ crossSellWidget }: Props) => {
  const [cookies] = useCookies(["shopName", "logoUrl"]);
  const crossSellProducts = crossSellWidget.detailed_products;

  const hasDiscount = () => {
    if (!crossSellWidget.discount) {
      return false;
    } else if (Number(crossSellWidget.discount.value) === 0) {
      return false;
    }
    return true;
  };

  const discountTitle = (discount: CrossSellDiscount | null) => {
    if (discount) {
      return `${discount.value} ${discount.value_type === PERCENTAGE ? "%" : "€"} offered with the code: ${discount.code}`;
    }
    return "";
  };

  const finalPrice = (
    originalPrice: number,
    discount: CrossSellDiscount | null,
  ) => {
    if (!discount) {
      return "";
    }
    if (discount.value_type === PERCENTAGE) {
      return `${(originalPrice * (1 - discount.value / 100)).toFixed(2)}€`;
    } else {
      return `${Math.max(originalPrice - discount.value, 0)}€`;
    }
  };

  return (
    <>
      <div className="w-full inline-flex mb-10">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">
          Preview
        </h2>
      </div>
      <div className="border border-gray-300 mb-4 rounded-md p-4">
        <h1 className="text-lg font-bold text-black dark:text-white">
          'Customer first name', before leaving us ...
        </h1>
        <span className="text-sm">
          We would like you to discover our partners. We were seduced by their
          products which share our values.
        </span>
        <div className="border-t my-2"></div>
        <div className="my-4 inline-flex">
          <img
            className="h-8 w-8 rounded-full mr-2"
            src={cookies.logoUrl}
            alt="user photo"
          />
          <span className="font-bold mt-1 ml-1">{cookies.shopName}</span>
        </div>
        <div>
          <span className="text-sm">
            {discountTitle(crossSellWidget.discount)}
          </span>
        </div>
        <div className="mt-4 flex flex-row gap-1 md:gap-2 overflow-x-auto">
          {crossSellProducts.slice(0, 3).map((product) => {
            return (
              <div
                className="max-w-24 max-h-48 md:max-w-32 md:max-h-64"
                key={product.id}
              >
                <img
                  className="max-w-24 max-h-24 md:max-h-32 md:max-w-32 rounded-t-lg "
                  src={product.image_url}
                />
                <div className="rounded-b-lg bg-gray-100 p-2">
                  <p className="text-xs truncate font-bold">
                    {product.shortened_title}
                  </p>
                  <div className="inline-flex">
                    <p
                      className={`text-xs ${hasDiscount() && "line-through text-gray-500"}`}
                    >
                      {product.price}&euro;
                    </p>
                    <p className="text-xs ml-1">
                      {finalPrice(product.price, crossSellWidget.discount)}
                    </p>
                  </div>
                  <p className="text-xs font-bold text-gray-400">{"Voir >"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="my-4 text-xs font-bold">Powered by Crosslink</p>
      </div>
    </>
  );
};

export default PreviewCrossSellWidget;
