import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolReturnTable from "../tables/toolReturnTable";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function ToolReturnTableComp({ userInfo }) {
  // const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toolReturn, setToolReturn] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/toolReturn/`)
      .then((res) => {
        console.log("####", res.data.toolReturns);
        const sorted = res.data.toolReturns
          .filter((i) => i.user == userInfo.fullname)
          .sort((a, b) => a.date - b.date);
        setToolReturn(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="main-table-wrap">
      <Tabs defaultValue="Pending" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Complete">Complete</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ToolReturnTable
              loading={loading}
              toolReturn={toolReturn.filter((i) => i.returnFlag == false)}
            />
          )}
        </TabsContent>
        <TabsContent value="Complete">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ToolReturnTable
              loading={loading}
              toolReturn={toolReturn.filter((i) => i.returnFlag == true)}
            />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default ToolReturnTableComp;
