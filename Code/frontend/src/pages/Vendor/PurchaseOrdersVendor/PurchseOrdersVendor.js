import React, { useEffect, useState } from "react";
import styles from "./PurchaseOrdersVendor.module.css";
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
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetPurchaseOrdersByVendorId } from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  {
    id: "POID",
    label: "Purchase Order ID",
    Width: 300,
    align: "center",
  },
  { id: "Date", label: "Date", Width: 300, align: "center" },
  { id: "TotalValue", label: "Total Value", Width: 300, align: "center" },
  {
    id: "VerificationStatus",
    label: "Verification Status",
    Width: 300,
    align: "center",
  },
  { id: "verification", label: "Verification", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function createData(POID, Date, TotalValue, Action) {
  return { POID, Date, TotalValue, Action };
}

const rows = [
  createData(
    "MPPID1000",
    "2021/01/01",
    "50000",
    <Routerlink to={"/PurchaseOrder-vendor-view"}>
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

    "2021/06/02",
    "Rs.400000",
    <Routerlink to={"/PurchaseOrder-vendor-view"}>
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

function PurchaseOrdersVendor() {
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

  const { vendorId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetPurchaseOrdersByVendorId(vendorId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div className={styles.vfmpp_mainBody}>
        <div className={styles.vfmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          PURCHASE ORDERS
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
                        >
                          <TableCell align="center">{row.poId}</TableCell>
                          <TableCell align="center">
                            {DateFormat(row.date)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.totalAmount)}
                          </TableCell>
                          <TableCell align="center">
                            {row.procuementOfficerStatus}
                          </TableCell>
                          <TableCell align="center">
                            {
                              <Routerlink
                                to={`/po-verification-submit/${row.poId}`}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    width: 70,
                                    height: 30,
                                    borderRadius: "20px",
                                  }}
                                >
                                  Submit
                                </Button>
                              </Routerlink>
                            }
                          </TableCell>
                          <TableCell align="center">
                            {
                              <Routerlink to={`/PurchaseOrder-vendor-view/${row.poId}`}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    borderRadius: "20px",
                                    height: 30,
                                    width: 70,
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

export default PurchaseOrdersVendor;
