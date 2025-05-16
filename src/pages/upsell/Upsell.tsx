import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteUpsellWidget, getUpsellWidgets } from '../../api/UpsellAPIs';
import PlusIcon from '../../assets/icons/plus.svg';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import Pagination from '../../components/ui/Pagination';
import Toast from '../../components/ui/Toast';
import UpsellExtension from '../../components/upsell/UpsellExtension';
import UpsellWidgetItem from '../../components/upsell/UpsellWidgetItem';
import { ERROR, SUCCESS, WIDGET_LIMIT_PER_PAGE } from '../../constant/Constant';
import { changeMessage } from '../../reducers/ActionSlice';
import { changeView } from '../../reducers/SidebarSlice';
import { RootState } from '../../store';
import { UpsellWidget } from '../../types/Upsell';
import { documentTitle } from '../../utils';

import UpsellWidgetCreate from './UpsellWidgetCreate';

export default function Upsell() {
  documentTitle('Upsell');
  const dispatch = useDispatch();
  const [cookies] = useCookies(['shopId', 'shopUrl']);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = WIDGET_LIMIT_PER_PAGE * (currentPage - 1);
  const queryClient = useQueryClient();
  const message = useSelector((state: RootState) => state.action.message);

  const {
    data: upsellWidgets,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['upsellWidgets', currentPage],
    queryFn: () =>
      getUpsellWidgets(cookies.shopId, offset, WIDGET_LIMIT_PER_PAGE),
  });

  const deleteUpsellWidgetMutation = useMutation({
    mutationFn: deleteUpsellWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['upsellWidgets'] });
      dispatch(
        changeMessage({
          content: 'Upsell widget deleted!',
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

  function handleDeleteUpsellWidget(id: number | null) {
    if (id) {
      deleteUpsellWidgetMutation.mutate(id);
    } else {
      console.log('error');
    }
  }

  function handleOpenAddNewWidget() {
    dispatch(changeView(<UpsellWidgetCreate />));
  }

  if (isLoading) return <Loading />;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="max-w-full mx-4 md:mx-8 lg:mx-16">
      <Button
        className="my-4"
        icon={PlusIcon}
        name={'New widget'}
        onClick={handleOpenAddNewWidget}
      />
      <UpsellExtension shopUrl={cookies.shopUrl} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {upsellWidgets.results?.map((widget: UpsellWidget) => {
          return (
            <UpsellWidgetItem
              key={widget.id}
              widget={widget}
              deleteUpsellWidget={handleDeleteUpsellWidget}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={upsellWidgets.count}
          defaultItemsPerPage={WIDGET_LIMIT_PER_PAGE}
        />
        {message.content && <Toast />}
      </div>
    </div>
  );
}
