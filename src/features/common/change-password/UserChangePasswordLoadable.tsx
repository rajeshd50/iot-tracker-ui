import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const UserChangePasswordLoadable = loadable(
  () => import("./UserChangePassword"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default UserChangePasswordLoadable;
