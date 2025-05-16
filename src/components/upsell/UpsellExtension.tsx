import { useQuery } from '@tanstack/react-query';

import { checkUpsellExtension } from '../../api/UpsellAPIs';
import InfoIcon from '../../assets/icons/info.svg';

interface Props {
  shopUrl: string;
}

const UpsellExtension = ({ shopUrl }: Props) => {
  const {
    data: upsellExtension,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['upsellExtension'],
    queryFn: () => checkUpsellExtension(shopUrl),
  });

  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <div>
      {!upsellExtension?.app_in_use && (
        <div className="w-full mt-2 mb-4 bg-sky-50 p-4 flex rounded-lg shadow-sm border border-cyan-600">
          <img className="ml-1 mr-4 mt-0.5 h-4" src={InfoIcon}></img>
          <div>
            <label className="block text-sm font-medium text-red-600">
              Upsell - setup checkout extension
            </label>
            <label className="block text-sm text-red-600">
              Please follow this link bellow go to enable your post-purchase app
              in the Checkout settings.
            </label>
            <a
              target="_blank"
              href={`https://${shopUrl}/admin/settings/checkout`}
              className="text-sm font-medium hover:text-blue-500"
            >
              {`https://${shopUrl}/admin/settings/checkout`}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellExtension;
