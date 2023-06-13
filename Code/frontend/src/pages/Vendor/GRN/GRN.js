import React from "react";
import styles from "./GRN.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import { ButtonBase, Typography } from "@mui/material";
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
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import "../../../users/vendors.js";
import EnterNotePopup from "../../../components/Popups/DonePopup/EnterNotePopup";
import { vendors } from "../../../users/vendors.js";
import ViewNote from "../../../components/Popups/DonePopup/ViewNote";
import { Link as Routerlink } from "react-router-dom";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 150, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
  { id: "Spe", label: "Specifications", Width: 200, align: "center" },
  { id: "OrderQ", label: "Order Qty", Width: 150, align: "center" },
  { id: "DeliveredQ", label: "Delivered Qty", Width: 150, align: "center" },
  { id: "RemainingQ", label: "Remaining Qty", Width: 150, align: "center" },
  { id: "Note", label: "Note", Width: 200, align: "center" },
];

function createData(
  ItemID,
  ItemName,
  Spe,
  OrderQ,
  DeliveredQ,
  RemainingQ,
  Note
) {
  return { ItemID, ItemName, Spe, OrderQ, DeliveredQ, RemainingQ, Note };
}

const rows = [
  createData("I0014", "A4 Papers", "loerm", "100 ", "50", "50", <ViewNote />),
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

  const supplier = vendors[0].name;
  const text = `Successfully sent GRN to vendor ${supplier}`;

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <Routerlink to={-1}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          </Routerlink>
          [GRN NO]
        </div>
        <div className={styles.GRNno}>
          <Typography>
            GRN No
            <br />
            PO # : [12321]
          </Typography>
        </div>

        <div className={styles.adjust}>
          <div className={styles.supplierdetails}>
            <Typography>
              Supplier Name: <br />
              Date :
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
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
        <div className={styles.divide}>
          <div className={styles.supplierName}>
            <Typography>Supplier Name:</Typography>
          </div>
          <div className={styles.checkedBy}>
            <Typography>Checked By:</Typography>
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
              <Routerlink to={'/create-invoice'}>
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
