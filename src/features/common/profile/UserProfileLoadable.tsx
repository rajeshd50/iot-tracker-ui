import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const UserProfileLoadable = loadable(() => import("./UserProfile"), {
  fallback: <FullScreenLoader />,
});

export default UserProfileLoadable;
