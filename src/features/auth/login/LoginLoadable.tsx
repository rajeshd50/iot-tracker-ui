import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const LoginLoadable = loadable(() => import("./Login"), {
  fallback: <FullScreenLoader />,
});

export default LoginLoadable;
