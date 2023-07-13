import React, { useEffect, useState } from "react";
import styles from "./ViewInvoices.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewNote from "../../components/Popups/DonePopup/ViewNote";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetInvoiceIdsForVendor } from "../../services/Vendor/Vendorservices";
import DownloadIcon from '@mui/icons-material/Download';
import {user} from "../Usermanage"
const vendorId=user?user.id:"";
const columns = [
  { id: "InvoiceID", label: "InvoiceID", Width: 200, align: "center" },
  { id: "GRNID", label: "GRN ID", Width: 200, align: "center" },
  { id: "PaymentStatus", label: "Payment Status", Width: 200, align: "center" },
  { id: "PaymentVEvidence", label: "Payment Voucher Evidence", Width: 200, align: "center" },
  { id: "Action", label: "Action", Width: 200, align: "center" },
];

function createData(InvoiceID, GRNID, PaymentStatus, Action) {
  return { InvoiceID, GRNID, PaymentStatus, Action };
}

const rows = [
  createData(
    "I0017",
    "544",
    "Success",
    <Routerlink to={"/invoice"}>
      <IconButton
        sx={{ width: "40px", height: "40px", px: 0.5 }}
        className={styles.rejectButton}
      >
        <VisibilityIcon />
      </IconButton>
    </Routerlink>
  ),
];

export default function ViewInvoices() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const { vendorId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetInvoiceIdsForVendor(vendorId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (data===null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.afmpp_heading}>
        <Routerlink to={-1}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Routerlink>
        View Invoices
      </div>

      <div className={styles.afmpp_table}>
        <Paper
          sx={{
            marginLeft: "70px",
            width: "70%",
            overflow: "auto",
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{row.invoiceId}</TableCell>
                        <TableCell align="center">{row.grnId}</TableCell>
                        <TableCell align="center">
                          {row.paymentStatus}
                        </TableCell>
                        <TableCell align="center">
                        <IconButton><DownloadIcon/></IconButton>
                        </TableCell>
                        <TableCell align="center">
                          {
                            <Routerlink to={`/invoice-view/${row.invoiceId}`}>
                              <IconButton
                                sx={{ width: "40px", height: "40px", px: 0.5 ,color: '#205295'}}
                                className={styles.rejectButton}
                              >
                                <VisibilityIcon />
                              </IconButton>
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
  );
}
