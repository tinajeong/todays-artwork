import React from "react";
import moai_spin from "../images/moai_spin.webp";
export default function Loading() {
  return (
    <div>
      <img src={moai_spin} width={36} height={36} alt="spin"></img>
      <h3>Loading...</h3>
    </div>
  );
}
