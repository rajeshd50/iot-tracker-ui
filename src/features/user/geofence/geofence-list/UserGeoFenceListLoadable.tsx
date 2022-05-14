import loadable from "@loadable/component";
import FullScreenLoader from "../../../../common/pages/full-screen-loader/FullScreenLoader";

const UserGeoFenceListLoadable = loadable(() => import("./UserGeoFenceList"), {
  fallback: <FullScreenLoader />,
});

export default UserGeoFenceListLoadable;
