import React from "react";
import styles from "./uploadPaymentVoucher.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetInvoiceDetails } from "../../../services/FinanceDivision Accountant/FinanceDivisionAccountantServices";
import { useState } from "react";
import { useEffect } from "react";
import { MoneyFormat } from "../../../services/dataFormats";
import { DateFormat } from "../../../services/dataFormats";
import { UpdateInvoicePaymentStatus } from "../../../services/FinanceDivision Accountant/FinanceDivisionAccountantServices";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "DQty", label: "Delivered QTY", Width: 300, align: "center" },
  { id: "Desc", label: "Description", Width: 300, align: "center" },
  { id: "Uprice", label: "Unit Price", Width: 300, align: "center" },

  { id: "amt", label: "Amount", Width: 300, align: "center" },
];
function createData(ItemID, ItemName, DQty, Desc, Uprice, amt) {
  return { ItemID, ItemName, DQty, Desc, Uprice, amt };
}

function UploadPaymentVoucher() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState(null);
  const { invoiceId } = useParams();

  const vendorDetails = data?.vendorDetails;
  const companyName = vendorDetails?.companyName;
  const contact = vendorDetails?.contact;
  const address = vendorDetails?.address;
  const city = vendorDetails?.city;
  const vendorName = vendorDetails?.vendorName;
  const vendorId = vendorDetails?.vendorId;

  const invoiceDto = data?.invoiceDto;
  const date = invoiceDto?.date;
  const totalAmount = invoiceDto?.totalAmount;
  const tax = invoiceDto?.tax;
  const isPaymentStatus = invoiceDto?.isPaymentStatus;

  const result = data?.result;
  const itemId = result?.itemId;
  const itemName = result?.itemName;
  const specification = result?.specification;
  const received_Qty = result?.received_Qty;

 
  

  const handleButtonClick = () => {
    UpdateInvoicePaymentStatus(invoiceId);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetInvoiceDetails(invoiceId);

        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [invoiceId]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={styles.sideNavBar}></div>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.uppercontainer}>
            <div className={styles.tag}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Routerlink to={-1}>
                  <IconButton
                    sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
                  >
                    <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
                  </IconButton>
                </Routerlink>
                <h1 className={styles.Header}>{vendorName}</h1>
              </div>
              <Typography style={{ marginLeft: "35px" , textTransform: "uppercase"}}>
                {/* 6TH FLOOR,<br></br>
                BOC MERCHANT TOWER,<br></br>
                ST.MICHAEL'S ROAD,<br></br>
                COLOMBO 03,<br></br>
                SRI LANKA */}
                
                {companyName},<br></br>
                {vendorName},<br></br>
                {address},<br></br>
                {city},<br></br>
                {contact}
                <br></br>
              </Typography>
            </div>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>Invoice</h1>
              Date - {DateFormat(date)}
              <br></br>
              Invoice - {invoiceId}
              <br></br>
              Vendor ID - {vendorId}<br></br>
            </Typography>
          </div>
          <div className={styles.flex}>
            <div style={{ marginLeft: "35px", textTransform: "uppercase" }}>
              <Typography className={styles.tag}>
                <h1 className={styles.Header}>PUCSL</h1>
                6TH FLOOR,<br></br>
                BOC MERCHANT TOWER,<br></br>
                ST.MICHAEL'S ROAD,<br></br>
                COLOMBO 03,<br></br>
                SRI LANKA
              </Typography>
              
            </div>
            <div className={styles.payment}>
              <div>
                <Typography sx={{ fontSize: 24, color: "#0A2647" }}>
                  Upload Payment Voucher
                </Typography>
              </div>
              <div>
                <IconButton sx={{ marginLeft: "60px", width: "60px" }}>
                  <ControlPointIcon
                    sx={{ marginLeft: "5px", fontSize: 40, color: "#0A2647" }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midSection}>
          <Paper
            className={styles.baseTableContainer}
            elevation={6}
            sx={{
              mr: {
                xs: "60px",
                sm: "65px",
                md: "65px",
                lg: "68px",
                xl: "70px",
              },
              mt: "20px",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <TableContainer className={styles.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={styles.TableHeaders}>
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
                  {result &&
                    result
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
                            {row.received_Qty}
                          </TableCell>
                          <TableCell align="center">
                            {row.specification}
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
          </Paper>
        </div>
        <div
          className={styles.downSection}
          elevation={6}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          }}
        >
          <div className={styles.downcontainer}>
            <Typography>
              <h4>Other Comment</h4>
              1.Total payment due in 30 days.<br></br>
              2.Please include the invoice number on your check.
            </Typography>
            <Typography sx={{marginLeft:"500px"}}>
              <h3 >
              Sub total &nbsp;{totalAmount}
                <br></br>
               Tax Rate &nbsp;&nbsp;{(tax * 100) / totalAmount}%
                <br></br>
              Tax Due &nbsp;&nbsp;&nbsp;{tax}
                <br></br>
               Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {totalAmount + tax}
              </h3>
            </Typography>
          </div>
          <center>
            <Typography>
              if you have any concern of this invoice, please contact<br></br>
              {companyName}<br></br>{contact}<br></br>
              <b>Thank you for your Bussiness!</b>
            </Typography>
          </center>
          <div className={styles.btn}>
          <div>
      {isPaymentStatus==false ? (
        null// Render nothing if the payment status is true
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="contained"
        >
          Mark as Paid
        </Button>
      )}
    </div>
            <Button variant="contained" style={{ marginLeft: 40 }}>
              Print
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default UploadPaymentVoucher;
