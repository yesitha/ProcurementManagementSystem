import { Typography } from "@mui/material";
import React from "react";
import styles from "./ItemstobeShipped.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Successfullyinformed from "../../components/Popups/DonePopup/Successfullyinformed";
import Sucessfullyinformed from "../../components/Popups/DonePopup/Successfullyinformed";

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

const list0 = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
const list3 = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "ShippedQty", label: "Shipped Quantity", Width: 300, align: "center" },
  { id: "Description", label: "Description", Width: 300, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 300, align: "center" },
  {
    id: "RemainingQty",
    label: "Remaining Quantity",
    Width: 300,
    align: "center",
  },
];

function createData(
  ItemID,
  ItemName,
  ShippedQty,
  Description,
  UnitPrice,
  RemainingQty
) {
  return { ItemID, ItemName, ShippedQty, Description, UnitPrice, RemainingQty };
}

const rows = [
<<<<<<< Updated upstream
  createData("I0014", "A4 Papers", "2023-05-10", "gygygttg", "2000lkr", "52"),
  createData("I0015", "Staplers", "2023-03-12", "dfdffd", "5000lkr", "63"),
=======
  createData("I0014", "A4 Papers", "2023-05-10", "A4 sized Papers", "2000lkr", "52"),
  createData("I0015", "Staplers", "2023-03-12", "Atlas Staplers", "5000lkr", "63"),
>>>>>>> Stashed changes
];

export default function ItemstobeShipped() {
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

      <div className={styles.Title}>Items to be Shipped</div>

      <div style={{ marginTop: "30px" }}>
        <h1 style={{ marginLeft: "100px", fontSize: "16px", color: "white" }}>
          PURCHASE ORDER ID
        </h1>
        <div style={{ marginLeft: "90px" }}>
          <SelectDropDown list={list0} />
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h1 style={{ marginLeft: "100px", fontSize: "16px", color: "white" }}>
          DATE
        </h1>
        <div style={{ marginLeft: "90px" }}>
          <SelectDropDown list={list3} />
        </div>
      </div>

      <div style={{ marginLeft: "100px", marginTop: "20px" }}>
        <Paper
          className={styles.baseTableContainer}
          elevation={6}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <TableContainer
            sx={{ borderRadius: 10 }}
            className={styles.tableContainer}
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

<<<<<<< Updated upstream
      <div classname="note2">
=======
      <div classname={styles.Button}>
>>>>>>> Stashed changes
        <div>
          <Sucessfullyinformed
            styles={{
              position: "absolute",
              right: "5%",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 130,
              marginTop: 10,
            }}
<<<<<<< Updated upstream
            name=" To Procurement Officer"
=======
            name=" To  the Procurement Officer"
>>>>>>> Stashed changes
            title="Inform"
          />
        </div>
      </div>
    </div>
  );
}
