import React from "react";
import styles from "./MasterProcurementPlan.module.css";
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
import { Link as Routerlink } from "react-router-dom";

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
    <Routerlink to={'/PCApprovalforMasterProcurmentPlan'}>
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
    </Routerlink>
  ),
  createData(
    "MPPID1001",
    "Rs.400000",
    "2021/06/02",
    <Routerlink to={'/PCApprovalforMasterProcurmentPlan'}>
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 100 }}
    >
      View
    </Button>
    </Routerlink>
  ),
];

function MasterProcurementPlans() {

  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

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
      <div className={styles.vfmpp_mainBody}>
        <div className={styles.vfmpp_heading}>
          <Routerlink to={-1}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          </Routerlink>
          Master Procurement Plan
        </div>

        <div className={styles.vfmpp_search}>
          <SearchNoFilter />
        </div>

        {/* Add table data */}

        <div className={styles.vfmpp_table}>
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

export default MasterProcurementPlans;
