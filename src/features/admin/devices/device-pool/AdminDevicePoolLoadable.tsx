import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminDevicePoolLoadable = loadable(() => import("./AdminDevicePool"), {
  fallback: <FullScreenLoader />,
});

export default AdminDevicePoolLoadable;
