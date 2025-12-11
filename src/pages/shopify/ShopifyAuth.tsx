import { loginShopify } from "../../api/Auth";
import PersistSignIn from "../signin/PersistSignIn";

export default function ShopifyAuth() {
  let view = <></>;
  let hmac;
  let host;
  let shop;
  let timestamp;

  const queryParams = new URLSearchParams(window.location.search);
  const queryParamsSize = Array.from(queryParams).length;

  if (queryParamsSize === 4 || queryParamsSize === 3) {
    hmac = queryParams.get("hmac");
    host = queryParams.get("host");
    shop = queryParams.get("shop");
    timestamp = queryParams.get("timestamp");
    console.log(queryParams);
    (async () => {
      const result = await loginShopify(
        `?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`,
      );

      console.log(result);
      window.location.replace(result.permission_url);
    })();
  } else {
    view = <PersistSignIn />;
  }

  return <div>{view}</div>;
}
