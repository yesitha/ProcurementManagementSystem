import React from "react";
import styles from "./MasterProcurementPlanEvalate.module.css";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Box } from "@mui/system";
import SearchNoFilter from "../../../components/Search/Search";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import "../../../fonts.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VendorDetails from "../../../components/Popups/VendorDetails/VendorDetails";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";

const columns = [
  {
    id: "MasterProcurementPlanID",
    label: "Master Procurement Plan ID",
    Width: 300,
    align: "center",
  },
  { id: "GrandTotal", label: "Grand Total", Width: 300, align: "center" },
  { id: "CreationDate", label: "Creation Date", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function createData(MasterProcurementPlanID, GrandTotal, CreationDate, Action) {
  return { MasterProcurementPlanID, GrandTotal, CreationDate, Action };
}

const rows = [
  createData(
    "MP-0001",
    "Rs. 1000000",
    "2021-09-01",
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
  ),
  createData(
    "MP-0002",
    "Rs. 2000000",
    "2021-09-02",
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
  ),
  createData("MP-0003", "Rs. 3000000", "2021-09-03"),
  createData(
    "MP-0004",
    "Rs. 4000000",
    "2021-09-04",
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
  ),
  createData(
    "MP-0005",
    "Rs. 5000000",
    "2021-09-05",
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
  ),
];

function MasterProcurementPlanEvalate() {
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
    <div className={styles.outer}>
      <Container
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },

          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.PageContainer__header}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <h1 className={styles.Header}>Master Procurement Plan </h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <SearchNoFilter className={styles.search} />
        </div>

        {/* Add table data */}

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
              pt: 2,
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
      </Container>
    </div>
  );
}

export default MasterProcurementPlanEvalate;
