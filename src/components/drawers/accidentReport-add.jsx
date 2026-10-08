import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { CheckboxGroup, TimePicker } from "react-rainbow-components";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function AccidentReportDrawer({
  addAccidentReport,
  open,
  onClose,
  user,
  editItemId,
  edit,
  editData,
}) {
  const [employeeOpt, setEmployeeOpt] = useState("");
  const [jobOpt, setJobOpt] = useState("");
  const [job, setJob] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [witness, setWitness] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [bodyPartsAffected, setBodyPartsAffected] = useState("");
  const [doctor, setDoctor] = useState("");
  const [compensationForm, setCompensationForm] = useState("");
  const [leftShift, setLeftShift] = useState("");
  const [leftDate, setLeftDate] = useState("");
  const [leftTime, setLeftTime] = useState("");
  const [supervisorComments, setSupervisorComments] = useState("");
  const [preventAccident, setPreventAccident] = useState("");
  const [unsafeConditions, setUnsafeConditions] = useState("");
  const [unsafeConditionsComments, setUnsafeConditionsComments] = useState("");
  const [mainDate, setMainDate] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");

  const agreeOpt = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  useEffect(() => {
    if (edit == false) {
      resetValues("");
    }
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setEmployee({ label: user.fullname, value: user.fullname });
        setEmployeeOpt(
          res.data.allUsers
            .map((i) => {
              return { label: i.fullname, value: i.fullname };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    // axios
    //   .get(`${apiPath.prodPath}/api/job`)
    //   .then((res) => {
    //     setJobOpt(
    //       res.data.jobs
    //         .map((i) => {
    //           return { label: i.jobId, value: i.jobId };
    //         })
    //         .sort((a, b) => a.label.localeCompare(b.label))
    //     );
    //   })
    //   .catch((err) => console.log(err));
    if (edit) {
      setEmployee({ label: editData.employee, value: editData.employee });
      setJob(editData.jobTitle);
      setDate(new Date(editData.date));
      setTime(editData.time);
      setSupervisor({ label: editData.supervisor, value: editData.supervisor });
      setWitness(editData.witness);
      setBriefDescription(editData.briefDescription);
      setBodyPartsAffected(editData.bodyPartsAffected);
      setDoctor({
        label: editData.doctor == true ? "Yes" : "No",
        value: editData.doctor == true ? "yes" : "no",
      });
      setCompensationForm({
        label: editData.compensationForm == true ? "Yes" : "No",
        value: editData.compensationForm == true ? "yes" : "no",
      });
      setLeftShift({
        label: editData.leftShift == true ? "Yes" : "No",
        value: editData.leftShift == true ? "yes" : "no",
      });
      setLeftDate(editData.leftDate == null ? "" : new Date(editData.leftDate));
      setLeftTime(editData.leftTime);
      setSupervisorComments(editData.supervisorComments);
      setPreventAccident(editData.preventAccident);
      setUnsafeConditions({
        label: editData.unsafeConditions == true ? "Yes" : "No",
        value: editData.unsafeConditions == true ? "yes" : "no",
      });
      setUnsafeConditionsComments(editData.unsafeConditionsComments);
      setMainDate(new Date(editData.mainDate));
      setPhone(editData.phone);
      setAdditionalComments(editData.additionalComments);
      setSupervisorSignature(editData.supervisorSignature);
    }
  }, [open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      employee: employee.value,
      jobTitle: job,
      date,
      time,
      supervisor: supervisor.value,
      witness,
      briefDescription,
      bodyPartsAffected,
      doctor: doctor.value == "yes" ? true : false,
      compensationForm: doctor.value == "yes" ? true : false,
      leftShift: leftShift.value == "yes" ? true : false,
      leftTime: leftShift.value == "yes" ? leftTime : null,
      leftDate: leftShift.value == "yes" ? leftDate : null,
      supervisorComments,
      preventAccident,
      unsafeConditions: unsafeConditions.value == "yes" ? true : false,
      unsafeConditionsComments,
      mainDate,
      phone,
      additionalComments,
      supervisorSignature,
    };
    if (edit) {
      addAccidentReport(dataObj, edit, editData._id);
    } else {
      addAccidentReport(dataObj, edit);
    }
    resetValues();
  };
  const resetValues = () => {
    setEmployee("");
    setJob("");
    setDate("");
    setTime("");
    setSupervisor("");
    setWitness("");
    setBriefDescription("");
    setBodyPartsAffected("");
    setDoctor("");
    setCompensationForm("");
    setLeftShift("");
    setLeftDate("");
    setLeftTime("");
    setSupervisorComments("");
    setPreventAccident("");
    setUnsafeConditions("");
    setUnsafeConditionsComments("");
    setMainDate("");
    setPhone("");
    setAdditionalComments("");
    setSupervisorSignature("");
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="tools-drawer"
    >
      <div className={`${poppins.className} w-full flex flex-col p-10`}>
        <h1 className="flex flex-row gap-x-3 font-bold text-2xl">
          <span
            onClick={() => onClose()}
            className="flex flex-col justify-center align-middle"
          >
            <Image src={"/back.png"} width={12} height={21} alt="Back" />
          </span>{" "}
          {edit ? "Edit Report" : "Add Report"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Employee Name</label>
            <Select
              options={employeeOpt}
              value={employee}
              onChange={(e) => setEmployee(e)}
              className={poppins.className}
              required={true}
              isDisabled={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Job</label>
            <input
              type="text"
              className="p-2 cus-tool-form"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date of Accident</label>
            <DatePicker
              required={true}
              selected={date}
              className="p-2 cus-tool-form"
              onChange={(value) => setDate(value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Time Picker</label>
            <TimePicker
              required={true}
              value={time}
              onChange={(value) => setTime(value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Supervisor Name</label>
            <Select
              required={true}
              value={supervisor}
              options={employeeOpt}
              onChange={(value) => setSupervisor(value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Witness</label>
            <input
              type="text"
              className="p-2 cus-tool-form"
              required={true}
              value={witness}
              onChange={(e) => setWitness(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">
              Brief Description of Accident
            </label>
            <input
              type="text"
              className="p-2 cus-tool-form"
              required={true}
              value={briefDescription}
              onChange={(e) => setBriefDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Body Parts Affected</label>
            <input
              type="text"
              className="p-2 cus-tool-form"
              required={true}
              value={bodyPartsAffected}
              onChange={(e) => setBodyPartsAffected(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 questions">
            <p>Did the injured employee(s) see a Doctor?</p>
            <Select
              required={true}
              value={doctor}
              options={agreeOpt}
              onChange={(value) => setDoctor(value)}
            />
          </div>
          {doctor.value == "yes" ? (
            <div className="flex flex-col w-1/2 gap-2 questions">
              <p>
                If yes, did you file an employer&apos;s portion of a
                worker&apos;s compensation form?
              </p>
              <Select
                required={true}
                value={compensationForm}
                options={agreeOpt}
                onChange={(value) => setCompensationForm(value)}
              />
            </div>
          ) : null}
          <div className="flex flex-col w-1/2 gap-2 questions">
            <p>Did the injured employee(s) go home during their work shift?</p>
            <Select
              required={true}
              value={leftShift}
              options={agreeOpt}
              onChange={(value) => setLeftShift(value)}
            />
          </div>
          {leftShift.value == "yes" ? (
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Date when Left</label>
              <DatePicker
                required={true}
                selected={leftDate}
                onChange={(value) => setLeftDate(value)}
                className="p-2 cus-tool-form"
              />
              <label style={{ marginTop: "10px" }}>Time when Left</label>
              <TimePicker
                required={true}
                value={leftTime}
                onChange={(value) => setLeftTime(value)}
              />
            </div>
          ) : null}
          <div className="flex flex-col w-1/2 gap-2 questions">
            <label className="font-semibold">Supervisor Comments</label>
            <input
              type="text"
              required={true}
              className="p-2 cus-tool-form"
              value={supervisorComments}
              onChange={(e) => setSupervisorComments(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 questions">
            <p>What could have been done to prevent this accident/incident?</p>
            <input
              type="text"
              className="p-2 cus-tool-form"
              required={true}
              value={preventAccident}
              onChange={(e) => setPreventAccident(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 questions">
            <p>Have the unsafe conditions been corrected?</p>
            <Select
              required={true}
              value={unsafeConditions}
              options={agreeOpt}
              onChange={(value) => setUnsafeConditions(value)}
            />
          </div>
          {unsafeConditions.value == "yes" ? (
            <div className="flex flex-col w-1/2 gap-2 questions">
              <p>If yes, what has been done?</p>
              <input
                className="p-2 cus-tool-form"
                value={unsafeConditionsComments}
                onChange={(e) => setUnsafeConditionsComments(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex flex-col w-1/2 gap-2 questions">
              <p>If no, what needs to be done?</p>
              <input
                className="p-2 cus-tool-form"
                value={unsafeConditionsComments}
                onChange={(e) => setUnsafeConditionsComments(e.target.value)}
              />
            </div>
          )}
          <div className="flex flex-col w-1/2 gap-2 questions">
            <label className="font-semibold">
              Employer or Supervisor&apos;s Signature
            </label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              required={true}
              value={supervisorSignature}
              onChange={(e) => setSupervisorSignature(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date</label>
            <DatePicker
              required={true}
              selected={mainDate}
              onChange={(value) => setMainDate(value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Phone</label>
            <input
              type="tel"
              className="p-2 cus-tool-form"
              required={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 questions  ">
            <label className="font-semibold">Additional Comments</label>
            <input
              type="text"
              className="p-2 cus-tool-form"
              required={true}
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Save" : "Add Report"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default AccidentReportDrawer;
