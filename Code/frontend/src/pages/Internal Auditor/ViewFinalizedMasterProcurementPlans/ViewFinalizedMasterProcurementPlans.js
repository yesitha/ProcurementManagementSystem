import React from "react";
import styles from "./ViewFinalizedMasterProcurementPlans.module.css";
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
import { useEffect, useState } from "react";
import { GetFinalizedMasterProcurementPlan } from "../../../services/InternalAuditor/InternalAuditorServices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  {
    id: "MPPID",
    label: "Master Procurement Plan ID",
    Width: 300,
    align: "center",
  },
  { id: "GTotal", label: "Grand Total", Width: 300, align: "center" },
  {
    id: "estGrandTotal",
    label: "Estimated Grand Total",
    Width: 300,
    align: "center",
  },
  { id: "CDate", label: "Creation Date", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function DisplayDate({ date }) {
  const formattedDate = date?.substring(0, 10); // Extract only the date portion
  return (
    <Stack component="form" noValidate spacing={3} alignItems="center">
      <TextField
        id="date"
        label="Creation Date"
        type="date"
        align="center"
        value={formattedDate}
        sx={{ width: 200, height: 50 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}

function ViewFinalizedMasterProcurementPlans() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetFinalizedMasterProcurementPlan();
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          View Finalized Master Procurement Plans
        </div>

        <div className={styles.vfmpp_search}>
          <SearchNoFilter />
        </div>

        {/* Add table data */}

        <div className={styles.vfmpp_table}>
          <Paper
            sx={{
              width: "90%",
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
                  {data &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#FFFFFF" : "#F2F2F2",
                          }}
                        >
                          <TableCell align="center">{row.mppId}</TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.grandTotal)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.estimatedGrandTotal)}
                          </TableCell>
                          <TableCell align="center">
                            <DisplayDate date={row.creationDate}/>
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            {
                              <Routerlink
                              to={
                                `/audit-finalized-master-procurementplan/${row.mppId}`
                              }
                            >
                                <Button
                                  variant="contained"
                                  fontFamily={"Inter"}
                                  sx={{
                                    bgcolor: "#205295",
                                    borderRadius: 5,
                                    height: 50,
                                    width: 100,
                                  }}
                                >
                                  View
                                </Button>
                              </Routerlink>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={data ? data.length : 0}
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

export default ViewFinalizedMasterProcurementPlans;
