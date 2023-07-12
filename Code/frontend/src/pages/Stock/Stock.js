import React from "react";
import styles from "./styles.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import { Button, IconButton, Paper, Stack, TextField,Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link as Routerlink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GetStockDetails } from "../../services/InventoryManager/InventoryManagerServices";
import { useEffect, useState } from "react";
import { MoneyFormat } from "../../services/dataFormats";
import { DateFormat } from "../../services/dataFormats";
const columns = [
  { id: "Date", label: "Date", Width: 300, align: "center" },
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "VendorName", label: "Specifications", Width: 300, align: "center" },
  { id: "QtyAvailable", label: "QTY Available", Width: 300, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 300, align: "center" },
  { id: "TotalValue", label: "Total Value", Width: 300, align: "center" },
];

function DisplayDate({ date }) {
  const formattedDate = date?.substring(0, 10); // Extract only the date portion
  return (
    <Stack component="form" noValidate spacing={3} alignItems="center">
      <TextField
        id="date"
        label="Minimum Expected Delivery Date"
        type="date"
        align="center"
        value={formattedDate}
        sx={{ width: 200, height: 50 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}

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

  const [data, setData] = useState([]);
  const totalItems = data.length; 

  // Calculate the total value
const totalValue = data.reduce((total, item) => {
  const itemValue = item.quantityAvailable * item.unitPrice;
  return total + itemValue;
}, 0);

const PurchasValue = data.reduce((total, item) => {
  return total + item.totalPurchasePrice;
}, 0);

const IssueValue = data.reduce((total, item) => {
  return total + item.totalIssuePrice;
}, 0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetStockDetails();
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <div
        style={{
          
          marginLeft: "100px",
          color: "white",
          fontSize: 36,
          fontFamily: "inter",
          display:"flex",
          flexDirection: "row"
        }}
      >
          <Routerlink to={-1}>
          <IconButton
            sx={{ pl: "15px", height: "34px", width: "34px", mt: 9 }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          </Routerlink>
        <h1>Stock</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "horizontal" }}>
        <div>
          <div>
            <Routerlink to={'/add-new-item=im'}>
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
            </Routerlink>
          </div>
          <div>
          <Routerlink to={'/issue-item'}>
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
            </Routerlink>
          </div>
        </div>
        <div className={styles.note2}>
          <h1 style={{ color: "#205295", fontSize: 25, textAlign: "center" }}>
            Stock Summary
          </h1>
          <h1 style={{ fontSize: 16, textAlign: "center", color: "#0A2647" }}>
            Total Items
          </h1>
          <h1 style={{ fontSize: 20, textAlign: "center" }}>{totalItems}</h1>
          <h4 style={{ fontSize: 16, textAlign: "center", color: "#0A2647" }}>
            Total Value
          </h4>
          <h1 style={{ fontSize: 20, textAlign: "center" }}>{MoneyFormat(totalValue)}</h1>
        </div>
        <div className={styles.note3}>
          <h1 style={{ color: "#205295", fontSize: 25, textAlign: "center" }}>
            Purchase <br /> Summary
          </h1>
          <h1 style={{ fontSize: 24, textAlign: "center" }}>{MoneyFormat(PurchasValue)}</h1>
        </div>
        <div className={styles.note3}>
          <h1 style={{ color: "#205295", fontSize: 24, textAlign: "center" }}>
            Issue <br /> Summary
          </h1>
          <h1 style={{ fontSize: 24, textAlign: "center" }}>{MoneyFormat(IssueValue)}</h1>
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
                      style={{ maxWidth: column.Width, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                  {data &&
                    data
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
                          <TableCell align="center">
                            <DisplayDate date={row.date} />
                          </TableCell>
                          <TableCell align="center">
                            {row.itemId}
                          </TableCell>
                          <TableCell align="center">
                            {row.itemName}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.specification}>
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.specification}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            {row.quantityAvailable}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.unitPrice)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.quantityAvailable*row.unitPrice)}
                          </TableCell>
                          
                        </TableRow>
                      ))}
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
