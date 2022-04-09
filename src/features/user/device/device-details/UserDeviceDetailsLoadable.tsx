import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserDeviceDetailsLoadable = loadable(
  () => import("./UserDeviceDetails"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default UserDeviceDetailsLoadable;
