import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const UserDashboardLoadable = loadable(() => import("./UserDashboard"), {
  fallback: <FullScreenLoader />,
});

export default UserDashboardLoadable;
