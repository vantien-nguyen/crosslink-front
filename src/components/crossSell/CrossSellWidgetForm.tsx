import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { PERCENTAGE } from "../../constant/Constant";
import CrossSell from "../../pages/crossSell/CrossSell";
import { changeView } from "../../reducers/SidebarSlice";
import { CrossSellWidget } from "../../types/CrossSell";
import DiscountSelection from "../discount/DiscountSelection";
import InputProducts from "../product/InputProducts";
import Input from "../ui/Input";

type Props = {
  title: string;
  crossSellWidget: CrossSellWidget;
  errorProductMsg: string;
  errorDiscountMsg: string;
  openProductModel: (value: boolean) => void;
  setCrossSellWidget: (value: any) => void;
  handleCreateWidget?: (event: any) => void;
  handleEditWidget?: (event: any) => void;
};

const CrossSellWidgetForm = ({
  title,
  crossSellWidget,
  errorProductMsg,
  errorDiscountMsg,
  openProductModel,
  setCrossSellWidget,
  handleCreateWidget,
  handleEditWidget,
}: Props) => {
  const dispatch = useDispatch();
  const [activeDiscount, setActiveDiscount] = useState(
    crossSellWidget.discount !== null,
  );
  const handleChangeDiscount = (event: any) => {
    const { name, value } = event.target;
    const discountKey =
      name === "code"
        ? "code"
        : name === "discount_type"
          ? "value_type"
          : "value";

    setCrossSellWidget({
      ...crossSellWidget,
      discount: {
        ...crossSellWidget.discount,
        [discountKey]: value,
      },
    });
  };

  const changeActiveDiscount = (event: any) => {
    setActiveDiscount(!activeDiscount);
    if (event.target.checked) {
      setCrossSellWidget({
        ...crossSellWidget,
        discount: {
          code: "",
          value: 0,
          value_type: PERCENTAGE,
          shop: crossSellWidget.shop,
          status: "active",
          id: null,
          cms_discount_id: null,
          start_date: null,
          end_date: null,
        },
      });
    } else {
      setCrossSellWidget({
        ...crossSellWidget,
        discount: null,
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCrossSellWidget((crossSellWidget: any) => ({
      ...crossSellWidget,
      [name]: value,
    }));
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
          id="crossSellName"
          label="Name: "
          type="text"
          name="name"
          required={false}
          value={crossSellWidget.name}
          placeholder="Enter Your Cross sell Name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <InputProducts
          id="products"
          label="Products:"
          errorMessage={errorProductMsg}
          selectedProducts={crossSellWidget.detailed_products}
          totalSelected={true}
          placeholder="Select Cross Sell Products"
          limitedProducts={10}
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
            name={"activeDiscount"}
            checked={activeDiscount}
            onChange={changeActiveDiscount}
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
        <div>
          <div className="mb-4">
            <Input
              id="code"
              label="Code"
              type="text"
              name="code"
              value={
                crossSellWidget.discount ? crossSellWidget.discount?.code : ""
              }
              placeholder="Enter Your Code"
              onChange={handleChangeDiscount}
            />
          </div>
          <div className="mb-4">
            <DiscountSelection
              label="Discount Value"
              errorMessage={errorDiscountMsg}
              discount_value={
                crossSellWidget.discount ? crossSellWidget.discount.value : 0
              }
              discount_type={
                crossSellWidget.discount
                  ? crossSellWidget.discount.value_type
                  : PERCENTAGE
              }
              handleChangeDiscount={handleChangeDiscount}
            />
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white
            py-1 px-3 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            dispatch(changeView(<CrossSell />));
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          onClick={handleCreateWidget ? handleCreateWidget : handleEditWidget}
        >
          {handleCreateWidget ? "Create" : "Edit"}
        </button>
      </div>
    </>
  );
};

export default CrossSellWidgetForm;
