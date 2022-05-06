import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminRecentPurchasesLoadable = loadable(
  () => import("./AdminRecentPurchases"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default AdminRecentPurchasesLoadable;
