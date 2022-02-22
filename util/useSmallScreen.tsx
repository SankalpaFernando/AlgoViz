import React,{useState,useEffect} from "react";

const useSmallScreen = ():boolean => {
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    setSmallScreen(window.outerWidth <= 600);
  }, [(typeof window !== "undefined") && window.outerWidth]);
  
  return smallScreen;
};

export default useSmallScreen;