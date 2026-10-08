"use client";
import ManpowerComp from "@/components/labor";
import useStore from "@/utils/store/store";
import React, { useState, useEffect } from "react";

function Labor() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <ManpowerComp user={user} />
    </div>
  );
}

export default Labor;
