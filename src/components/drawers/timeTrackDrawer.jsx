"use client";
import React, { useState, useEffect } from "react";
import { TimePicker, CheckboxGroup } from "react-rainbow-components";
import axios from "axios";
import DatePicker from "react-datepicker";
import { apiPath } from "@/utils/routes";
import { Poppins } from "next/font/google";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

function TimeTrackDrawer({ loggedUser, addHandler, edit, editData }) {
  const [employeeOpt, setEmployeeOpt] = useState("");
  const [loaderUser, setLoaderUser] = useState(false);
  const [employee, setEmployee] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [jobNumberOpt, setJobNumberOpt] = useState([]);
  const [phaseOpt, setPhaseOpt] = useState("");
  const [reimbursalOpt, setReimbursalOpt] = useState("");
  const [phase, setPhase] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checkbox, setCheckbox] = useState(["lunch"]);
  const [lunchTime, setLunchTime] = useState("30");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [reimbursalCheckbox, setReimbursalCheckbox] = useState([]);
  const [dateAdded, setDateAdded] = useState("");
  const [timeAdded, setTimeAdded] = useState("");
  const [hours, setHours] = useState("");
  const [laborType, setLaborType] = useState("");
  const [laborTypeOpt, setLaborTypeOpt] = useState([]);
  // const [reimbursalType, setReimbursalType] = useState([]);
  // const [reimbursalNote, setReimbursalNote] = useState("");
  // const [amount, setAmount] = useState("");
  const [reimbursalArr, setReimbursalArr] = useState([
    {
      id: uuidv4(),
      reimbursalType: "",
      note: "",
      amount: "",
    },
  ]);
  const addNewForm = () => {
    const newForm = {
      id: uuidv4(),
      reimbursalType: "",
      amount: "",
      note: "",
    };
    setReimbursalArr((arr) => {
      return [...arr, newForm];
    });
  };
  useEffect(() => {
    setLoaderUser(true);
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setEmployeeOpt(
          res.data.allUsers
            .map((i) => {
              return {
                label: i.fullname,
                value: i.fullname,
                timeTrackFlag: i.timeTrackFlag,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
        setLoaderUser(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: "Uneable to load Users",
        });
        setLoaderUser(false);
        console.log(err);
      });
    setLoaderUser(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber`)
      .then((res) => {
        setJobNumberOpt(
          res.data.jobNumbers
            .map((i) => {
              return {
                label: `${i.jobNumber} - ${i.jobName}`,
                value: `${i.jobNumber} - ${i.jobName}`,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
        setLoaderUser(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: "Uneable to load Job Number",
        });
        setLoaderUser(false);
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/laborType`)
      .then((res) => {
        setLaborTypeOpt(
          res.data.laborTypes
            .map((i) => {
              return {
                label: i.name,
                value: i.name,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
        setLoaderUser(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: "Uneable to load Job Number",
        });
        setLoaderUser(false);
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/phase`)
      .then((res) => {
        setPhaseOpt(
          res.data.phases
            .map((i) => {
              return { label: i.name, value: i.name };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/reimbursalType/`)
      .then((res) => {
        setReimbursalOpt(
          res.data.reimbursalTypes
            .map((i) => {
              return { label: i.name, value: i.name };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    setLoggedInUser(loggedUser);
    setDateAdded(moment(new Date()).format("MM-DD-YYYY"));
    setTimeAdded(moment(new Date()).format("hh:mm a"));
    if (edit) {
      setEmployee({
        label: editData.employee,
        value: editData.employee,
        timeTrackFlag: editData.timeTrackFlag,
      });
      setDateAdded(
        editData.dateAdded == undefined
          ? ""
          : moment(editData.dateAdded).format("MM-DD-YYYY")
      );
      setTimeAdded(editData.timeAdded == undefined ? "" : editData.timeAdded);
      setJobDescription(editData.jobDescription);
      setJobNumber({ label: editData.jobNumber, value: editData.jobNumber });
      setNotes(editData.notes);
      setPhase({ label: editData.phase, value: editData.phase });
      setDate(new Date(editData.date));
      setHours(editData.hours);
      setLaborType({ label: editData.laborType, value: editData.laborType });
      setStartTime(editData.startTime);
      setEndTime(editData.endTime);
      setCheckbox(
        editData.spectrum && editData.lunch
          ? ["spectrum", "lunch"]
          : editData.spectrum == true && editData.lunch == false
          ? ["spectrum"]
          : editData.spectrum == false && editData.lunch == true
          ? ["lunch"]
          : []
      );
      setLunchTime(editData.lunch ? editData.lunchTime : "");
      setReimbursalCheckbox(
        editData.reimbursalFlag == "reimbursal" ? ["reimbursal"] : []
      );
      const modifiedValues =
        editData.reimbursal && editData.reimbursal.length
          ? editData.reimbursal.map((i) => {
              return {
                id: i._id,
                reimbursalType: {
                  label: i.reimbursalType,
                  value: i.reimbursalType,
                },
                amount: i.amount,
                note: i.note,
              };
            })
          : [
              {
                id: uuidv4(),
                reimbursalType: "",
                note: "",
                amount: "",
              },
            ];

      setReimbursalArr(modifiedValues);
    }
  }, []);
  const handleForm = (e) => {
    e.preventDefault();
    if (startTime == "") {
      Swal.fire({
        icon: "error",
        text: "Please select the Start Time",
      });
    }
    if (endTime == "") {
      Swal.fire({
        icon: "error",
        text: "Please select the End Time",
      });
    }
    if (checkbox[0] == "lunch" || checkbox[1] == "lunch") {
      if (lunchTime == "") {
        Swal.fire({
          icon: "error",
          text: "Please Fill Both Start and End time for lunch",
        });
      }
    }
    const filteredData = reimbursalArr.map((i) => {
      return {
        reimbursalType: i.reimbursalType.value,
        amount: i.amount,
        note: i.note,
      };
    });
    const dataObj = {
      employee: employee.value,
      timeTrackFlag: employee.timeTrackFlag,
      jobDescription: jobDescription,
      jobNumber: jobNumber.value,
      dateAdded: moment(new Date()).format("MM-DD-YYYY"),
      timeAdded: moment(new Date()).format("hh:mm a"),
      phase: phase.value,
      date,
      laborType: laborType.value,
      hours,
      notes,
      startTime,
      endTime,
      spectrum:
        checkbox[0] == "spectrum" || checkbox[1] == "spectrum" ? true : false,
      lunch: checkbox[0] == "lunch" || checkbox[1] == "lunch" ? true : false,
      lunchTime,
      user: loggedInUser.fullname,
      reimbursalFlag: reimbursalCheckbox[0] == "reimbursal" ? "reimbursal" : "",
      reimbursal: filteredData,
    };
    console.log("this is data", dataObj);
    addHandler(dataObj, edit);
    handleReset();
  };
  const handleReset = () => {
    setEmployee("");
    setDateAdded(moment(new Date()).format("MM-DD-YYYY"));
    setTimeAdded(moment(new Date()).format("hh:mm a"));
    setJobDescription("");
    setLaborType("");
    setJobNumber("");
    setHours("");
    setDate("");
    setNotes("");
    setPhase("");
    setStartTime("");
    setEndTime("");
    setLunchTime("");
    setCheckbox(["lunch"]);
    setLunchTime("30");
    setReimbursalArr([
      {
        id: uuidv4(),
        reimbursalType: "",
        note: "",
        amount: "",
      },
    ]);
    setReimbursalCheckbox([]);
  };
  const handleCheckbox = (value) => {
    const isLunch = value.filter((i) => i == "lunch");
    if (isLunch.length == 0) {
      setLunchTime("");
    }
    setCheckbox(value);
  };
  const handleReimCheckbox = (value) => {
    setReimbursalCheckbox(value);
  };
  const handleReimbursalType = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.reimbursalType = e;
      }
      return el;
    });

    setReimbursalArr(result);
  };
  const handleReimbursalAmount = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.amount = e.target.value;
      }
      return el;
    });
    setReimbursalArr(result);
  };
  const handleReimbursalNote = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.note = e.target.value;
      }
      return el;
    });
    setReimbursalArr(result);
  };
  const handleRemoveEl = (i) => {
    const filteredArr = reimbursalArr.filter((el) => el.id !== i.id);
    setReimbursalArr(filteredArr);
  };
  const options = [
    { value: "spectrum", label: "Spectrum", disabled: false },
    { value: "lunch", label: "Lunch", disabled: false },
  ];
  console.log("this is employee", employee);
  return (
    <section className="w-full">
      <form onSubmit={handleForm} className="flex flex-row flex-wrap gap-4">
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Employee
          </label>
          {loaderUser ? (
            <p>Loading...</p>
          ) : (
            <Select
              options={employeeOpt}
              value={employee}
              onChange={(e) => setEmployee(e)}
              className={`${poppins.className} z-50`}
              required={true}
            />
          )}
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Date Added
          </label>
          <input
            type="text"
            value={dateAdded}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
            disabled={true}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Time Added
          </label>
          <input
            type="text"
            value={timeAdded}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
            disabled={true}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Job Number
          </label>
          <Select
            options={jobNumberOpt}
            value={jobNumber}
            onChange={(e) => setJobNumber(e)}
            className={`${poppins.className} z-49`}
            required={true}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Job Description
          </label>
          <input
            type="text"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
            required={true}
          />
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Labor Type
          </label>
          <Select
            options={laborTypeOpt}
            value={laborType}
            onChange={(e) => setLaborType(e)}
            className={`${poppins.className} z-48`}
          />
        </div>
        {/* <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>Phase</label>
          <Select
            options={phaseOpt}
            value={phase}
            onChange={(e) => setPhase(e)}
            className={poppins.className}
            required={true}
          />
        </div> */}
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>Date</label>
          <DatePicker
            required={true}
            selected={date}
            onChange={(value) => setDate(value)}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
          />

          {date !== "" ? (
            <p className={poppins.className} onClick={() => setDate("")}>
              Clear
            </p>
          ) : null}
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            Start Time
          </label>
          <TimePicker
            value={startTime}
            onChange={(e) => setStartTime(e)}
            className={poppins.className}
            required={true}
          />
          {startTime !== "" ? (
            <p className={poppins.className} onClick={() => setStartTime("")}>
              Clear
            </p>
          ) : null}
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>
            End Time
          </label>
          <TimePicker
            value={endTime}
            onChange={(e) => setEndTime(e)}
            className={poppins.className}
            required={true}
          />
          {endTime !== "" ? (
            <p className={poppins.className} onClick={() => setEndTime("")}>
              Clear
            </p>
          ) : null}
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <CheckboxGroup
            id="checkbox-group-1"
            options={options}
            value={checkbox}
            onChange={handleCheckbox}
          />
        </div>
        {checkbox[0] == "lunch" || checkbox[1] == "lunch" ? (
          <div className="w-1/3 flex flex-col gap-2">
            <label className={`${poppins.className} font-semibold`}>
              Lunch Time
            </label>
            <input
              type="number"
              value={lunchTime}
              onChange={(e) => setLunchTime(e.target.value)}
              className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
              required={true}
            />
          </div>
        ) : null}
        <div className="w-1/3 flex flex-col gap-2">
          <label className={`${poppins.className} font-semibold`}>User</label>
          <input
            type="text"
            disabled={true}
            value={loggedInUser.fullname}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2" style={{ width: "100%" }}>
          <label className={`${poppins.className} font-semibold`}>Notes</label>
          <textarea
            rows={5}
            cols={12}
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
          />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <CheckboxGroup
            id="checkbox-group-2"
            options={[
              { value: "reimbursal", label: "Reimbursal", disabled: false },
            ]}
            value={reimbursalCheckbox}
            onChange={handleReimCheckbox}
          />
        </div>
        {reimbursalCheckbox[0] == "reimbursal" ? (
          <span className={`${poppins.className} btn-add`} onClick={addNewForm}>
            Add Another Reimbursal
          </span>
        ) : null}
        {reimbursalCheckbox[0] == "reimbursal"
          ? reimbursalArr.map((i) => {
              return (
                <div key={i.id} style={{ width: "100%", display: "flex" }}>
                  <div className="w-1/3 flex flex-col gap-2">
                    <label className={`${poppins.className} font-semibold`}>
                      Reimbursal Type
                    </label>
                    <Select
                      name={`reimbursalType${i.id}`}
                      options={reimbursalOpt}
                      value={i.reimbursalType}
                      onChange={(e) => {
                        handleReimbursalType(e, i);
                      }}
                      className={poppins.className}
                      required={true}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col gap-2">
                    <label className={`${poppins.className} font-semibold`}>
                      Amount
                    </label>
                    <input
                      name={`amount${i.id}`}
                      placeholder="Enter Amount"
                      value={i.amount}
                      onChange={(e) => {
                        handleReimbursalAmount(e, i);
                      }}
                      className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
                      required={true}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col gap-2">
                    <label className={`${poppins.className} font-semibold`}>
                      Note
                    </label>
                    <textarea
                      name={`note${i.id}`}
                      placeholder="Enter Note"
                      value={i.note}
                      onChange={(e) => {
                        handleReimbursalNote(e, i);
                      }}
                      className={`${poppins.className} border-2 border-gray-200 p-2 rounded-xl`}
                    />
                  </div>
                  {reimbursalArr.length > 1 ? (
                    <span
                      className="minus"
                      style={{ fontSize: "22px" }}
                      onClick={() => handleRemoveEl(i)}
                    >
                      &#9866;
                    </span>
                  ) : null}
                </div>
              );
            })
          : null}
        <div className="flex w-full flex-row justify-end">
          <input
            type="submit"
            value={edit ? "Edit Time Track" : "Add Time Track"}
            className={`${poppins.className} bg-orange-400 text-white font-semibold p-2 rounded-xl`}
          />
        </div>
      </form>
    </section>
  );
}

export default TimeTrackDrawer;
