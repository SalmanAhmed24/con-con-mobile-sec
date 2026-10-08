"use client";
import ServiceTicketComp from "@/components/serviceTickets";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function ServiceTicket() {
  return (
    <div>
      <h1 className={`${poppins.className} pt-4 pb-4 font-semibold text-3xl`}>
        Service Ticket
      </h1>
      <ServiceTicketComp />
    </div>
  );
}

export default ServiceTicket;
