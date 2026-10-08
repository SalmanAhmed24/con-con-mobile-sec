"use client";
import { Poppins } from "next/font/google";
// import ToolTrackDrawer from "./addForms/tool-track-add";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import VehicleInspectionDrawer from "../drawers/vehicleInspection";
import VehicleInspectionTable from "../tables/vehicleInspectionTable";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/utils/pusher";

const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function VehicleInspectionComp({ userInfo }) {
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [vehicleInspection, setVehicleInspection] = useState([]);
  const [loader, setLoader] = useState(false);
  const [editData, setEditData] = useState(null);
  const router = useRouter();
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
    getVehicleInspection();
  }, []);
  const getVehicleInspection = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicleInspection/`)
      .then((res) => {
        console.log("userInfo", userInfo);
        console.log(res.data.vehicleInspections);
        const allData = res.data.vehicleInspections
          .filter((i) => i.employee == userInfo.fullname)
          .sort((a, b) => a.employee.localeCompare(b.employee));

        setVehicleInspection(allData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addVehicleInspection = (data, edit = false, id) => {
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/vehicleInspection/${id}`, data)
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
            getVehicleInspection();
          }
        });
    } else {
      axios
        .post(
          `${apiPath.prodPath}/api/vehicleInspection/addVehicleInspection`,
          data
        )
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
            getVehicleInspection();
          }
        });
    }
  };
  const deleteData = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/vehicleInspection/${id}`)
      .then((res) => {
        if (res.data.error == true) {
          Swal.fire({ icon: "error", text: "Error in deleting Data" });
        } else {
          Swal.fire({ icon: "success", text: "Successfully deleted" });
          getVehicleInspection();
        }
      })
      .catch((err) => {
        Swal.fire({ icon: "error", text: "Error in deleting Data" });
      });
  };
  return (
    <section className="pt-5">
      <div className="flex flex-row justify-end p-5">
        <button
          className={`${poppins.className} p-2 bg-orange-400 text-white font-semibold rounded-xl`}
          onClick={handleCloseDrawer}
        >
          Add Vehicle Inspection
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
      ) : vehicleInspection.length > 0 ? (
        <VehicleInspectionTable
          vehicleInspection={vehicleInspection}
          deleteData={deleteData}
          refreshData={getVehicleInspection}
          userInfo={userInfo}
          addVehicleInspection={addVehicleInspection}
        />
      ) : (
        <p className={poppins.className}>No Vehicle Inspection data found</p>
      )}
      <VehicleInspectionDrawer
        addVehicleInspection={addVehicleInspection}
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getVehicleInspection}
        edit={false}
      />
    </section>
  );
}

export default VehicleInspectionComp;
