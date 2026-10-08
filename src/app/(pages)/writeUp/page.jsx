"use client";
import WriteUpComp from "@/components/writeUp";
import useStore from "@/utils/store/store";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function WriteUp() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <h1 className={`${poppins.className} pt-4 pb-4 font-semibold text-3xl`}>
        Write Up
      </h1>
      <WriteUpComp user={user} />
    </div>
  );
}

export default WriteUp;
