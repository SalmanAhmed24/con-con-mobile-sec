"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Poppins } from "next/font/google";
import TimeTrackDrawer from "../drawers/timeTrackDrawer";
import useStore from "@/utils/store/store";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/utils/pusher";
import axios from "axios";
import Swal from "sweetalert2";
import { apiPath } from "@/utils/routes";
import TimeTrackTable from "../tables/timeTrackTable";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function TimeTrackComp({}) {
  const user = useStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("Entry");
  const [timeTrackData, setTimeTrackData] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [editData, setEditData] = useState(null);
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ownFlag, setOwnFlag] = useState(true);
  const [loader, setLoader] = useState(false);
  console.log("this is user", user);
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/login");
    getTimeTrackData();
  }, [activeTab, user]);
  useEffect(() => {
    if (user !== undefined && user !== null) {
      pusherClient.subscribe(user.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat timetrack", updatedChat);
        // setAllChats((allChats) =>
        //   allChats.map((chat) => {
        //     if (chat._id === updatedChat.id) {
        //       return { ...chat, messages: updatedChat.messages };
        //     } else {
        //       return chat;
        //     }
        //   })
        // );
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (user !== undefined && user !== null) {
          pusherClient.unsubscribe(user.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [user]);
  const getTimeTrackData = () => {
    if (user !== null) {
      setLoader(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/${
            user.fullname
          }?perPage=${20}&&page=${page}&&ownFlag=${ownFlag}`
        )
        .then((res) => {
          console.log(res.data);
          setTimeTrackData(res.data.timeTrack);
          const own = res.data.timeTrack.filter(
            (i) => i.employee == user.fullname
          );
          const rest = res.data.timeTrack.filter(
            (i) => i.user == user.fullname
          );
          console.log("own", own);
          console.log("rest", rest);
          setTotalCount(res.data.count);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const getTimeTrackDataByPage = (pageNew) => {
    if (user !== null) {
      setLoader(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/${
            user.fullname
          }?perPage=${20}&&page=${pageNew}&&ownFlag=${ownFlag}`
        )
        .then((res) => {
          console.log(res.data);
          setTimeTrackData(res.data.timeTrack);
          setTotalCount(res.data.count);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handlePagination = (e, pageNew) => {
    if (pageNew == 0) {
      setPage(1);
      getTimeTrackDataByPage(1);
    } else {
      setPage(pageNew + 1);
      console.log(pageNew + 1);
      getTimeTrackDataByPage(pageNew + 1);
    }
  };
  const addData = (data, edit) => {
    const url = edit
      ? `${apiPath.prodPath}/api/timeTrack/${editData._id}`
      : `${apiPath.prodPath}/api/timeTrack/addTimeTrack`;
    if (edit) {
      axios
        .patch(url, data)
        .then((res) => {
          if (res.data.error == false) {
            Swal.fire({
              icon: "success",
              text: edit ? "Edited Successfully" : "Added Successfully",
            });
            getTimeTrackData();
            setEditData(null);
            setEditFlag(false);
          } else {
            Swal.fire({
              icon: "error",
              text: "Error Occured please try again",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: "Error Occured please try again",
          });
        });
    } else {
      axios
        .post(url, data)
        .then((res) => {
          if (res.data.error == false) {
            Swal.fire({
              icon: "success",
              text: edit ? "Edited Successfully" : "Added Successfully",
            });
            getTimeTrackData();
            setEditData(null);
          } else {
            Swal.fire({
              icon: "error",
              text: "Error Occured please try again",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: "Error Occured please try again",
          });
        });
    }
  };
  const deleteData = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/timeTrack/${id}`)
      .then((res) => {
        if (res.data.error == true) {
          Swal.fire({ icon: "error", text: "Error in deleting Data" });
        } else {
          Swal.fire({ icon: "success", text: "Successfully deleted" });
          getTimeTrackData();
        }
      })
      .catch((err) => {
        Swal.fire({ icon: "error", text: "Error in deleting Data" });
      });
  };
  const getEditData = (data) => {
    setActiveTab("Entry");
    setEditFlag(true);
    setEditData(data);
  };
  const ownTimeTrack = (e) => {
    e.preventDefault();
    console.log("this is called own");
    setOwnFlag(true);
    if (user !== null) {
      setLoader(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/${
            user.fullname
          }?perPage=${20}&&page=${page}&&ownFlag=${true}`
        )
        .then((res) => {
          console.log(res.data);
          setTimeTrackData(res.data.timeTrack);
          setTotalCount(res.data.count);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const empTimeTrack = (e) => {
    e.preventDefault();
    console.log("this is called emp Time");
    setOwnFlag(false);
    if (user !== null) {
      setLoader(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/${
            user.fullname
          }?perPage=${20}&&page=${page}&&ownFlag=${false}`
        )
        .then((res) => {
          console.log(res.data);
          setTimeTrackData(res.data.timeTrack);
          setTotalCount(res.data.count);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <section className={`${poppins.className} p-5`}>
      <h1 className="font-semibold text-3xl pb-4">Time Track</h1>
      <div className="flex flex-row gap-4 pt-5 pb-5">
        <p
          onClick={() => {
            setActiveTab("Entry");
            setEditFlag(false);
          }}
          className={
            activeTab == "Entry"
              ? "text-orange-400 font-semibold text-lg hover:cursor-pointer"
              : "font-semibold text-lg hover:cursor-pointer"
          }
        >
          Entry
        </p>
        <p
          onClick={() => setActiveTab("History")}
          className={
            activeTab == "History"
              ? "text-orange-400 font-semibold text-lg hover:cursor-pointer"
              : "font-semibold text-lg hover:cursor-pointer"
          }
        >
          History
        </p>
      </div>
      {activeTab == "Entry" ? (
        <TimeTrackDrawer
          addHandler={addData}
          edit={editFlag}
          loggedUser={user == null || user == undefined ? "" : user}
          editData={editData == null ? null : editData}
        />
      ) : null}
      {activeTab == "History" ? (
        <Tabs defaultValue="Own Time Track" className="w-full">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="Own Time Track" onClick={ownTimeTrack}>
              Own Time Track
            </TabsTrigger>
            <TabsTrigger value="Employee Time Track" onClick={empTimeTrack}>
              Employee Time Track
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Own Time Track">
            {loader ? (
              <p>Loading...</p>
            ) : user == null ? null : (
              <TimeTrackTable
                deleteData={deleteData}
                allTimeTrack={timeTrackData}
                handleEdit={getEditData}
                handlePagination={(e, page) => handlePagination(e, page)}
                totalCount={totalCount}
                page={page}
              />
            )}
          </TabsContent>
          <TabsContent value="Employee Time Track">
            {loader ? (
              <p>Loading...</p>
            ) : user == null ? null : (
              <TimeTrackTable
                deleteData={deleteData}
                allTimeTrack={timeTrackData}
                handleEdit={getEditData}
                handlePagination={(e, page) => handlePagination(e, page)}
                totalCount={totalCount}
                page={page}
              />
            )}
          </TabsContent>
        </Tabs>
      ) : null}
    </section>
  );
}

export default TimeTrackComp;
