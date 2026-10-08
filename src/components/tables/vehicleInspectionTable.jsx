import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { EditIcon } from "lucide-react";
import moment from "moment";
import VehicleInspectionDrawer from "../drawers/vehicleInspection";
import Swal from "sweetalert2";
function VehicleInspectionTable({
  vehicleInspection,
  deleteData,
  refreshData,
  userInfo,
  addVehicleInspection,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editData, setEditData] = useState("");
  const [drawer, setDrawer] = useState(false);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (item) => {
    setEditData(item);
    handleCloseDrawer();
  };
  return (
    <section>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Date</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Employee</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Head Lights</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Tail Lights</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Turn Signals</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Brake Lights</TableCell>
              <TableCell>Reflectors</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Tires Rim</TableCell>
              <TableCell>Battery</TableCell>
              <TableCell>Radiator</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Exhaust System
              </TableCell>
              <TableCell>Suspension</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Fuel System</TableCell>
              <TableCell>Leaks</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Water Level</TableCell>
              <TableCell>Tranmission</TableCell>
              <TableCell>Gauges</TableCell>
              <TableCell>Horn</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Wind Shield</TableCell>
              <TableCell style={{ minWidth: "170px" }}>
                Windshield Wipers
              </TableCell>
              <TableCell>Speedometer</TableCell>
              <TableCell>Steering</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Brake System</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Seat Belts</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Heater</TableCell>
              <TableCell>Mirrors</TableCell>
              <TableCell style={{ minWidth: "170px" }}>
                Safety Equipment
              </TableCell>
              <TableCell style={{ minWidth: "120px" }}>Accident Kit</TableCell>
              <TableCell>Other</TableCell>
              <TableCell>Damage</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell style={{ minWidth: "120px" }}>Signed By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleInspection
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>
                      <div className="flex flex-row gap-4">
                        <DeleteForeverIcon
                          className="text-orange-400 hover:cursor-pointer"
                          onClick={() => {
                            Swal.fire({
                              icon: "warning",
                              text: "Are you sure you want to delete the data?",
                              showCancelButton: true,
                              showConfirmButton: true,
                              cancelButtonText: "No",
                              confirmButtonText: "Yes",
                            }).then((res) => {
                              if (res.isConfirmed) {
                                deleteData(row._id);
                              }
                            });
                          }}
                        />

                        <EditIcon
                          onClick={() => handleEdit(row)}
                          className="text-orange-400 hover:cursor-pointer"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {moment(row.date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>{row.employee}</TableCell>
                    <TableCell>{row.vehicle}</TableCell>
                    <TableCell>{row.mileage}</TableCell>
                    <TableCell>{row.headLights ? "true" : "false"}</TableCell>
                    <TableCell>{row.tailLights ? "true" : "false"}</TableCell>
                    <TableCell>{row.turnSignals ? "true" : "false"}</TableCell>
                    <TableCell>{row.brakeLights ? "true" : "false"}</TableCell>
                    <TableCell>{row.reflectors ? "true" : "false"}</TableCell>
                    <TableCell>{row.tiresRims ? "true" : "false"}</TableCell>
                    <TableCell>{row.battery ? "true" : "false"}</TableCell>
                    <TableCell>{row.radiator ? "true" : "false"}</TableCell>
                    <TableCell>
                      {row.exhaustSystem ? "true" : "false"}
                    </TableCell>
                    <TableCell>{row.suspension ? "true" : "false"}</TableCell>
                    <TableCell>{row.fuelSystem ? "true" : "false"}</TableCell>
                    <TableCell>{row.leaks ? "true" : "false"}</TableCell>
                    <TableCell>{row.waterLevel ? "true" : "false"}</TableCell>
                    <TableCell>{row.tranmission ? "true" : "false"}</TableCell>
                    <TableCell>{row.gauges ? "true" : "false"}</TableCell>
                    <TableCell>{row.horn ? "true" : "false"}</TableCell>
                    <TableCell>{row.windShield ? "true" : "false"}</TableCell>
                    <TableCell>
                      {row.windshieldWipers ? "true" : "false"}
                    </TableCell>
                    <TableCell>{row.speedometer ? "true" : "false"}</TableCell>
                    <TableCell>{row.steering ? "true" : "false"}</TableCell>
                    <TableCell>{row.brakeSystem ? "true" : "false"}</TableCell>
                    <TableCell>{row.seatBelts ? "true" : "false"}</TableCell>
                    <TableCell>{row.seats ? "true" : "false"}</TableCell>
                    <TableCell>{row.heater ? "true" : "false"}</TableCell>
                    <TableCell>{row.mirrors ? "true" : "false"}</TableCell>
                    <TableCell>
                      {row.safetyEquipment ? "true" : "false"}
                    </TableCell>
                    <TableCell>{row.accidentKit ? "true" : "false"}</TableCell>
                    <TableCell>{row.other ? "true" : "false"}</TableCell>
                    <TableCell>{row.damage}</TableCell>
                    <TableCell>{row.remarks}</TableCell>
                    <TableCell>{row.signedBy}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <VehicleInspectionDrawer
            addVehicleInspection={addVehicleInspection}
            open={drawer}
            user={userInfo}
            onClose={handleCloseDrawer}
            refreshData={refreshData}
            edit={true}
            editData={editData}
            editItemId={editData._id}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={vehicleInspection.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}

export default VehicleInspectionTable;
