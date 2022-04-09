import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const ForgetPasswordLoadable = loadable(() => import("./ForgetPassword"), {
  fallback: <FullScreenLoader />,
});

export default ForgetPasswordLoadable;
