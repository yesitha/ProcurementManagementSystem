import React from "react";
import styles from "./SendPurchaseOrder.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink } from "react-router-dom";
import { useParams } from "react-router-dom/dist";
import {
  getPOItems,
  getPOVenderDetails,
} from "../../../services/Vendor/Vendorservices";
import { specialComment} from "../../../services/ProcurementHOD/ProcurementHODServices";
import { useState } from "react";
import { useEffect } from "react";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Desc", label: "Description", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },

  { id: "Uprice", label: "Unit Price", Width: 300, align: "center" },
  { id: "Total", label: "Total", Width: 300, align: "center" },
];

function SendPurchaseOrder() {
  const { poId } = useParams();
  const [poVenderDetails, setPoVenderDetails] = useState([]);
  const [poItems, setPoItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [comment, setComment] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const poVenderDetails = await getPOVenderDetails(poId);
        setPoVenderDetails(poVenderDetails);
        console.log(poVenderDetails);
      } catch (error) {
        console.log(error);
      }
      try {
        const poItems = await getPOItems(poId);
        setPoItems(poItems.itemList);
        console.log(poItems.itemList);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById("print-area");
    if (printContent) {
      const originalContent = document.body.innerHTML;
      const printContentHTML = printContent.innerHTML;
      document.body.innerHTML = printContentHTML;
      window.print();
      document.body.innerHTML = originalContent;
    }
    window.location.reload();
  };

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
        <div id="print-area">
        <div className={styles.upperSection}>
          <div className={styles.uppercontainer}>
            <div className={styles.tag}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Routerlink to={-1}>
                  <IconButton
                    sx={{
                      pl: "15px",
                      height: "34px",
                      width: "34px",
                      mt: 3.7,
                    }}
                  >
                    <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
                  </IconButton>
                </Routerlink>
                <h1 className={styles.Header}>Purchase Order</h1>
              </div>

              <Typography style={{ marginLeft: "5px" }}>
                Date: {DateFormat(poVenderDetails.date)}
                <br />
                PO# : {poId}
              </Typography>
            </div>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>PUCSL</h1>
              6TH FLOOR,<br></br>
              BOC MERCHANT TOWER,<br></br>
              ST.MICHAEL'S ROAD,<br></br>
              COLOMBO 03,<br></br>
              SRI LANKA
              {/* Date - [2023-05-10]<br></br>
              Invoice - #00012<br></br>
              Customer ID - <br></br>
              Due Date - */}
            </Typography>
          </div>
          <div className={styles.uppercontainer}>
            <div className={styles.tag}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h1 className={styles.Header}>Vendor</h1>
              </div>
              <Typography style={{ marginLeft: "5px", marginBottom : "20px" }}>
                {poVenderDetails.vendorFullName}
                <br></br>
                {poVenderDetails.companyName}
                <br></br>
                {poVenderDetails.address}
                <br></br>
                {poVenderDetails.city}
                <br></br>
                {poVenderDetails.contact}
                <br></br>
              </Typography>
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
                        style={{ maxWidth: column.Width, fontWeight: "bold" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poItems &&
                    poItems
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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.specifications}>
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.specifications}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.totalQuantity * row.bidValue)}
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
            mr: {
              xs: "60px",
              sm: "65px",
              md: "65px",
              lg: "68px",
              xl: "70px",
            },
          }}
        >
          <div className={styles.downcontainer}>
            <div>
              <Typography>
                <h4>Comments on Special Instructions</h4>
              </Typography>
              <TextField
                value={poVenderDetails.commentsForSpecialInstruction}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "300px",
                }}
                onChange={handleChange}
              />
            </div>
            <Typography>
              <h4>
                <br></br>
                Sub total : {MoneyFormat(poVenderDetails.totalAmount)}
                <br></br>
              </h4>
            </Typography>
          </div>
          <center>
            <br />
            <Typography>
              if you have any concern of this PO, please contact<br></br>
              +943867569<br></br>
            </Typography>
          </center>
        </div>


</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.afmpp_button}>
            <Button
              onClick={handlePrint}
              variant="contained"
              fontFamily={"Inter"}
              sx={{
                bgcolor: "#205295",
                borderRadius: 5,
                height: 50,
                width: 200,
              }}
            >
              PRINT
            </Button>
          </div>

          <div className={styles.afmpp_button}  onClick={() => {
                                            specialComment(poId, comment);
                                          }}>
            <DonePopup
              text={"Successfully sent PO to Vendor"}
              title={"SEND TO VENDOR"}
              styles={{
                bgcolor: "#205295",
                borderRadius: 5,
                height: 50,
                width: 200,
                marginRight: "20px",
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
export default SendPurchaseOrder;
