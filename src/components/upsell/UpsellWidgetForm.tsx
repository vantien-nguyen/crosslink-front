import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Upsell from '../../pages/upsell/Upsell';
import { changeView } from '../../reducers/SidebarSlice';
import { UpsellWidget } from '../../types/Upsell';
import DiscountSelection from '../discount/DiscountSelection';
import InputProduct from '../product/InputProduct';
import InputProducts from '../product/InputProducts';
import Input from '../ui/Input';

interface Props {
  title: string;
  upsellWidget: UpsellWidget;
  errorMessage: string;
  setUpsellWidget: (value: any) => void;
  openProductModel: (value: boolean) => void;
  handleCreateWidget?: (event: any) => void;
  handleEditWidget?: (event: any) => void;
}

const UpsellWidgetForm = ({
  title,
  upsellWidget,
  errorMessage,
  setUpsellWidget,
  openProductModel,
  handleCreateWidget,
  handleEditWidget,
}: Props) => {
  const dispatch = useDispatch();
  const [activeDiscount, setActiveDiscount] = useState(
    upsellWidget.discount_value > 0,
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpsellWidget((upsellWidget: any) => ({
      ...upsellWidget,
      [name]: value,
    }));
  };

  const handleChangeDiscount = (event: any) => {
    const { name, value } = event.target;

    if (name === 'activeDiscount' && !event.target.checked) {
      setUpsellWidget({
        ...upsellWidget,
        ['discount_value']: 0,
      });
    } else
      setUpsellWidget({
        ...upsellWidget,
        [name]: value,
      });
  };

  return (
    <>
      <div className="w-full inline-flex mb-4">
        <h2 className="w-2/3 text-xl font-semibold text-gray-600 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="mb-4">
        <Input
          id="upsellName"
          label="Name: "
          type="text"
          name="name"
          required={false}
          value={upsellWidget.name}
          placeholder="Enter Your Upsell Name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          id="offerName"
          label="Offer Name: "
          type="text"
          name="offer_name"
          required={false}
          value={upsellWidget.offer_name}
          placeholder="Enter Your Offer Name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          id="offerDescription"
          label="Offer Description: "
          type="text"
          name="offer_description"
          required={false}
          value={upsellWidget.offer_description}
          placeholder="Enter Your Offer Description"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <InputProduct
          id="upsellProduct"
          label="Upsell Product:"
          errorMessage={errorMessage}
          selectedProduct={upsellWidget.detailed_upsell_product}
          placeholder="Select Upsell Product"
          onClick={() => openProductModel(false)}
        />
      </div>
      <div className="mb-4">
        <InputProducts
          id="triggerProduct"
          label="Trigger Products:"
          selectedProducts={upsellWidget.detailed_trigger_products}
          totalSelected={true}
          placeholder="Select Trigger Products"
          onClick={() => openProductModel(true)}
        />
      </div>
      <div className="inline-flex">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Discount:
        </label>
        <label className="ml-2 mb-1 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            name={'activeDiscount'}
            checked={activeDiscount}
            onChange={() => setActiveDiscount(!activeDiscount)}
          />
          <div
            className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700
              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute
              after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300
              after:border after:rounded-full after:h-4 after:w-4 after:transition-all
              dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
      {activeDiscount && (
        <div className="mb-4">
          <DiscountSelection
            discount_value={upsellWidget.discount_value}
            discount_type={upsellWidget.discount_type}
            handleChangeDiscount={handleChangeDiscount}
          />
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white
            rounded-md py-1.5 px-4 border border-blue-500 hover:border-transparent"
          onClick={() => {
            dispatch(changeView(<Upsell />));
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-1.5 px-4"
          onClick={handleCreateWidget ? handleCreateWidget : handleEditWidget}
        >
          {handleCreateWidget ? 'Create' : 'Edit'}
        </button>
      </div>
    </>
  );
};

export default UpsellWidgetForm;
