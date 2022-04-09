import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminDeviceListLoadable = loadable(() => import("./AdminDeviceList"), {
  fallback: <FullScreenLoader />,
});

export default AdminDeviceListLoadable;
