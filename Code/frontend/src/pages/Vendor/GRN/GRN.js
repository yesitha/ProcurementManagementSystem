import React, {useEffect,useState} from "react";
import styles from "./GRN.module.css";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../../../users/vendors.js";
import ViewNote from "../../../components/Popups/DonePopup/ViewNote";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetGRNItemDetails } from "../../../services/Vendor/Vendorservices";
import { DateFormat } from "../../../services/dataFormats";

const columns = [
  { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
  { id: "spe", label: "Specification", Width: 150, align: "center" },
  { id: "OrderQ", label: "Ordered Qty", Width: 150, align: "center" },
  { id: "ShippedQ", label: "Shipped Qty", Width: 150, align: "center" },
  { id: "ReceivedQ", label: "Received Qty", Width: 150, align: "center" },
  { id: "TReceivedQ", label: "Current Total Received Qty", Width: 200, align: "center" },
  { id: "RemainingQ", label: "Remaining Qty", Width: 200, align: "center" },
  { id: "Note", label: "Note", Width: 200, align: "center" },

];


export default function GRN() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const { poId,grnId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetGRNItemDetails(poId,grnId);
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
            PO No  : {poId}
          </Typography>
        </div>

        <div className={styles.adjust}>
          <div className={styles.supplierdetails}>
            <Typography>
              Supplier Name  : {data.vendorName} <br />
              Date : {DateFormat(data.shippingDate)}
            </Typography>
          </div>

          <div className={styles.delivery}>
            <Typography>
              Delivered by : PUCSL <br />
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{row.itemName}</TableCell>
                        <TableCell align="center">{row.specification}</TableCell>
                        <TableCell align="center">{row.orderedQuantity}</TableCell>
                        <TableCell align="center">{row.shipped_Qty}</TableCell>
                        <TableCell align="center">{row.received_Qty}</TableCell>
                        <TableCell align="center">{row.totalReceived_Qty}</TableCell>
                        <TableCell align="center">{row.orderedQuantity-row.totalReceived_Qty}</TableCell>
                        <TableCell align="center">{<ViewNote comment={row.grnComment}/>}</TableCell>
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
          <div className={styles.supplierName}>
          </div>
          <div className={styles.checkedBy}>
            <Typography>Checked By: {data.checkedBy.checkedby}</Typography>
            <Typography>Date: {DateFormat(data.checkedBy.date)}</Typography>
          </div>

          <div className={styles.divide2}>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#205295",
                  borderRadius: "50px",
                  width: "111px",
                  height: "48px",
                  marginRight: "10px",
                }}
              >
                PRINT
              </Button>
            </div>
            <div>
              <Routerlink to={`/create-invoice/${poId}/${grnId}`}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#205295",
                  borderRadius: "50px",
                  width: "200px",
                  height: "48px",
                }}
              >
                Create Invoice
              </Button>
              </Routerlink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
