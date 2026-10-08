import { apiPath } from "@/utils/routes";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { CheckboxGroup } from "react-rainbow-components";
import { brown } from "@mui/material/colors";

function ToolReturnForm({ userInfo }) {
  const [date, setDate] = useState();
  const [time, setTime] = useState(format(new Date(), "h:mm a"));
  const [user, setUser] = useState(userInfo == null ? "" : userInfo.fullname);
  const [toolReturn, setToolReturn] = useState([]);
  const [toolOpt, setToolOpt] = useState([]);
  const [jobOpt, setJobOpt] = useState([]);
  const [toolCusArr, setToolCusArr] = useState([]);
  const [vehicleOpt, setVehicleOpt] = useState([]);
  const [checkbox, setCheckbox] = useState([""]);
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
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        const sortedTools = res.data.jobNumbers
          .map((i) => {
            return {
              label: `${i.jobNumber} - ${i.jobName}`,
              value: `${i.jobNumber} - ${i.jobName}`,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setJobOpt(sortedTools);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const sortedTools = res.data.vehicles
          .map((i) => {
            return {
              label: i.vehicleNo,
              value: i.vehicleNo,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setVehicleOpt(sortedTools);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);
  const handleToolReturn = (e) => {
    e.preventDefault();
    const dataObj = {
      user,
      time,
      date,
      toolRequest: toolCusArr.map((i) => {
        return {
          toolNumber: i.toolNumber.label,
          projectVehicleFlag: i.projectVehicleFlag.value,
          vehicle: i.vehicle == "" ? "" : i.vehicle.value,
          jobNumber: i.jobNumber == "" ? "" : i.jobNumber.value,
          note: i.note,
          assignedTo: "",
          broken: i.broken[0] == "broken" ? true : false,
        };
      }),
      returnFlag: "Pending",
    };
    console.log("##$$##", dataObj);
    axios
      .post(`${apiPath.prodPath}/api/toolReturn/addToolReturn`, dataObj)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Unable to add Tool Return",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          resetValues();
        }
      });
  };
  const resetValues = () => {
    setToolCusArr([]);
    setTime(format(new Date(), "h:mm a"));
    const d = new Date();
    setDate(format(d, "yyyy-MM-dd"));
    setUser(userInfo !== null ? userInfo.fullname : "");
  };
  const handleToolrArr = (e) => {
    e.preventDefault();
    const obj = {
      cusId: uuidv4(),
      toolNumber: "",
      note: "",
      projectVehicleFlag: { label: "Project", value: "Project" },
      vehicle: "",
      returnFlag: "Pending",
      jobNumber: "",
      broken: [],
    };
    setToolCusArr((prev) => {
      return [obj, ...prev];
    });
  };
  const handleRemoveEl = (e, id) => {
    e.preventDefault();
    const filteredArr = toolCusArr.filter((el) => el.cusId !== id);
    setToolCusArr(filteredArr);
  };
  const handleAddingToolInArr = (e, id) => {
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.toolNumber = e;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const handleAddingJobInArr = (e, id) => {
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.jobNumber = e;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const handleAddingNoteInArr = (e, id) => {
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.note = e.target.value;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const handleProjVehFlag = (e, id) => {
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.projectVehicleFlag = e;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const handleVehicle = (e, id) => {
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.vehicle = e;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const handleCheckbox = (value, id) => {
    console.log("##$$##$$", value);
    const result = toolCusArr.map((el) => {
      if (el.cusId == id) {
        el.broken = value;
      }
      return el;
    });
    setToolCusArr(result);
  };
  const options = [{ value: "broken", label: "Broken", disabled: false }];
  return (
    <section>
      <div className="flex flex-col gap-2">
        <form
          onSubmit={handleToolReturn}
          className="flex flex-row flex-wrap gap-4"
        >
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="font-semibold">Person Requesting</label>
            <input
              type="text"
              value={user}
              disabled={true}
              className="p-2 border-grey-100 border-[1px] rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="font-semibold">Date</label>
            <input
              type="date"
              value={date}
              disabled={true}
              className="p-2 border-grey-100  border-[1px] rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="font-semibold">Time</label>
            <input
              type="text"
              value={time}
              disabled={true}
              className="p-2 border-grey-100  border-[1px] rounded-[8px]"
            />
          </div>
          <div className="w-full">
            <button
              onClick={(e) => handleToolrArr(e)}
              className="bg-orange-400 p-2 rounded-[5px] text-white font-semibold self-start"
            >
              + Add Tools
            </button>
          </div>
          {toolCusArr.length
            ? toolCusArr.map((i) => {
                return (
                  <div key={i.cusId} className="w-full flex flex-row gap-4">
                    <div className="flex flex-col gap-2 w-[300px]">
                      <label className="font-semibold">Tools</label>
                      <Select
                        options={toolOpt}
                        value={i.toolNumber}
                        onChange={(e) => handleAddingToolInArr(e, i.cusId)}
                        placeholder="Add Tools"
                        required={true}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                      <label className="font-semibold">Project / Vehicle</label>
                      <Select
                        className="z-[55]"
                        options={[
                          { label: "Project", value: "Project" },
                          { label: "Vehicle", value: "Vehicle" },
                          { label: "Shop", value: "Shop" },
                        ]}
                        onChange={(e) => handleProjVehFlag(e, i.cusId)}
                        id="tool-select-3"
                        value={i.projectVehicleFlag}
                        required={true}
                      />
                    </div>
                    {i.projectVehicleFlag.value == "Project" ? (
                      <div className="flex flex-col gap-2 w-[300px]">
                        <label className="font-semibold">Job</label>
                        <Select
                          options={jobOpt}
                          value={i.jobNumber}
                          onChange={(e) => handleAddingJobInArr(e, i.cusId)}
                          placeholder="Add Job"
                          required={true}
                        />
                      </div>
                    ) : null}
                    {i.projectVehicleFlag.value == "Vehicle" ? (
                      <div className="flex flex-col gap-2 w-[300px]">
                        <label className="font-semibold">Vehicle</label>
                        <Select
                          options={vehicleOpt}
                          value={i.vehicle}
                          onChange={(e) => handleVehicle(e, i.cusId)}
                          placeholder="Add Job"
                          required={true}
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-2 w-[300px]">
                      <label className="font-semibold">Location/Note</label>
                      <input
                        type="text"
                        value={i.note}
                        onChange={(e) => handleAddingNoteInArr(e, i.cusId)}
                        className="p-2 border-grey-100  border-[1px] rounded-[8px]"
                        placeholder="Add Notes"
                      />
                    </div>
                    <div className="flex flex-row self-end pb-2 gap-2 w-[300px]">
                      <CheckboxGroup
                        id="checkbox-group-1"
                        options={options}
                        value={i.broken}
                        onChange={(e) => handleCheckbox(e, i.cusId)}
                      />
                    </div>
                    <div className="flex flex-col justify-end gap-2 w-[300px]">
                      <button
                        onClick={(e) => handleRemoveEl(e, i.cusId)}
                        className="bg-orange-400 p-2 rounded-[5px] text-white font-semibold self-start"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
          <div className="flex flex-col gap-2 w-full">
            <input
              type="submit"
              disabled={toolCusArr.length ? false : true}
              className="bg-orange-400 p-2 rounded-[5px] text-white font-semibold self-end"
              value={"Add Tool Return"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ToolReturnForm;
