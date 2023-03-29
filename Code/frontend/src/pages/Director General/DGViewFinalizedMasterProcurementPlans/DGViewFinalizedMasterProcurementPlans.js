import React from "react";
import styles from "./DGViewFinalizedMasterProcurementPlans.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchNoFilter from "../../../components/Search/Search";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "MPPID",
    label: "Master Procurement Plan ID",
    Width: 300,
    align: "center",
  },
  { id: "GTotal", label: "Grand Total", Width: 300, align: "center" },
  { id: "CDate", label: "Creation Date", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function createData(MPPID, GTotal, CDate, Action) {
  return { MPPID, GTotal, CDate, Action };
}

const rows = [
  createData(
    "MPPID1000",
    "Rs.650000",
    "2021/01/01",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1001",
    "Rs.400000",
    "2021/06/02",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1002",
    "Rs.800000",
    "2022/01/01",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1003",
    "Rs.350000",
    "2022/04/04",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1004",
    "Rs.500000",
    "2022/08/05",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1005",
    "Rs.600000",
    "2022/10/06",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1006",
    "Rs.450000",
    "2023/01/01",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
  createData(
    "MPPID1007",
    "Rs.700000",
    "2023/03/01",
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
  ),
];

function DGViewFinalizedMasterProcurementPlans() {
  const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    designation: "Financial Division HOD",
    department: "Finance",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City, 123456",
    gender: "Male",
    profilePic: "https://www.w3schools.com/howto/img_avatar.png",
  };

  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

  //========================================================

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className={styles.dgvfmpp_mainBody}>
        <div className={styles.dgvfmpp_heading}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          View Finalized Master Procurement Plans
        </div>

        <div className={styles.dgvfmpp_search}>
          <SearchNoFilter />
        </div>

        {/* Add table data */}

        <div className={styles.dgvfmpp_table}>
          <Paper
            sx={{
              width: "75%",
              overflow: "hidden",
              borderRadius: 5,
              scrollBehavior: "smooth",
            }}
          >
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={styles.TableHeaders0}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ maxWidth: column.Width }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default DGViewFinalizedMasterProcurementPlans;
