import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminFirmwareLoadable = loadable(() => import("./AdminFirmware"), {
  fallback: <FullScreenLoader />,
});

export default AdminFirmwareLoadable;
