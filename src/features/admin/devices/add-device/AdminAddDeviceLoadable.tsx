import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminAddDeviceLoadable = loadable(() => import("./AdminAddDevice"), {
  fallback: <FullScreenLoader />,
});

export default AdminAddDeviceLoadable;
