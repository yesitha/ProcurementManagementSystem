import React, { useEffect, useState } from "react";
import styles from "./sendInvoice.module.css";
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
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetInvoiceDetails } from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 100, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 150, align: "center" },
  { id: "specification", label: "Specification", Width: 150, align: "center" },
  { id: "ReceivedQ", label: "Received Qty", Width: 150, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 150, align: "center" },
  { id: "Amount", label: "Amount", Width: 150, align: "center" },
];
function createData(ItemID, ItemName, DQty, Desc, Uprice, Taxed, amt) {
  return { ItemID, ItemName, DQty, Desc, Uprice, Taxed, amt };
}
const rows = [
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
  createData("I0014", "A4 Papers", "500", "GSm 80", "5", "400", "5000"),
];

function Invoice() {
  const {grnId } = useParams();
  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetInvoiceDetails(grnId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (data && data.result) {
      calculateTotalAmount(data.result);
    }
  }, [data]);

  const calculateTotalAmount = (result) => {
    let total = 0;
    result.forEach((row) => {
      total += row.bidValue * row.received_Qty;
    });
    setTotalAmount(total);
  };

  if (data===null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ overflowX: "hidden" }}>


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
                <h1 className={styles.Header}>{data.vendorDetails.vendorName}</h1>
              </div>
              <Typography style={{ marginLeft: "35px" }}>
              {data.vendorDetails.companyName}<br></br>
              {data.vendorDetails.address}<br></br>
              {data.vendorDetails.city}<br></br>
              {data.vendorDetails.contact}
              </Typography>
            </div>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>Invoice</h1>
              Date - {DateFormat(data.invoiceDto.date)}<br></br>
              Invoice - {data.invoiceDto.invoiceId}
            </Typography>
          </div>
          <div style={{ marginLeft: "35px" }}>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>Bill To</h1>
                PUCSL<br></br>
                6TH FLOOR,<br></br>
                BOC MERCHANT TOWER,<br></br>
                ST.MICHAEL'S ROAD,<br></br>
                COLOMBO 03,<br></br>
                SRI LANKA
            </Typography>
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
                {data.result &&
                  data.result
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{row.itemId}</TableCell>
                        <TableCell align="center">{row.itemName}</TableCell>
                        <TableCell align="center">{row.specification}</TableCell>
                        <TableCell align="center">{row.received_Qty}</TableCell>
                        <TableCell align="center">{MoneyFormat(row.bidValue)}</TableCell>
                        <TableCell align="center">{MoneyFormat(row.bidValue*row.received_Qty)}</TableCell>
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
            <Typography sx={{marginLeft:50}}>
              <h4>
                Sub total : {MoneyFormat(totalAmount)}<br></br>
                Taxable : -<br></br>
                Tax Rate : -<br></br>
                Tax Due : -<br></br>
                Other : -<br></br>
                Total : {MoneyFormat(totalAmount)}
              </h4>
            </Typography>
          </div>
          <center>
            <Typography>
              if you have any concern of this invoice, please contact<br></br>
              {data.vendorDetails.vendorName} Via {data.vendorDetails.contact}<br></br>
              <b>Thank you for your Bussiness!</b>
            </Typography>
          </center>
          <div className={styles.btn}>
            <Button variant="contained">PRINT</Button>
            <DonePopup
            text={"Successfully Sent Invoice to Procurement Officer"}
            title={"SEND INVOICE"}
            className={styles.btn}
          />
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Invoice;
