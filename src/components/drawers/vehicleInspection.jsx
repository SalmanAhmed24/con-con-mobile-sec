import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { CheckboxGroup } from "react-rainbow-components";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function VehicleInspectionDrawer({
  addVehicleInspection,
  open,
  onClose,
  user,
  editItemId,
  edit,
  editData,
}) {
  const [date, setDate] = useState(new Date());
  const [employeeOpt, setEmployeeOpt] = useState("");
  const [vehicleOpt, setVehicleOpt] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [employee, setEmployee] = useState("");
  const [mileage, setMileage] = useState("");
  const [amenities, setAmenities] = useState("");
  const [damage, setDamage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [signedBy, setSignedBy] = useState("");
  const amenitiesOpt = [
    { value: "headLights", label: "Head Lights", disabled: false },
    { value: "tailLights", label: "Tail Lights", disabled: false },
    { value: "brakeLights", label: "Brake Lights", disabled: false },
    { value: "reflectors", label: "Reflectors", disabled: false },
    { value: "tiresRims", label: "Tires Rims", disabled: false },
    { value: "battery", label: "Battery", disabled: false },
    { value: "radiator", label: "Radiator", disabled: false },
    { value: "exhaustSystem", label: "Exhaust System", disabled: false },
    { value: "suspension", label: "Suspension", disabled: false },
    { value: "fuelSystem", label: "Fuel System", disabled: false },
    { value: "leaks", label: "Leaks", disabled: false },
    { value: "waterLevel", label: "Water Level", disabled: false },
    { value: "tranmission", label: "Tranmission", disabled: false },
    { value: "gauges", label: "Gauges", disabled: false },
    { value: "horn", label: "Horn", disabled: false },
    { value: "windShield", label: "Wind Shield", disabled: false },
    { value: "windshieldWipers", label: "Windshield Wipers", disabled: false },
    { value: "speedometer", label: "Speedometer", disabled: false },
    { value: "steering", label: "Steering", disabled: false },
    { value: "brakeSystem", label: "Brake System", disabled: false },
    { value: "seatBelts", label: "Seat Belts", disabled: false },
    { value: "seats", label: "Seats", disabled: false },
    { value: "mirrors", label: "Mirrors", disabled: false },
    { value: "safetyEquipment", label: "Safety Equipment", disabled: false },
    { value: "accidentKit", label: "Accident Kit", disabled: false },
    { value: "other", label: "Other", disabled: false },
  ];
  useEffect(() => {
    if (edit == false) {
      resetValues("");
    }
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setEmployee({ label: user.fullname, value: user.fullname });
        setDate(new Date());
        setEmployeeOpt(
          res.data.allUsers
            .map((i) => {
              return { label: i.fullname, value: i.fullname };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/vehicles`)
      .then((res) => {
        setVehicleOpt(
          res.data.vehicles
            .map((i) => {
              return { label: i.vehicleNo, value: i.vehicleNo };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setDate(new Date(editData.date));
      setEmployee({ label: editData.employee, value: editData.employee });
      setVehicle({ label: editData.vehicle, value: editData.vehicle });
      setMileage(editData.mileage);
      setDamage(editData.damage);
      setRemarks(editData.remarks);
      setSignedBy({ label: editData.signedBy, value: editData.signedBy });
      let arr = [
        { value: editData.headLights, label: "headLights" },
        { value: editData.tailLights, label: "tailLights" },
        { value: editData.brakeLights, label: "brakeLights" },
        { value: editData.reflectors, label: "reflectors" },
        { value: editData.tiresRims, label: "tiresRims" },
        { value: editData.battery, label: "battery" },
        { value: editData.radiator, label: "radiator" },
        { value: editData.exhaustSystem, label: "exhaustSystem" },
        { value: editData.suspension, label: "suspension" },
        { value: editData.fuelSystem, label: "fuelSystem" },
        { value: editData.leaks, label: "leaks" },
        { value: editData.waterLevel, label: "waterLevel" },
        { value: editData.tranmission, label: "tranmission" },
        { value: editData.gauges, label: "gauges" },
        { value: editData.horn, label: "horn" },
        { value: editData.windShield, label: "windShield" },
        { value: editData.windshieldWipers, label: "windshieldWipers" },
        { value: editData.speedometer, label: "speedometer" },
        { value: editData.steering, label: "steering" },
        { value: editData.brakeSystem, label: "brakeSystem" },
        { value: editData.seatBelts, label: "seatBelts" },
        { value: editData.seats, label: "seats" },
        { value: editData.mirrors, label: "mirrors" },
        { value: editData.safetyEquipment, label: "safetyEquipment" },
        { value: editData.accidentKit, label: "accidentKit" },
        { value: editData.other, label: "other" },
      ];
      const filteredAmeneties = arr.filter((i) => i.value == true);

      setAmenities(filteredAmeneties.map((i) => i.label));
    }
  }, [open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      date,
      employee: employee.value,
      vehicle: vehicle.value,
      mileage,
      headLights: amenities.length
        ? amenities.filter((i) => i == "headLights").length > 0
          ? true
          : false
        : false,
      tailLights: amenities.length
        ? amenities.filter((i) => i == "tailLights").length
          ? true
          : false
        : false,
      turnSignals: amenities.length
        ? amenities.filter((i) => i == "turnSignals").length
          ? true
          : false
        : false,
      brakeLights: amenities.length
        ? amenities.filter((i) => i == "brakeLights").length
          ? true
          : false
        : false,
      reflectors: amenities.length
        ? amenities.filter((i) => i == "reflectors").length
          ? true
          : false
        : false,
      tiresRims: amenities.length
        ? amenities.filter((i) => i == "tiresRims").length
          ? true
          : false
        : false,
      battery: amenities.length
        ? amenities.filter((i) => i == "battery").length
          ? true
          : false
        : false,
      radiator: amenities.length
        ? amenities.filter((i) => i == "radiator").length
          ? true
          : false
        : false,
      exhaustSystem: amenities.length
        ? amenities.filter((i) => i == "exhaustSystem").length
          ? true
          : false
        : false,
      suspension: amenities.length
        ? amenities.filter((i) => i == "suspension").length
          ? true
          : false
        : false,
      fuelSystem: amenities.length
        ? amenities.filter((i) => i == "fuelSystem").length
          ? true
          : false
        : false,
      leaks: amenities.length
        ? amenities.filter((i) => i == "leaks").length
          ? true
          : false
        : false,
      waterLevel: amenities.length
        ? amenities.filter((i) => i == "waterLevel").length
          ? true
          : false
        : false,
      tranmission: amenities.length
        ? amenities.filter((i) => i == "tranmission").length
          ? true
          : false
        : false,
      gauges: amenities.length
        ? amenities.filter((i) => i == "gauges").length
          ? true
          : false
        : false,
      horn: amenities.length
        ? amenities.filter((i) => i == "horn").length
          ? true
          : false
        : false,
      windShield: amenities.length
        ? amenities.filter((i) => i == "windShield").length
          ? true
          : false
        : false,
      windshieldWipers: amenities.length
        ? amenities.filter((i) => i == "windshieldWipers").length
          ? true
          : false
        : false,
      speedometer: amenities.length
        ? amenities.filter((i) => i == "speedometer").length
          ? true
          : false
        : false,
      steering: amenities.length
        ? amenities.filter((i) => i == "steering").length
          ? true
          : false
        : false,
      brakeSystem: amenities.length
        ? amenities.filter((i) => i == "brakeSystem").length
          ? true
          : false
        : false,
      seatBelts: amenities.length
        ? amenities.filter((i) => i == "seatBelts").length
          ? true
          : false
        : false,
      seats: amenities.length
        ? amenities.filter((i) => i == "seats").length
          ? true
          : false
        : false,
      heater: amenities.length
        ? amenities.filter((i) => i == "heater").length
          ? true
          : false
        : false,
      mirrors: amenities.length
        ? amenities.filter((i) => i == "mirrors").length
          ? true
          : false
        : false,
      safetyEquipment: amenities.length
        ? amenities.filter((i) => i == "safetyEquipment").length
          ? true
          : false
        : false,
      accidentKit: amenities.length
        ? amenities.filter((i) => i == "accidentKit").length
          ? true
          : false
        : false,
      other: amenities.length
        ? amenities.filter((i) => i == "other").length
          ? true
          : false
        : false,
      signedBy: signedBy.value,
      damage,
      remarks,
    };
    addVehicleInspection(dataObj, edit, editItemId);
    onClose();
    resetValues();
  };
  const resetValues = () => {
    setDate("");
    setEmployee("");
    setVehicle("");
    setAmenities("");
    setMileage("");
    setDamage("");
    setRemarks("");
    setSignedBy("");
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
          </span>
          {edit ? "Edit Vehicle Inspection" : "Add Vehicle Inspection"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date</label>
            <DatePicker
              required={true}
              selected={date}
              onChange={(value) => setDate(value)}
              disabled={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className={poppins.className}>Employee</label>
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
            <label className="font-semibold">Vehicle</label>
            <Select
              options={vehicleOpt}
              value={vehicle}
              onChange={(e) => setVehicle(e)}
              className={poppins.className}
              required={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Mileage</label>
            <input
              type="text"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>

          <div className="flex flex-col w-1/4 gap-2">
            <p className={poppins.className}>Check box if issue</p>
            <CheckboxGroup
              id="checkbox-group-1"
              options={amenitiesOpt}
              value={amenities}
              onChange={(value) => setAmenities(value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Damage</label>
            <input
              type="text"
              onChange={(e) => setDamage(e.target.value)}
              required={true}
              value={damage}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Remarks</label>
            <input
              value={remarks}
              type="text"
              onChange={(e) => setRemarks(e.target.value)}
              required={true}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Signed By</label>
            <Select
              options={employeeOpt}
              value={signedBy}
              onChange={(value) => setSignedBy(value)}
              required={true}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Save" : "Add"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default VehicleInspectionDrawer;
