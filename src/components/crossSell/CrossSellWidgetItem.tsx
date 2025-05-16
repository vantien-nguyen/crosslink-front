import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { editCrossSellWidgetStatus } from '../../api/CrossSellAPIs';
import ChartIcon from '../../assets/icons/chart.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import {
  ERROR,
  FIXED_AMOUNT,
  PERCENTAGE,
  SUCCESS,
} from '../../constant/Constant';
import CrossSellWidgetEdit from '../../pages/crossSell/CrossSellWidgetEdit';
import { changeMessage } from '../../reducers/ActionSlice';
import { changeView } from '../../reducers/SidebarSlice';
import { CrossSellWidget } from '../../types/CrossSell';
import Toggle from '../ui/Toggle';

type Props = {
  widget: CrossSellWidget;
  deleteCrossSellWidget: (id: number | null) => void;
};

export default function CrossSellWidgetItem({
  widget,
  deleteCrossSellWidget,
}: Props) {
  const [crossSellWidget, setCrossSellWidget] = useState(widget);
  const dispatch = useDispatch();

  function handleEditCrossSellWidget() {
    dispatch(changeView(<CrossSellWidgetEdit widget={crossSellWidget} />));
  }

  const editCrossSellWidgetMutation = useMutation({
    mutationFn: editCrossSellWidgetStatus,
    onSuccess: newCrossSellWidget => {
      setCrossSellWidget(newCrossSellWidget.widget);
      const message = `Cross sell widget ${newCrossSellWidget.status === 'active' ? 'activated!' : 'deactivated!'}`;

      dispatch(
        changeMessage({
          content: message,
          type: SUCCESS,
        }),
      );
    },
    onError: error => {
      dispatch(
        changeMessage({
          content: error.message,
          type: ERROR,
        }),
      );
    },
  });

  const handleUpdateWidgetStatus = async (event: any) => {
    const updatedWidget = {
      ...crossSellWidget,
      status: event.target.checked ? 'active' : 'inactive',
    };

    editCrossSellWidgetMutation.mutate(updatedWidget);
  };

  return (
    <div
      className="grid grid-cols-1 items-center gap-2 bg-white border border-gray-200 rounded-lg
        shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-6 md:px-8"
    >
      <div className="flex flex-row justify-between">
        <div className="justify-start w-full font-bold truncate">
          {crossSellWidget.name}
        </div>
        <Toggle
          className="justify-end"
          checked={crossSellWidget.status === 'active'}
          onChange={handleUpdateWidgetStatus}
        />
      </div>

      <div className="inline-flex my-2 overflow-hidden gap-2">
        {crossSellWidget.detailed_products?.slice(0, 4).map(product => {
          return (
            <img
              key={product.id}
              className="max-w-16 max-h-16 object-fill rounded-lg border"
              src={product.image_url}
            />
          );
        })}
      </div>

      <div className="inline-flex mb-2">
        {crossSellWidget.discount && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            {crossSellWidget.discount.value_type === FIXED_AMOUNT && '€'}
            {crossSellWidget.discount.value}
            {crossSellWidget.discount.value_type === PERCENTAGE && '%'}
            {' off '}
            {crossSellWidget.cms_product_ids.length}
            {' products'}
          </p>
        )}
      </div>

      <div className="flex flex-row border-t pt-4 justify-end">
        <button
          className="mr-3"
          onClick={() => {
            console.log('dahsboard');
          }}
        >
          <div className="flex items-center">
            <img
              className="max-w-8 max-h-8 hover:scale-125"
              src={ChartIcon}
            ></img>
          </div>
        </button>

        <button className="mr-2" onClick={handleEditCrossSellWidget}>
          <div className="flex items-center">
            <img
              className="max-w-8 max-h-8 hover:scale-125"
              src={EditIcon}
            ></img>
          </div>
        </button>

        <button
          className=""
          onClick={() => deleteCrossSellWidget(crossSellWidget.id)}
        >
          <div className="flex items-center">
            <img
              className="max-w-8 max-h-8 hover:scale-125"
              src={DeleteIcon}
            ></img>
          </div>
        </button>
      </div>
    </div>
  );
}
