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

export const getIdFromHeader = (label: string): string => {
  if (!label) return "";
  return label
    .toLowerCase() // Convert to lowercase
    .replace(/[\s']/g, "-") // Replace spaces and apostrophes with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word chars except hyphens
};

export const generateTable = (
  markdown: string
): { id: string; label: string }[] => {
  const toc = [];
  const lines = markdown.split("\n");

  for (let line of lines) {
    if (line.startsWith("## ")) {
      // Check if the line is an H2 header
      const label = line.replace("## ", "").trim();
      const id = getIdFromHeader(label);

      toc.push({ label, id });
    }
  }

  return toc;
};

export const hashString = async (string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(string); // Convert string to Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash the data
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string
  return hashHex;
};
