import EMPTY_IMG_URL from '../../assets/images/Empty.png';
import { NONE, PERCENTAGE } from '../../constant/Constant';
import { UpsellWidget } from '../../types/Upsell';

interface Props {
  upsellWidget: UpsellWidget;
}

const PreviewUpsellWidget = ({ upsellWidget }: Props) => {
  const upsellProduct = upsellWidget.detailed_upsell_product;

  const hasDiscount = () => {
    if (upsellWidget.discount_type === NONE) {
      return false;
    } else if (Number(upsellWidget.discount_value) === 0) {
      return false;
    }
    return true;
  };

  const finalPrice = () => {
    if (!upsellProduct) {
      return 0;
    }

    if (!hasDiscount()) {
      return upsellProduct?.price;
    }
    const discountValue = Number(upsellWidget.discount_value);

    if (upsellWidget.discount_type == PERCENTAGE) {
      return (upsellProduct.price * (1 - discountValue / 100)).toFixed(2);
    }

    return Math.max(upsellProduct.price - discountValue, 0);
  };

  return (
    <>
      <div className="w-full inline-flex mb-10">
        <h2 className="w-2/3 text-xl font-semibold text-gray-600 dark:text-white">
          Preview
        </h2>
      </div>
      <div className="text-center border-y border-gray-300 bg-gray-100 mb-4">
        <h1 className="text-lg font-medium text-gray-700 dark:text-white my-2">
          {upsellWidget.offer_name}
        </h1>
        <p className="text-base font-medium text-gray-600 dark:text-white my-2">
          {upsellWidget.offer_description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="w-full">
          <div className="mt-2 max-w-40 max-h-40 w-full align-center ">
            <img
              className="object-fit"
              src={upsellProduct ? upsellProduct.image_url : EMPTY_IMG_URL}
            />
          </div>
          <div className="mt-12 border-t pt-4 inline-flex gap-3">
            {upsellProduct &&
              upsellProduct.image_urls
                .slice(0, 4)
                .map((image_url: string, id: number) => {
                  return (
                    <img key={id} src={image_url} className="w-1/5 h-1/5" />
                  );
                })}
          </div>
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white mb-2 truncate">
            {upsellProduct ? upsellProduct.shortened_title : ''}
          </h1>
          <div className="inline-flex">
            <p
              className={`text-sm font-semibold text-gray-900 dark:text-white mb-4 ${
                hasDiscount() && 'line-through'
              }`}
            >
              &euro;{upsellProduct ? upsellProduct.price : ''}
            </p>
            {hasDiscount() && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 ml-2">
                &euro;{finalPrice()}
              </p>
            )}
          </div>
          <div
            className="border-t border-gray-300 w-full inline-flex text-sm font-semibold text-gray-500
              dark:text-white mb-1"
          >
            <span>Subtotal</span>
            <p className="text-right w-full">
              &euro;{upsellProduct ? upsellProduct.price : '0'}
            </p>
          </div>
          <div className="w-full inline-flex text-sm font-semibold text-gray-500 dark:text-white mb-1">
            <span>Shipping</span>
            <p className="text-right w-full">Free</p>
          </div>
          <div className="w-full inline-flex text-sm font-semibold text-gray-500 dark:text-white mb-3">
            <span>Taxes</span>
            <p className="text-right w-full">Free</p>
          </div>
          <div
            className="border-t border-gray-300 w-full inline-flex text-sm font-semibold text-gray-900
              dark:text-white mb-4"
          >
            <span>Total</span>
            <p className="text-right w-full">
              &euro;{upsellProduct ? upsellProduct.price : '0'}
            </p>
          </div>
          <div>
            <button
              className="mb-1 w-full bg-blue-500 hover:bg-blue-700 font-normal text-white font-bold py-1
                px-3 rounded"
            >
              PAY NOW . &euro;{upsellProduct ? finalPrice() : '0'}
            </button>
            <button
              className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-normal
                hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent
                rounded"
            >
              DECLINE THIS OFFER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewUpsellWidget;
