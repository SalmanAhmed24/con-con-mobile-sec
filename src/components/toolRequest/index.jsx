import { apiPath } from "@/utils/routes";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

function ToolRequest({ userInfo }) {
  const [date, setDate] = useState();
  const [time, setTime] = useState(format(new Date(), "h:mm a"));
  const [user, setUser] = useState(userInfo == null ? "" : userInfo.fullname);
  const [toolRequest, setToolRequest] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [jobNumberOpt, setJobNumberOpt] = useState([]);
  const [vehicleOpt, setVehicleOpt] = useState([]);
  const [dateNeededBy, setDateNeededBy] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [projectVehicleFlag, setProjectVehicleFlag] = useState({
    label: "Project",
    value: "Project",
  });
  useEffect(() => {
    const d = new Date();
    setDate(format(d, "yyyy-MM-dd"));
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        const jobOpt = res.data.jobNumbers
          .map((i) => {
            return {
              label: `${i.jobNumber} - ${i.jobName}`,
              value: `${i.jobNumber} - ${i.jobName}`,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setJobNumberOpt(jobOpt);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        console.log(res.data);
        const jobOpt = res.data.vehicles
          .map((i) => {
            return {
              label: i.vehicleNo,
              value: i.vehicleNo,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setVehicleOpt(jobOpt);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);
  const handleToolReq = (e) => {
    e.preventDefault();
    const dataObj = {
      user,
      time,
      date,
      toolRequest,
      noOfDays: projectVehicleFlag.value == "Project" ? noOfDays : "",
      projectDescription:
        projectVehicleFlag.value == "Project" ? projectDescription.value : "",
      vehicleDescription:
        projectVehicleFlag.value == "Vehicle" ? vehicleDescription.value : "",
      projectVehicleFlag: projectVehicleFlag.value,
      dateNeededBy,
    };
    axios
      .post(`${apiPath.prodPath}/api/toolRequest/addToolRequest`, dataObj)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Unable to add Tool Request",
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
    setToolRequest("");
    setNoOfDays("");
    setProjectDescription("");
    setVehicleDescription("");
    setProjectVehicleFlag({ label: "Project", value: "Project" });
    setTime(format(new Date(), "h:mm a"));
    const d = new Date();
    setDate(format(d, "yyyy-MM-dd"));
    setUser(userInfo == null ? "" : userInfo.fullname);
  };
  const handleDateNeeded = (e) => {
    e.preventDefault();
    const formatedDate = format(e.target.value, "yyyy-MM-dd");
    setDateNeededBy(formatedDate);
  };
  return (
    <section>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl pb-4">Tool Request</h1>
        <form
          onSubmit={handleToolReq}
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
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Tool Description</label>
            <input
              type="text"
              value={toolRequest}
              onChange={(e) => setToolRequest(e.target.value)}
              className="p-2 border-grey-100  border-[1px] rounded-[8px]"
              placeholder="Add Tool Description"
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="font-semibold">Project / Vehicle</label>
            <Select
              options={[
                { label: "Project", value: "Project" },
                { label: "Vehicle", value: "Vehicle" },
              ]}
              value={projectVehicleFlag}
              onChange={(e) => setProjectVehicleFlag(e)}
            />
          </div>

          {projectVehicleFlag.value == "Project" ? (
            <div className="flex flex-col gap-2 w-[300px]">
              <label className="font-semibold">Job #</label>
              <Select
                required={true}
                options={jobNumberOpt}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e)}
                placeholder="Project Description"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-[300px]">
              <label className="font-semibold">Vehicle #</label>
              <Select
                options={vehicleOpt}
                value={vehicleDescription}
                onChange={(e) => setVehicleDescription(e)}
                placeholder="Vehicle Description"
              />
            </div>
          )}
          {projectVehicleFlag.value == "Project" ? (
            <div className="flex flex-col gap-2 w-[300px]">
              <label className="font-semibold">No of Days</label>
              <input
                type="text"
                value={noOfDays}
                required={true}
                onChange={(e) => setNoOfDays(e.target.value)}
                className="p-2 border-grey-100  border-[1px] rounded-[8px]"
                placeholder="Add Tool Description"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="font-semibold">Date Needed By</label>
            <input
              type="date"
              value={dateNeededBy}
              onChange={handleDateNeeded}
              required={true}
              className="p-2 border-grey-100  border-[1px] rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="submit"
              className="bg-orange-400 p-2 rounded-[5px] text-white font-semibold self-start"
              value={"Add Tool Request"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ToolRequest;
