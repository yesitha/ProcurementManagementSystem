import React from "react";
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

const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
const user = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  designation: "Financial Division HOD",
  department: "Finance",
  phone: "1234567890",
  address: "123, ABC Street, XYZ City, 123456",
  gender: "Male",
  profilePic: "https://www.w3schools.com/howto/img_avatar.png",
};

const columns = [
  { id: "ItemID", label: "Item ID", Width: 100, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 150, align: "center" },
  { id: "DeliveredQ", label: "Delivered Qty", Width: 150, align: "center" },
  { id: "Des", label: "Description", Width: 150, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 150, align: "center" },
  { id: "Amount", label: "Amount", Width: 150, align: "center" },
];

function createData(ItemID, ItemName, DeliveredQ, Des, UnitPrice, Amount) {
  return { ItemID, ItemName, DeliveredQ, Des, UnitPrice, Amount };
}

const rows = [createData("I0014", "A4 Papers", "100", "Very Big ", "30", "50")];

function Setdate() {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Date"
        type="date"
        align="center"
        defaultValue={new Date().toISOString().substr(0, 10)}
        sx={{ width: 200, height: 50 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}

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

  return (
    <div style={{ overflowX: "hidden" }}>
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          INVOICE
        </div>
        <div className={styles.POID}>
          <Typography sx={{ marginLeft: "10px" }}>
            PURCHASE ORDER ID:
          </Typography>
        </div>
        <div className={styles.divide}>
          <div className={styles.POID}>
            <Typography sx={{ marginLeft: "10px" }}>GRN ID:</Typography>
          </div>
          <div className={styles.dropDown}>
            <Setdate />
          </div>
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

        <div style={{ display: "flex", justifyContent: "right" }}>
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
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
