import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteCrossSellWidget,
  getCrossSellWidgets,
} from "../../api/CrossSellAPIs";
import PlusIcon from "../../assets/icons/plus.svg";
import CrossSellWidgetItem from "../../components/crossSell/CrossSellWidgetItem";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import Pagination from "../../components/ui/Pagination";
import Toast from "../../components/ui/Toast";
import {
  ERROR,
  PRODUCT_LIMIT_PER_PAGE,
  SUCCESS,
  WIDGET_LIMIT_PER_PAGE,
} from "../../constant/Constant";
import { changeMessage } from "../../reducers/ActionSlice";
import { changeView } from "../../reducers/SidebarSlice";
import { RootState } from "../../store";
import { CrossSellWidget } from "../../types/CrossSell";
import { documentTitle } from "../../utils";

import CrossSellWidgetCreate from "./CrossSellWidgetCreate";

export default function CrossSell() {
  documentTitle("Cross-sell");
  const dispatch = useDispatch();
  const [cookies] = useCookies(["shopId"]);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = PRODUCT_LIMIT_PER_PAGE * (currentPage - 1);
  const queryClient = useQueryClient();
  const message = useSelector((state: RootState) => state.action.message);

  const {
    data: crossSellWidgets,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["crossSellWidgets", currentPage],
    queryFn: () =>
      getCrossSellWidgets(cookies.shopId, offset, PRODUCT_LIMIT_PER_PAGE),
  });

  function handleOpenAddNewWidget() {
    dispatch(changeView(<CrossSellWidgetCreate />));
  }

  const deleteCrossSellWidgetMutation = useMutation({
    mutationFn: deleteCrossSellWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crossSellWidgets"] });
      dispatch(
        changeMessage({
          content: "Cross sell widget deleted!",
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

  function handleDeleteCrossSellWidget(id: number | null) {
    if (id) {
      deleteCrossSellWidgetMutation.mutate(id);
    } else {
      console.log("show error");
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="max-w-full mx-4 md:mx-8 lg:mx-16">
      <Button
        className="my-4"
        icon={PlusIcon}
        name={"New widget"}
        onClick={handleOpenAddNewWidget}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {crossSellWidgets.results?.map((widget: CrossSellWidget) => {
          return (
            <CrossSellWidgetItem
              key={widget.id}
              widget={widget}
              deleteCrossSellWidget={handleDeleteCrossSellWidget}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={crossSellWidgets.count}
          defaultItemsPerPage={WIDGET_LIMIT_PER_PAGE}
        />
        {message.content && <Toast />}
      </div>
    </div>
  );
}
