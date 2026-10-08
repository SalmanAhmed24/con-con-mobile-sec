import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Swal from "sweetalert2";
import moment from "moment";
import { format, parseISO } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ToolReturnTable({ toolReturn, loading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 50 }}>Date</TableCell>
                <TableCell style={{ minWidth: 50 }}>Time</TableCell>
                <TableCell style={{ minWidth: 110 }}>
                  Person Requested
                </TableCell>
                <TableCell style={{ minWidth: 110 }}>Tool Request</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolReturn.length == 0 ? (
                <TableRow>
                  <TableCell className="w-[200px]">
                    No Tool Return Found
                  </TableCell>
                </TableRow>
              ) : (
                toolReturn
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ minWidth: 50 }}>
                          {format(i.date, "MM-dd-yyyy")}
                        </TableCell>
                        <TableCell style={{ minWidth: 50 }}>{i.time}</TableCell>
                        <TableCell style={{ minWidth: 110 }}>
                          {i.user}
                        </TableCell>
                        <TableCell style={{ minWidth: 110 }}>
                          {i.toolRequest.map((inner) => {
                            return (
                              <div key={inner.id}>tool# {inner.toolNumber}</div>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={toolReturn.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
