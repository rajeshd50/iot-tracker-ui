import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const VerifyEmailLoadable = loadable(() => import("./VerifyEmail"), {
  fallback: <FullScreenLoader />,
});

export default VerifyEmailLoadable;
