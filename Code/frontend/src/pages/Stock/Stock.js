import React from "react";
import styles from "./styles.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "Date", label: "Date", Width: 300, align: "center" },
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "VendorName", label: "Vendor Name", Width: 300, align: "center" },
  { id: "QtyAvailable", label: "QTY Available", Width: 300, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 300, align: "center" },
  { id: "TotalValue", label: "Total Value", Width: 300, align: "center" },
];

function createData(
  Date,
  ItemID,
  ItemName,
  QtyAvailable,
  VendorName,
  UnitPrice,
  TotalValue
) {
  return {
    Date,
    ItemID,
    ItemName,
    QtyAvailable,
    VendorName,
    UnitPrice,
    TotalValue,
  };
}

const rows = [
  createData(
    "2023/01/02",
    "1500",
    "pencil",
    "John",
    "300",
    "Rs.60",
    "Rs.12000"
  ),
  createData(
    "2023/01/03",
    "2000",
    "marker",
    "Sara",
    "400",
    "Rs.70",
    "Rs.15000"
  ),
  createData(
    "2023/01/04",
    "2500",
    "eraser",
    "David",
    "500",
    "Rs.80",
    "Rs.18000"
  ),
  createData(
    "2023/01/05",
    "3000",
    "sharpener",
    "Emily",
    "600",
    "Rs.90",
    "Rs.21000"
  ),
  createData(
    "2023/01/06",
    "3500",
    "ruler",
    "Michael",
    "700",
    "Rs.100",
    "Rs.24000"
  ),
  createData(
    "2023/01/07",
    "4000",
    "staple",
    "Jessica",
    "800",
    "Rs.110",
    "Rs.27000"
  ),
  createData(
    "2023/01/08",
    "4500",
    "stapler",
    "William",
    "900",
    "Rs.120",
    "Rs.30000"
  ),
  createData(
    "2023/01/09",
    "5000",
    "glue",
    "Ashley",
    "1000",
    "Rs.130",
    "Rs.33000"
  ),
  createData(
    "2023/01/10",
    "5500",
    "paper clip",
    "Jacob",
    "1100",
    "Rs.140",
    "Rs.36000"
  ),
  createData(
    "2023/01/11",
    "6000",
    "tape",
    "Isabella",
    "1200",
    "Rs.150",
    "Rs.39000"
  ),
  createData(
    "2023/01/12",
    "6500",
    "highlighter",
    "Ethan",
    "1300",
    "Rs.160",
    "Rs.42000"
  ),
  createData(
    "2023/01/13",
    "7000",
    "folder",
    "Ava",
    "1400",
    "Rs.170",
    "Rs.45000"
  ),
  createData(
    "2023/01/14",
    "7500",
    "file",
    "Alexander",
    "1500",
    "Rs.180",
    "Rs.48000"
  ),
  createData(
    "2023/01/15",
    "8000",
    "envelope",
    "Charlotte",
    "1600",
    "Rs.190",
    "Rs.51000"
  ),
  createData(
    "2023/01/16",
    "8500",
    "notebook",
    "Oliver",
    "1700",
    "Rs.200",
    "Rs.54000"
  ),
];

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

export default function Stock() {
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
    <div>
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div
        style={{
          marginLeft: "100px",
          color: "white",
          fontSize: 36,
          fontFamily: "inter",
        }}
      >
        <h1>Stock</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "horizontal" }}>
        <div>
          <div>
            <Button
              sx={{
                backgroundColor: "#205295",
                width: 194,
                marginLeft: 15,
                borderRadius: 90,
                fontSize: 20,
                height: 35,
                color: "white",
                border: "none",
              }}
            >
              ADD NEW ITEM
            </Button>
          </div>
          <div>
            <Button
              sx={{
                backgroundColor: "#205295",
                width: 188,
                marginLeft: 15,
                marginTop: 5,
                borderRadius: 90,
                fontSize: 20,
                height: 35,
                color: "white",
                border: "none",
              }}
            >
              ISSUE ITEM
            </Button>
          </div>
        </div>
        <div className={styles.note2}>
          <h1 style={{ color: "#205295", fontSize: 24, textAlign: "center" }}>
            Stock Summary
          </h1>
          <h1 style={{ fontSize: 16, textAlign: "center", color: "#0A2647" }}>
            Total Items
          </h1>
          <h1 style={{ fontSize: 32, textAlign: "center" }}>10</h1>
          <h1 style={{ fontSize: 24, textAlign: "center" }}>LKR 10000</h1>
        </div>
        <div className={styles.note3}>
          <h1 style={{ color: "#205295", fontSize: 24, textAlign: "center" }}>
            Purchase <br /> Summary
          </h1>
          <h1 style={{ fontSize: 24, textAlign: "center" }}>LKR 10000</h1>
        </div>
        <div className={styles.note3}>
          <h1 style={{ color: "#205295", fontSize: 24, textAlign: "center" }}>
            Issue <br /> Summary
          </h1>
          <h1 style={{ fontSize: 24, textAlign: "center" }}>LKR 10000</h1>
        </div>
      </div>
      <h1
        style={{
          marginLeft: "100px",
          color: "white",
          fontSize: 36,
          fontFamily: "inter",
          marginTop: "100px",
        }}
      >
        Items in Stock
      </h1>

      <div style={{ marginLeft: 100 }} className={styles.downSection}>
        <Paper
          className={styles.baseTableContainer}
          elevation={6}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
            alignItems: "center",
            borderRadius: "25px",
          }}
        >
          <TableContainer
            className={styles.tableContainer}
            sx={{ borderRadius: 20 }}
          >
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
    </div>
  );
}
