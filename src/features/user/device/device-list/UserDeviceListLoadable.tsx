import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserDeviceListLoadable = loadable(() => import("./UserDeviceList"), {
  fallback: <FullScreenLoader />,
});

export default UserDeviceListLoadable;
