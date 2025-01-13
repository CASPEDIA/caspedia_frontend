import React from "react";
import "./LoadingProvider.css";

export default function LoadingProvider() {
  return (
    <div className="loading-overlay">
      <div className="spinner">
        <div className="circle"></div>
      </div>
    </div>
  );
}
