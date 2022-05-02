import loadable from "@loadable/component";
import FullScreenLoader from "../../../common/pages/full-screen-loader/FullScreenLoader";

const RegisterLoadable = loadable(() => import("./Register"), {
  fallback: <FullScreenLoader />,
});

export default RegisterLoadable;
