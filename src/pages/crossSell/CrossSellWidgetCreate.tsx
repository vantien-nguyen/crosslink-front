import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { createCrossSellWidget } from "../../api/CrossSellAPIs";
import CrossSellWidgetForm from "../../components/crossSell/CrossSellWidgetForm";
import PreviewCrossSellWidget from "../../components/crossSell/PreviewCrossSellWidget";
import ProductModal from "../../components/product/ProductModal";
import Loading from "../../components/ui/Loading";
import Toast from "../../components/ui/Toast";
import { ERROR, SUCCESS } from "../../constant/Constant";
import { changeLoading, changeMessage } from "../../reducers/ActionSlice";
import { changeView } from "../../reducers/SidebarSlice";
import { RootState } from "../../store";
import { CrossSellWidget } from "../../types/CrossSell";
import { Product } from "../../types/Product";

import CrossSell from "./CrossSell";

const CrossSellWidgetCreate = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["shopId"]);
  const [crossSellWidget, setCrossSellWidget] = useState<CrossSellWidget>({
    id: null,
    shop: cookies.shopId,
    name: "",
    cms_product_ids: [],
    detailed_products: [],
    status: "active",
    discount: null,
  });
  const [checkedProducts, setCheckedProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [errorProductMsg, setErrorProductMsg] = useState("");
  const [errorDiscountMsg, setErrorDiscountMsg] = useState("");
  const message = useSelector((state: RootState) => state.action.message);
  const loading = useSelector((state: RootState) => state.action.loading);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openProductModel = () => {
    setCheckedProducts(crossSellWidget.detailed_products);
    handleOpen();
  };

  const handleSubmitProducts = () => {
    setCrossSellWidget((crossSellWidget: any) => ({
      ...crossSellWidget,
      cms_product_ids: checkedProducts.map((product) => product.cms_product_id),
      detailed_products: checkedProducts,
    }));
    handleClose();
  };

  const createCrossSellWidgetMutation = useMutation({
    mutationFn: createCrossSellWidget,
    onSuccess: () => {
      dispatch(changeView(<CrossSell />));
      dispatch(
        changeMessage({
          content: "Cross sell widget created!",
          type: SUCCESS,
        }),
      );
      dispatch(changeLoading(false));
    },
    onError: (error) => {
      dispatch(
        changeMessage({
          content: error.message,
          type: ERROR,
        }),
      );
      dispatch(changeLoading(false));
    },
  });

  const handleCreateWidget = (event: { preventDefault: () => void }) => {
    if (crossSellWidget.cms_product_ids.length === 0) {
      setErrorProductMsg("Please select Cross sell product.");
    } else if (
      crossSellWidget.discount &&
      (crossSellWidget.discount.value === 0 ||
        Number(crossSellWidget.discount.value) === 0)
    ) {
      setErrorDiscountMsg("Discount value must be greater than 0.");
    } else {
      dispatch(changeLoading(true));
      setErrorProductMsg("");
      setErrorDiscountMsg("");
      event.preventDefault();

      createCrossSellWidgetMutation.mutate(crossSellWidget);
    }
  };

  return (
    <div
      className={`max-w-full mx-4 md:mx-8 lg:mx-16 ${loading && "relative block"}`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 ${loading && "opacity-15"}`}
      >
        {open && (
          <ProductModal
            handleClose={handleClose}
            checkedProducts={checkedProducts}
            setCheckedProducts={setCheckedProducts}
            handleSubmitProducts={handleSubmitProducts}
            multipleSelection={true}
          />
        )}

        <div className="max-w-lg bg-white p-5 rounded-lg shadow-lg">
          <CrossSellWidgetForm
            title={"Create Cross-sell"}
            crossSellWidget={crossSellWidget}
            errorProductMsg={errorProductMsg}
            errorDiscountMsg={errorDiscountMsg}
            setCrossSellWidget={setCrossSellWidget}
            openProductModel={openProductModel}
            handleCreateWidget={handleCreateWidget}
          />
        </div>

        <div className="max-w-full bg-white p-5 rounded-lg shadow-lg">
          <PreviewCrossSellWidget crossSellWidget={crossSellWidget} />
        </div>
      </div>
      {message.content && <Toast />}
      {loading && <Loading />}
    </div>
  );
};

export default CrossSellWidgetCreate;
