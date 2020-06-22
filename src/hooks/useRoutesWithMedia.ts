import useIsMobile from "./useIsMobile";
import { routes } from "../configs";
import { IRoute } from "../types";

const { COMMON_ROUTES_CONFIG, PC_ROUTES_CONFIG, H5_ROUTES_CONFIG } = routes;

const useRoutesWithMedia: () => Array<IRoute> = () => {
  const isMobile = useIsMobile();
  return [
    ...isMobile? H5_ROUTES_CONFIG: PC_ROUTES_CONFIG,
    ...COMMON_ROUTES_CONFIG
  ];
};

export default useRoutesWithMedia;