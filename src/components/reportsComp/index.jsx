"use client";
import { Poppins } from "next/font/google";
// import ToolTrackDrawer from "./addForms/tool-track-add";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import AccidentReportDrawer from "../drawers/accidentReport-add";
import AccidentReportTable from "../tables/accidentReportTable";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/utils/pusher";

const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function AccidentReportComp({ userInfo }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [accidentReport, setAccidentReport] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (userInfo == null) router.push("/login");
  }, [userInfo]);
  useEffect(() => {
    if (userInfo !== undefined && userInfo !== null) {
      pusherClient.subscribe(userInfo.id);
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
        if (userInfo !== undefined && userInfo !== null) {
          pusherClient.unsubscribe(userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [userInfo]);
  useEffect(() => {
    getAccidentReport();
  }, []);
  const getAccidentReport = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/accidentReport/`)
      .then((res) => {
        const allData = res.data.accidentReports.sort((a, b) =>
          a.employee.localeCompare(b.employee)
        );
        setAccidentReport(allData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addAccidentReport = (data, edit = false, id) => {
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/accidentReport/${id}`, data)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: `Edited Successfully`,
            });
            getAccidentReport();
          }
        });
    } else {
      axios
        .post(`${apiPath.prodPath}/api/accidentReport/addAccidentReport`, data)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: `Added Successfully`,
            });
            getAccidentReport();
          }
        });
    }
  };
  const deleteData = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/accidentReport/${id}`)
      .then((res) => {
        if (res.data.error == true) {
          Swal.fire({ icon: "error", text: "Error in deleting Data" });
        } else {
          Swal.fire({ icon: "success", text: "Successfully deleted" });
          getAccidentReport();
        }
      })
      .catch((err) => {
        Swal.fire({ icon: "error", text: "Error in deleting Data" });
      });
  };
  return (
    <section className="tools-wrap">
      <div className="flex flex-row justify-end pt-4 pb-4">
        <button
          className={`${poppins.className} bg-orange-400 text-white font-semibold rounded-xl p-2`}
          onClick={handleCloseDrawer}
        >
          + Add Accident Report
        </button>
      </div>
      {/* <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <input
            className={`${poppins.className}`}
            type="text"
            required={true}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className={`${poppins.className}`}
            type="submit"
            value={"Search"}
          />
        </form>
      </div> */}
      {loader ? (
        <p className={poppins.className}>Loading...</p>
      ) : accidentReport.length > 0 ? (
        <AccidentReportTable
          accidentReport={accidentReport}
          deleteData={deleteData}
          refreshData={getAccidentReport}
          userInfo={userInfo}
          addAccidentReport={addAccidentReport}
        />
      ) : (
        <p className={poppins.className}>No Accident Report data found</p>
      )}
      <AccidentReportDrawer
        addAccidentReport={addAccidentReport}
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getAccidentReport}
        edit={false}
      />
    </section>
  );
}

export default AccidentReportComp;
