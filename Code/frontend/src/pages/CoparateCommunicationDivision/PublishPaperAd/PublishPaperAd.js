import React from "react";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import styles from "./PublishPaperAd.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Container,
  Button,
  FormControl,
  Box,
  NativeSelect,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CssBaseline,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";

import DeleteIcon from "@mui/icons-material/Delete";

function CreateSubProcurementPlan() {
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
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },
    { id: "Action", label: "Action", Width: 300, align: "center" },
  ];
  function createData(ItemID, ItemName, Qty, Action) {
    return { ItemID, ItemName, Qty, Action };
  }

  const rows = [
    createData(
      "I0014",
      "A4 Papers",
      "500",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "P0023",
      "Printer Ink Cartridges",
      "100",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "C0012",
      "Computer Monitors",
      "50",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "S0056",
      "Safety Gloves",
      "1000",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "M0089",
      "Medical Supplies",
      "500",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "F0035",
      "Furniture",
      "20",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "T0078",
      "Telecommunication Equipment",
      "30",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
    createData(
      "B0092",
      "Building Materials",
      "200",
      <Button className={styles.ViewButton} variant="contained">
        View
      </Button>
    ),
  ];

  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
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
      <div className={styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <h1 className={styles.Header}>Publish Paper Ad</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>PRE-BID MEETING DATE: 2023.05.19</h4>
          </div>
        </div>

        <div className={styles.downSection}>
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
              borderRadius: "31px",
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
      </Container>
    </div>
  );
}

export default CreateSubProcurementPlan;
