import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const ResetPasswordLoadable = loadable(() => import("./ResetPassword"), {
  fallback: <FullScreenLoader />,
});

export default ResetPasswordLoadable;
