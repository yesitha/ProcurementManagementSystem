import React, { useEffect, useState } from "react";
import styles from "./createInvoice2.module.css";
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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link as Routerlink, useParams } from "react-router-dom";
import { CreateInvoice, GetInvoiceItemDetails } from "../../../services/Vendor/Vendorservices";
import { MoneyFormat } from "../../../services/dataFormats";

const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

const columns = [
  { id: "ItemID", label: "Item ID", Width: 100, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 150, align: "center" },
  { id: "specification", label: "Specification", Width: 150, align: "center" },
  { id: "OrderQ", label: "Ordered Qty", Width: 150, align: "center" },
  { id: "ShippedQ", label: "Shipped Qty", Width: 150, align: "center" },
  { id: "ReceivedQ", label: "Received Qty", Width: 150, align: "center" },
  {
    id: "TReceivedQ",
    label: "Current Total Received Qty",
    Width: 200,
    align: "center",
  },
  { id: "UnitPrice", label: "Unit Price", Width: 150, align: "center" },
  { id: "Amount", label: "Amount", Width: 150, align: "center" },
];

export default function CreateInvoice2() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { poId, grnId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetInvoiceItemDetails(poId, grnId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  console.log(data.invoiceExists);

  const createinvoice = async () => {
    try {
      await CreateInvoice(
        grnId
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          CREATE INVOICE
        </div>
        <div className={styles.POID}>
          <Typography sx={{ marginLeft: "10px" }}>
            PURCHASE ORDER ID: {poId}
          </Typography>
        </div>
        <div className={styles.divide}>
          <div className={styles.POID}>
            <Typography sx={{ marginLeft: "10px" }}>GRN ID: {grnId}</Typography>
          </div>
          <div className={styles.dropDown}></div>
        </div>
        <div style={{ height: "50px" }}></div>

        <div className={styles.afmpp_table}>
          <Paper
            sx={{
              marginLeft: "20px",
              width: "98%",
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
                  {data.result &&
                    data.result
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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            {row.specification}
                          </TableCell>
                          <TableCell align="center">
                            {row.orderedQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {row.shipped_Qty}
                          </TableCell>
                          <TableCell align="center">
                            {row.received_Qty}
                          </TableCell>
                          <TableCell align="center">
                            {row.totalReceived_Qty}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue * row.received_Qty)}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={10}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>

        <div style={{ display: "flex", justifyContent: "right" }}>
          {!data.invoiceExists ? (
            <Routerlink to={`/send-invoice/${grnId}`}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#205295",
                  borderRadius: "50px",
                  width: "200px",
                  height: "48px",
                  marginTop: "40px",
                }}
                onClick={createinvoice}
              >
                Create Invoice
              </Button>
            </Routerlink>
          ) : (
            <Routerlink to={`/send-invoice/${grnId}`}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#205295",
                  borderRadius: "50px",
                  width: "200px",
                  height: "48px",
                  marginTop: "40px",
                }}
              >
                View Invoice
              </Button>
            </Routerlink>
          )}
        </div>
      </div>
    </div>
  );
}
