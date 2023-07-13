import styles from "./InvoicestobePaidFin.module.css";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import { users } from "../../../users/SystemUsers";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  IconButton,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link as Routerlink } from "react-router-dom";
import { InvoicesPaid, InvoicesToBePay } from "../../../services/ProcurementHOD/ProcurementHODServices";
import { MoneyFormat } from "../../../services/dataFormats";
import DownloadIcon from '@mui/icons-material/Download';


const rows = users;

function InvoicestobePaid() {

  const [leftdata, setleftdata] = useState([]);
  const [rightdata, setrightdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await InvoicesToBePay();
        const leftdata = response;
        setleftdata(leftdata);
        console.log(leftdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await InvoicesPaid();
        const rightdata = response;
        setrightdata(rightdata);
        console.log(rightdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);


  return (
    <div>
      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>Invoices to be Paid</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <Container
            className={styles.MiddleSection}
            sx={{
              display: "flex",
              pt: 4,
              flexDirection: { xs: "column", lg: "row" },
            }}
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div className={styles.leftTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="left table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Grand Total</TableCell>
                      <TableCell>Vendor Name</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftdata &&
                      leftdata.map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="center">{row.invoiceId}</TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.total + row.tax)}
                          </TableCell>
                          <TableCell align="center">{row.vendorName}</TableCell>
                          <TableCell align="center">
                            {<Routerlink to={`/view-invoice/${row.invoiceId}`}><IconButton><VisibilityIcon sx={{ color: "#205295" }} /></IconButton></Routerlink>}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div
              className="ArrowSection"
              style={{ alignSelf: "center", margin: 10 }}
            >
              <DoubleArrowIcon
                style={{ fontSize: 50 }}
                sx={{
                  transform: {
                    xs: "rotate(90deg)",
                    sm: "rotate(90deg)",
                    lg: "rotate(0deg)",
                  },
                }}
              />{" "}
            </div>
            <div className={styles.rightTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="right table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Grand Total</TableCell>
                      <TableCell>Vendor Name</TableCell>
                      <TableCell>Payment status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightdata &&
                      rightdata
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="center">{row.invoiceId}</TableCell>
                          <TableCell align="center">{MoneyFormat(row.total+row.tax)}</TableCell>
                          <TableCell align="center">{row.vendorName}</TableCell>
                          <TableCell align="center" style={{ color: '#227C70' }}>{row.paymentStatus}</TableCell>
                          <TableCell align="center">
                            {<IconButton><DownloadIcon/></IconButton>}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default InvoicestobePaid;
