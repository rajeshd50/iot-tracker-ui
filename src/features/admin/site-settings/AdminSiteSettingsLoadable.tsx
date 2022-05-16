import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const AdminSiteSettingsLoadable = loadable(
  () => import("./AdminSiteSettings"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default AdminSiteSettingsLoadable;
