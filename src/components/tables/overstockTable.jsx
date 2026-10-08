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
// import "./table.scss";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import RequestModal from "../modals/requestModal";
// import OverstockDrawer from "../drawers/overstockDrawer";
// import NeedTagDrawer from "../drawers/needTagDrawer";

function OverstockTable({ overstock, refreshData, user }) {
  const [openFlag, setOpenFlag] = useState(false);
  const [overstockId, setOverstockId] = useState(false);
  const [item, setItem] = useState(false);
  //   const [editData, setEditData] = useState("");
  //   const openEmpModal = (data) => {
  //     setEditData(data);
  //     setOpenFlag(!openFlag);
  //   };
  //   const deleteNeedTag = (idObj) => {
  //     Swal.fire({
  //       icon: "warning",
  //       text: "Are you sure you want to delete this?",
  //       showCancelButton: true,
  //       showConfirmButton: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         axios
  //           .delete(`${apiPath.prodPath}/api/overstock/${idObj}`)
  //           .then((res) => {
  //             if (res.data.error) {
  //               Swal.fire({
  //                 icon: "error",
  //                 text: "Unable to delete",
  //               });
  //             }
  //             if (res.data.error == false) {
  //               Swal.fire({
  //                 icon: "success",
  //                 text: "Deleted Successfully",
  //               });
  //               refreshData();
  //             }
  //           });
  //       }
  //     });
  //   };
  const handleRequest = (item) => {
    setItem(item);
    setOverstockId(item.id);
    setOpenFlag(true);
  };
  return (
    <section>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Actions</TableCell> */}
              <TableCell>Overstock Categories</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>EST Avail</TableCell>
              <TableCell>Request Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overstock.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {/* <TableCell>
                    <div className="action-wrap">
                      <span
                        onClick={() => {
                          deleteNeedTag(row.id);
                        }}
                      >
                        &#10005;
                      </span>
                      <span
                        onClick={() => {
                          openEmpModal(row);
                        }}
                      >
                        &#9998;
                      </span>
                    </div>
                  </TableCell> */}
                  <TableCell>{row.overstockCategory}</TableCell>
                  <TableCell>{row.itemDesc}</TableCell>
                  <TableCell>{row.estAvail}</TableCell>
                  <TableCell>
                    <button
                      className="bg-orange-400 text-white font-semibold p-2 rounded-xl"
                      onClick={() => handleRequest(row)}
                    >
                      Request Item
                    </button>
                  </TableCell>
                  {openFlag && overstockId == row.id ? (
                    <RequestModal
                      item={item}
                      handleClose={() => setOpenFlag(false)}
                      open={openFlag}
                      overstockId={overstockId}
                      user={user}
                    />
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <OverstockDrawer
        open={openFlag}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
        id={editData.id}
      /> */}
    </section>
  );
}

export default OverstockTable;
