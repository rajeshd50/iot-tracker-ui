import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminUserListLoadable = loadable(() => import("./AdminUserList"), {
  fallback: <FullScreenLoader />,
});

export default AdminUserListLoadable;
