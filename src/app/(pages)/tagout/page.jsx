"use client";
import TagoutComp from "@/components/tagoutComp";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function Tagout() {
  return (
    <div>
      <h1 className={`${poppins.className} pt-4 pb-4 font-semibold text-3xl`}>
        Tagout
      </h1>
      <TagoutComp />
    </div>
  );
}

export default Tagout;
