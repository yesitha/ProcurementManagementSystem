import React from "react";
import styles from "./invoicesneedtobePaid.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Visibility from "./Visibility";
import { Link as Routerlink } from "react-router-dom";
import { GetInvoicesList } from "../../../services/FinanceDivision Accountant/FinanceDivisionAccountantServices";
import { useState } from "react";
import { useEffect } from "react";
import { MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "InvoiceID", label: "Invoice ID", Width: 300, align: "center" },
  { id: "VendorName", label: "Vendor Name", Width: 300, align: "center" },
  { id: "tax", label: "Tax Amount", Width: 300, align: "center" },
  { id: "total", label: "Total", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
  { id: "PaymentStatus", label: "Payment Status", Width: 300, align: "center" },
];
function createData(InvoiceID, VendorName, tax, total, Action, PaymentStatus) {
  return { InvoiceID, VendorName, tax, total, Action, PaymentStatus };
}

const rows = [
  createData(
    "I0017",
    "Namal",
    <Routerlink to={"/upload-payment-vouchar"}>
      <Visibility />
    </Routerlink>,
    "Success"
  ),
  createData(
    "I0020",
    "Amal",
    <Routerlink to={"/upload-payment-vouchar"}>
      <Visibility />
    </Routerlink>,
    "Pending"
  ),
];

export default function InvoicesneedtobePaid() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetInvoicesList();

        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          Invoices To Be Paid
        </div>

        <div className={styles.afmpp_table}>
          <Paper
            sx={{
              marginLeft: "30px",
              width: "70%",
              overflow: "auto",
              borderRadius: 5,
              scrollBehavior: "smooth",
              marginTop: "50px",
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
                          <TableCell align="center">{row.invoiceId}</TableCell>
                          <TableCell align="center">{row.vendorName}</TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.tax)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.total)}
                          </TableCell>

                          <TableCell align="center">
                          <Routerlink to={`/upload-payment-vouchar/${row.invoiceId}`}>
                              <Visibility />
                            </Routerlink>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              color:
                                row.paymentStatus === "pending"
                                  ? "red"
                                  : row.paymentStatus === "success"
                                  ? "green"
                                  : "black",
                            }}
                          >
                            {row.paymentStatus}
                          </TableCell>
                          <TableCell align="center">
                            {row.expectedDeliveryDate}
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
