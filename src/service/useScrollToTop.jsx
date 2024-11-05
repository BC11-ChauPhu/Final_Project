import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const webLocation = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [webLocation]);
};

export default useScrollToTop;
