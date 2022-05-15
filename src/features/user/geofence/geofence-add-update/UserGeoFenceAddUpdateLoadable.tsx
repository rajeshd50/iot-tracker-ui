import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserGeoFenceAddUpdateLoadable = loadable(
  () => import("./UserGeoFenceAddUpdate"),
  {
    fallback: <FullScreenLoader />,
  }
);

export default UserGeoFenceAddUpdateLoadable;
