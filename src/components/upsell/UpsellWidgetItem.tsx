import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { editUpsellWidget } from "../../api/UpsellAPIs";
import ChartIcon from "../../assets/icons/chart.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { ERROR, SUCCESS } from "../../constant/Constant";
import UpsellWidgetEdit from "../../pages/upsell/UpsellWidgetEdit";
import { changeMessage } from "../../reducers/ActionSlice";
import { changeView } from "../../reducers/SidebarSlice";
import { UpsellWidget } from "../../types/Upsell";
import { calculateFinalPrice } from "../../utils";
import Toggle from "../ui/Toggle";

type Props = {
  widget: UpsellWidget;
  deleteUpsellWidget: (id: number | null) => void;
};

export default function UpsellWidgetItem({
  widget,
  deleteUpsellWidget,
}: Props) {
  const [upsellWidget, setUpsellWidget] = useState(widget);
  const dispatch = useDispatch();

  const updateUpsellWidgetStatusMutation = useMutation({
    mutationFn: editUpsellWidget,
    onSuccess: (newUpsellWidget) => {
      setUpsellWidget(newUpsellWidget);
      const message = `Upsell widget ${newUpsellWidget.status === "active" ? "activated!" : "deactivated!"}`;

      dispatch(
        changeMessage({
          content: message,
          type: SUCCESS,
        }),
      );
    },
    onError: (error) => {
      dispatch(
        changeMessage({
          content: error.message,
          type: ERROR,
        }),
      );
    },
  });

  function handleUpdateWidgetStatus(event: any) {
    const upsellWidgetUpdate = {
      ...upsellWidget,
      status: event.target.checked ? "active" : "inactive",
    };

    updateUpsellWidgetStatusMutation.mutate(upsellWidgetUpdate);
  }

  function handleEditUpsellWidget() {
    dispatch(changeView(<UpsellWidgetEdit widget={upsellWidget} />));
  }

  return (
    <>
      <div
        className="grid grid-cols-1 items-center gap-2 bg-white border border-gray-200 rounded-lg
          shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-6 md:px-8"
      >
        <div className="flex flex-row justify-between">
          <div className="justify-start w-full font-bold truncate">
            {upsellWidget.name}
          </div>
          <Toggle
            className="justify-end"
            checked={upsellWidget.status === "active"}
            onChange={handleUpdateWidgetStatus}
          />
        </div>

        <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-400 truncate">
          {upsellWidget.detailed_upsell_product?.title}
        </div>

        <div className="inline-flex mb-2 overflow-hidden gap-2">
          {upsellWidget.detailed_upsell_product?.image_urls
            .slice(0, 4)
            .map((image_url, key) => {
              return (
                <img
                  key={key}
                  className="max-w-16 max-h-16 object-fill rounded-lg border"
                  src={image_url}
                />
              );
            })}
        </div>

        <div className="inline-flex">
          <p
            className={`float-left text-sm font-semibold dark:text-gray-400 ${
              upsellWidget.discount_value > 0
                ? "line-through text-gray-500"
                : "text-gray-700"
            }`}
          >
            €{upsellWidget.detailed_upsell_product?.price}
          </p>
          {upsellWidget.discount_value > 0 && (
            <p className="ml-3 text-sm font-semibold text-gray-700 dark:text-gray-400">
              €
              {calculateFinalPrice(
                upsellWidget.detailed_upsell_product
                  ? upsellWidget.detailed_upsell_product.price
                  : 0,
                upsellWidget.discount_type,
                upsellWidget.discount_value,
              )}
            </p>
          )}
        </div>

        <div className="flex flex-row border-t pt-4 justify-end">
          <button
            className="mr-3"
            onClick={() => {
              console.log("dahsboard");
            }}
          >
            <div className="flex items-center">
              <img
                className="max-w-8 max-h-8 hover:scale-125"
                src={ChartIcon}
              ></img>
            </div>
          </button>

          <button className="mr-2" onClick={handleEditUpsellWidget}>
            <div className="flex items-center">
              <img
                className="max-w-8 max-h-8 hover:scale-125"
                src={EditIcon}
              ></img>
            </div>
          </button>

          <button
            className=""
            onClick={() => deleteUpsellWidget(upsellWidget.id)}
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
    </>
  );
}
