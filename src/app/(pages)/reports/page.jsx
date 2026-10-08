"use client";
import AccidentReportComp from "@/components/reportsComp";
import useStore from "@/utils/store/store";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function Reports() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <h1 className={`${poppins.className} pt-4 pb-4 font-semibold text-3xl`}>
        Accident Reports
      </h1>
      <AccidentReportComp userInfo={user} />
    </div>
  );
}

export default Reports;
