import React, { useEffect, useState } from "react";
import styles from "./goodsReceivedNote.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { flexbox } from "@mui/system";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import "../../users/vendors.js";
import EnterNotePopup from "../../components/Popups/DonePopup/EnterNotePopup";
import { Link as Routerlink, useParams } from "react-router-dom";
import { vendors } from "../../users/vendors.js";
import {
  GetGRNItemDetails,
  UpdateGRNItemCommentAndCheckedBy,
} from "../../services/ProcurementHOD/ProcurementHODServices";
import { DateFormat } from "../../services/dataFormats";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 150, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
  { id: "OrderQ", label: "Order Qty", Width: 150, align: "center" },
  { id: "ShippedQ", label: "Shipped Qty", Width: 150, align: "center" },
  { id: "ReceiveQ", label: "Received Qty", Width: 150, align: "center" },
  { id: "TShippedQ", label: "Total Received Qty", Width: 150, align: "center" },
  { id: "RemainingQ", label: "Remaining Qty", Width: 150, align: "center" },
  { id: "Note", label: "Note", Width: 200, align: "center" },
];


export default function GoodsReceivedNote() {
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
  const [checkedBy, setCheckedBy] = useState("");
  const [grnComments, setComments] = useState(" ");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetGRNItemDetails(poId, grnId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const handleCommentChange = (itemId, value) => {
    setComments((prevState) => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const handleSendToVendorClick = () => {
    const commentsWithItemId = Object.entries(grnComments).map(
      ([itemId, grnComment]) => ({
        itemId,
        grnComment,
      })
    );
    console.log(grnId, checkedBy,commentsWithItemId);
    UpdateGRNItemCommentAndCheckedBy(grnId, checkedBy, commentsWithItemId);
  };

  if (data === null) {
    return <div>Loading...</div>;
  }

  const text = `Successfully sent GRN to vendor ${data.vendorName}`;

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          Good Receive Note
        </div>
        <div className={styles.GRNno}>
          <Typography>
            GRN No : {grnId}
            <br />
            PO No : {poId}
          </Typography>
        </div>

        <div className={styles.adjust}>
          <div className={styles.supplierdetails}>
            <Typography>
              Supplier Name: {data.vendorName}
              <br />
              Date : {DateFormat(data.shippingDate)}
            </Typography>
          </div>

          <div className={styles.delivery}>
            <Typography>
              Delivered by : <br />
              Digital Signature:
            </Typography>
          </div>
        </div>
        <div className={styles.space}></div>

        <div className={styles.afmpp_table}>
          <Paper
            sx={{
              width: "100%",
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
                            {row.orderedQuantity - row.totalReceived_Qty}
                          </TableCell>
                          <TableCell align="center">
                            <EnterNotePopup
                              value={grnComments[row.itemId]}
                              onChange={(value) =>
                                handleCommentChange(row.itemId, value)
                              } 
                            />
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
        <div className={styles.divide}>
          <div className={styles.checkedby}>
            <Typography>Checked by: </Typography>
            <TextField
              margin="none"
              required
              fullWidth
              size="small"
              id="checkedBy"
              name="checkedBy"
              sx={{
                width: 100,
                "& .MuiInputBase-input": {
                  backgroundColor: "white",
                },
              }}
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
            />
          </div>

          <div className={styles.divide2}>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#205295",
                  borderRadius: "32px",
                  width: "111px",
                  height: "48px",
                  marginRight: "10px",
                }}
              >
                PRINT
              </Button>
            </div>
            <div
              onClick={(event) => {
                handleSendToVendorClick();
                event.stopPropagation();
              }}
            >
              <DonePopup
                text={text}
                title="SEND TO VENDORS"
                styles={{
                  backgroundColor: "#205295",
                  borderRadius: "32px",
                  width: "200px",
                  height: "48px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
