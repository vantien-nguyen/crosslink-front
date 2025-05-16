import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { createUpsellWidget } from '../../api/UpsellAPIs';
import ProductModal from '../../components/product/ProductModal';
import Loading from '../../components/ui/Loading';
import Toast from '../../components/ui/Toast';
import PreviewUpsellWidget from '../../components/upsell/PreviewUpsellWidget';
import UpsellWidgetForm from '../../components/upsell/UpsellWidgetForm';
import { ERROR, PERCENTAGE, SUCCESS } from '../../constant/Constant';
import { changeLoading, changeMessage } from '../../reducers/ActionSlice';
import { changeView } from '../../reducers/SidebarSlice';
import { RootState } from '../../store';
import { Product } from '../../types/Product';
import { UpsellWidget } from '../../types/Upsell';

import Upsell from './Upsell';

export default function UpsellWidgetCreate() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['shopId']);
  const [upsellWidget, setUpsellWidget] = useState<UpsellWidget>({
    id: null,
    shop: cookies.shopId,
    name: '',
    offer_name: "Hello, It's not too late to add this to your order",
    offer_description: 'Exclusive offer will be expired soon',
    upsell_product_id: '',
    detailed_upsell_product: null,
    trigger_product_ids: [],
    detailed_trigger_products: [],
    discount_type: PERCENTAGE,
    discount_value: 0,
    status: 'active',
  });
  const [open, setOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState<any>([]);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loading = useSelector((state: RootState) => state.action.loading);
  const message = useSelector((state: RootState) => state.action.message);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openProductModel = (multipleSelection: boolean) => {
    setCheckedProducts(
      multipleSelection
        ? upsellWidget.detailed_trigger_products
        : upsellWidget.detailed_upsell_product
          ? [upsellWidget.detailed_upsell_product]
          : [],
    );
    setMultipleSelection(multipleSelection);
    handleOpen();
  };

  const handleSubmitProducts = () => {
    if (multipleSelection) {
      const trigger_product_ids = checkedProducts.map(
        (product: Product) => product.cms_product_id,
      );

      setUpsellWidget(upsellWidget => ({
        ...upsellWidget,
        ['trigger_product_ids']: trigger_product_ids,
        ['detailed_trigger_products']: checkedProducts,
      }));
    } else {
      const upsell_product_id = checkedProducts[0]?.cms_product_id;

      setUpsellWidget(upsellWidget => ({
        ...upsellWidget,
        ['upsell_product_id']: upsell_product_id,
        ['detailed_upsell_product']: checkedProducts[0],
      }));
    }
    handleClose();
  };

  const createUpsellWidgetMutation = useMutation({
    mutationFn: createUpsellWidget,
    onSuccess: () => {
      dispatch(changeView(<Upsell />));
      dispatch(
        changeMessage({
          content: 'Upsell widget created!',
          type: SUCCESS,
        }),
      );
      dispatch(changeLoading(false));
    },
    onError: error => {
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
    if (!upsellWidget.detailed_upsell_product) {
      setErrorMessage('Please select upsell product.');
    } else {
      dispatch(changeLoading(true));
      setErrorMessage('');
      event.preventDefault();
      const upsellWidgetCreate = {
        ...upsellWidget,
        ['discount_value']: !upsellWidget.discount_value
          ? 0
          : upsellWidget.discount_value,
      };

      createUpsellWidgetMutation.mutate(upsellWidgetCreate);
    }
  };

  return (
    <div
      className={`max-w-full mx-4 md:mx-8 lg:mx-16 ${loading && 'relative block'}`}
    >
      {createUpsellWidgetMutation.isError ? (
        <p>{createUpsellWidgetMutation.error.message}</p>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 ${loading && 'opacity-15'}`}
        >
          {open && (
            <ProductModal
              handleClose={handleClose}
              checkedProducts={checkedProducts}
              setCheckedProducts={setCheckedProducts}
              handleSubmitProducts={handleSubmitProducts}
              multipleSelection={multipleSelection}
            />
          )}

          <div className="max-w-lg bg-white p-5 rounded shadow-lg">
            <UpsellWidgetForm
              title={'Create Upsell'}
              upsellWidget={upsellWidget}
              errorMessage={errorMessage}
              setUpsellWidget={setUpsellWidget}
              openProductModel={openProductModel}
              handleCreateWidget={handleCreateWidget}
            />
          </div>

          <div className="max-w-full bg-white p-5 rounded shadow-lg">
            <PreviewUpsellWidget upsellWidget={upsellWidget} />
          </div>
        </div>
      )}
      {message.content && <Toast />}
      {loading && <Loading />}
    </div>
  );
}
