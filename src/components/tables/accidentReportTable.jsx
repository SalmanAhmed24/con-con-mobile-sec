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
import moment from "moment";
import AccidentReportDrawer from "../drawers/accidentReport-add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { EditIcon } from "lucide-react";
function AccidentReportTable({
  accidentReport,
  deleteData,
  refreshData,
  userInfo,
  addAccidentReport,
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
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  return (
    <section>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "100px" }}>Actions</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Employee</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Job Title</TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Date Of Accident
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Time Of Accident
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>Supervisor</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Witness</TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Brief Description
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Body Parts Affected
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>Doctor</TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Compensation form
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>Left Shift</TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Left Shift Date
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Left Shift Time
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Supervisor Comments
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Supervisor Signature
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Prevent Accident
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Unsafe Conditions
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Unsafe Conditions Comments
              </TableCell>
              <TableCell style={{ minWidth: "250px" }}>Date</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Phone</TableCell>
              <TableCell style={{ minWidth: "250px" }}>
                Additional Comments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accidentReport
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>
                      <div className="flex flex-row gap-2">
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
                    <TableCell>{row.employee}</TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>
                      {moment(row.date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>{tConvert(row.time)}</TableCell>
                    <TableCell>{row.supervisor}</TableCell>
                    <TableCell>{row.witness}</TableCell>
                    <TableCell>{row.briefDescription}</TableCell>
                    <TableCell>{row.bodyPartsAffected}</TableCell>
                    <TableCell>{row.doctor == true ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {row.compensationForm == true ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {row.leftShift == true ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {row.leftDate == null
                        ? "N/A"
                        : moment(row.leftDate).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>
                      {row.leftTime == null ? "N/A" : tConvert(row.leftTime)}
                    </TableCell>
                    <TableCell>{row.supervisorComments}</TableCell>
                    <TableCell>{row.supervisorSignature}</TableCell>
                    <TableCell>{row.preventAccident}</TableCell>
                    <TableCell>
                      {row.unsafeConditions == true ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>{row.unsafeConditionsComments}</TableCell>
                    <TableCell>
                      {moment(row.mainDate).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.additionalComments}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <AccidentReportDrawer
            addAccidentReport={addAccidentReport}
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
        count={accidentReport.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}

export default AccidentReportTable;
