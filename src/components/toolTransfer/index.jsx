import { apiPath } from "@/utils/routes";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolTransferForm from "./toolTransferForm";
// import ToolTransferTableComp from "../toolTransferTableComp";
function ToolTransfer({ userInfo }) {
  const [date, setDate] = useState();
  const [time, setTime] = useState(format(new Date(), "h:mm a"));
  const [user, setUser] = useState(userInfo == null ? "" : userInfo.fullname);
  const [toolReturn, setToolReturn] = useState([]);
  const [toolOpt, setToolOpt] = useState([]);
  const [toolCusArr, setToolCusArr] = useState([]);
  useEffect(() => {
    const d = new Date();
    setDate(format(d, "yyyy-MM-dd"));
    axios
      .get(`${apiPath.prodPath}/api/allTools/`)
      .then((res) => {
        const sortedTools = res.data.allTools
          .filter((i) => i.techAssigned == userInfo.fullname)
          .map((i) => {
            return {
              label: `${i.toolNumber} - ${i.toolDescription}`,
              value: `${i.toolNumber}`,
              toolDescription: i.toolDescription,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setToolOpt(sortedTools);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  const resetValues = () => {
    setToolCusArr([]);
    setTime(format(new Date(), "h:mm a"));
    const d = new Date();
    setDate(format(d, "yyyy-MM-dd"));
    setUser(userInfo !== null ? userInfo.fullname : "");
  };
  return (
    <section>
      <h1 className="font-semibold text-2xl pb-4">Tool Transfer</h1>
      <Tabs defaultValue="Tool Transfer" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="Tool Transfer">Tool Transfer</TabsTrigger>
          {/* <TabsTrigger value="History">History</TabsTrigger> */}
        </TabsList>
        <TabsContent value="Tool Transfer">
          <ToolTransferForm userInfo={userInfo} />
        </TabsContent>
        {/* <TabsContent value="History">
          <ToolTransferTableComp userInfo={userInfo} />
        </TabsContent> */}
      </Tabs>
    </section>
  );
}

export default ToolTransfer;
