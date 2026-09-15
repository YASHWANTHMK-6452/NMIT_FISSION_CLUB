"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "FISSION | AI & Machine Learning Club";
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="/index.html"
        title="FISSION AI & Machine Learning Club"
        style={{
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}