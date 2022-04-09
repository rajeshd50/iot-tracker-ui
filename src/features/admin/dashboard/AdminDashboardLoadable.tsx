import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminDashboardLoadable = loadable(() => import("./AdminDashboard"), {
  fallback: <FullScreenLoader />,
});

export default AdminDashboardLoadable;
