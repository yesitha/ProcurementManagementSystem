import React from "react";
import styles from "./ApprovalForMasterProcurementPlan.module.css";
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
import { Link as Routerlink } from "react-router-dom";


const columns = [
  {id: "itemID", label: "Item ID", Width: 300, align: "center"},
  {id: "itemName", label: "Item Name", Width: 300, align: "center"},
  {id: "quentity", label: "Quentity", Width: 300, align: "center"},
  {id: "estimatedBudget",label: "Estimated Budget",Width: 300,align: "center",},
  {id: "action", label: "Action", Width: 300, align: "center"},
];

function createData(itemID, itemName, quentity, estimatedBudget, action) {
  return { itemID, itemName, quentity, estimatedBudget, action };
}

const rows = [
  createData(
    "IT-0001",
    "A4 Bundle",
    "400",
    "Rs. 1000000",
    <Routerlink to={'/PCviewitem'}>
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
    </Routerlink>
  ),
  createData(
    "IT-0002",
    "Pen",
    "2000",
    "Rs. 2000000",
    <Routerlink to={'/PCviewitem'}>
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>
    </Routerlink>
  ),
];

const procurementId = "MP-0001";
const grandTotal = "Rs. 1000000";
const creationDate = "2021-09-01";

function ApprovalForMasterProcurementPlan() {
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
            <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>
              Approval for Master Procurement Plan
            </h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <div className={styles.header2Section}>
            <Container
              sx={{ mr: { xs: 4, sm: 5, lg: 1 }, py: 1, borderRadius: 5 }}
              className={styles.detailsSection}
            >
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                MASTER PROCUREMENT ID : {procurementId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                CREATED DATE : {creationDate}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                GRAND TOTAL : {grandTotal}
              </Typography>
            </Container>
          </div>
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

export default ApprovalForMasterProcurementPlan;
