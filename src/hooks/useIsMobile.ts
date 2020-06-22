import { useMedia } from "react-media";
import { screen } from "../configs";

const { MOBILE_RESOLUTION } = screen;

const useIsMobile = () => {
  const isSmallScreen = useMedia({ query: MOBILE_RESOLUTION });
  return isSmallScreen
};

export default useIsMobile;