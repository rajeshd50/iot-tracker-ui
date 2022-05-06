import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserDeviceAddLoadable = loadable(() => import("./UserDeviceAdd"), {
  fallback: <FullScreenLoader />,
});

export default UserDeviceAddLoadable;
