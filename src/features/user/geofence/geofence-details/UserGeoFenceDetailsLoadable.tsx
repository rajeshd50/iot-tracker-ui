import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserGeoFenceDetailsLoadable = loadable(
  () => import("./UserGeoFenceDetails"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default UserGeoFenceDetailsLoadable;
