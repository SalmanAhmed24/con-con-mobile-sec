"use client";
import TimeOutComp from "@/components/timeOutComp";
import useStore from "@/utils/store/store";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function TimeOff() {
  const user = useStore((state) => state.user);
  return (
    <div className={`${poppins.className}`}>
      <TimeOutComp user={user} />
    </div>
  );
}

export default TimeOff;
