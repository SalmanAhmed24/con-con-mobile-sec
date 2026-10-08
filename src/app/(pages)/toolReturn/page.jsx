"use client";
import ToolTrackComp from "@/components/toolTrack";
import useStore from "@/utils/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useState, useEffect } from "react";
import ToolRequest from "@/components/toolRequest";
import ToolReturn from "@/components/toolReturn";
import AllTools from "@/components/allTools";
import ToolTransfer from "@/components/toolTransfer";

function ToolTrack() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <Tabs defaultValue="Currently Assigned" className="w-full">
        <TabsList className="cus-tab-wrap">
          {/* <TabsTrigger value="Tool Request">Tool Request</TabsTrigger>
          <TabsTrigger value="Tool Return">Tool Return</TabsTrigger>
          <TabsTrigger value="Tool Transfer">Tool Transfer</TabsTrigger> */}
          <TabsTrigger value="Currently Assigned">
            Currently Assigned Tools
          </TabsTrigger>
          <TabsTrigger value="Tool History">Tool History</TabsTrigger>
        </TabsList>
        <TabsContent value="Tool History">
          <ToolTrackComp module={"individual"} userInfo={user} />
        </TabsContent>
        <TabsContent value="Currently Assigned">
          <AllTools userInfo={user} />
        </TabsContent>
        {/* <TabsContent value="Tool Request">
          <ToolRequest userInfo={user} />
        </TabsContent>
        <TabsContent value="Tool Return">
          <ToolReturn userInfo={user} />
        </TabsContent>
        <TabsContent value="Tool Transfer">
          <ToolTransfer userInfo={user} />
          
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

export default ToolTrack;
