import { useState, useEffect } from "react";

export const useScreenWidth = () => {
  // Initialize screenWidth with a default value (e.g., 0) to handle server-side rendering
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Check if window is defined
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      // Set the initial width
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenWidth;
};
