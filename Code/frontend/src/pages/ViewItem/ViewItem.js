import React from "react";
import styles from "./ViewItem.module.css";
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
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import "../../fonts.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EvidenceOfAthorization from "../../components/Popups/EvidenceOfAuthorization/EvidenceOfAuthorization";
import ApprovePopup from "../../components/Popups/DonePopup/ApprovePopup";
import RejectPopup from "../../components/Popups/DonePopup/RejectPopup";
import ViewRecomandedVendors from "../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";
import { vendors } from "../../users/vendors.js";
import StatusBulb from "../../components/StatusBulb/StatusBulb";
const item = {
  "Sub Procurement ID": "SP-001",
  "Master Procurement ID": "MP-001",
  "Item ID": "IT-1001",
  "Item Name": "Office Chairs",
  Department: "Furniture",
  Quantity: 20,
  Specifications: "Comfortable, Adjustable, Ergonomic",
  "Recommended Vendors": ["Vendor A", "Vendor B"],
  "Expected Delivery Date": "2023-03-15",
};
const Recomandedvendors1 = vendors;

const columns = [
  { id: "SubProID", label: "Sub Procurement ID", Width: 300, align: "center" },
  { id: "Department", label: "Department", Width: 300, align: "center" },
  { id: "quentity", label: "Quentity", Width: 300, align: "center" },
  { id: "Specs", label: "Specifications", Width: 300, align: "center" },
  {
    id: "RecVendors",
    label: "Recommended Vendors",
    Width: 200,
    align: "center",
  },
  {
    id: "ExpDelDate",
    label: "Expected Delivery Date",
    Width: 350,
    align: "center",
  },
  { id: "TecStatus", label: "TEC Status", Width: 200, align: "center" },
  { id: "Evidence", label: "Evidence", Width: 200, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function createData(
  SubProID,
  Department,
  quentity,
  Specs,
  RecVendors,
  ExpDelDate,
  TecStatus,
  Evidence,
  Action
) {
  return {
    SubProID,
    Department,
    quentity,
    Specs,
    RecVendors,
    ExpDelDate,
    TecStatus,
    Evidence,
    Action,
  };
}

const rows = [
  createData(
    "SP-001",
    "IT",
    "20",
    "Comfortable, Adjustable, Ergonomic",
    <ViewRecomandedVendors vendors={Recomandedvendors1} />,
    "2023-05-07",
    <StatusBulb status="Pending" />,
    <EvidenceOfAthorization />,
    <div className={styles.ActionButonsContainer}>
      <ApprovePopup />
      <RejectPopup />
    </div>
  ),
  createData(
    "SP-001",
    "Finace",
    "20",
    "Comfortable, Adjustable, Ergonomic",
    <ViewRecomandedVendors vendors={Recomandedvendors1} />,
    "2023-05-07",
    <StatusBulb status="Approved" />,
    <EvidenceOfAthorization />,
    <div className={styles.ActionButonsContainer}>
      <ApprovePopup />
      <RejectPopup />
    </div>
  ),
  createData(
    "SP-002",
    "HR",
    "20",
    "Comfortable, Adjustable, Ergonomic",
    <ViewRecomandedVendors vendors={Recomandedvendors1} />,
    "2023-05-07",
    <StatusBulb status="Rejected" />,
    <EvidenceOfAthorization />,
    <div className={styles.ActionButonsContainer}>
      <ApprovePopup />
      <RejectPopup />
    </div>
  ),
  createData(
    "SP-004",
    "IT",
    "20",
    "Comfortable, Adjustable, Ergonomic",
    <ViewRecomandedVendors vendors={Recomandedvendors1} />,
    "2023-05-07",
    <StatusBulb status="Pending" />,
    <EvidenceOfAthorization />,
    <div className={styles.ActionButonsContainer}>
      <ApprovePopup />
      <RejectPopup />
    </div>
  ),
  createData(
    "SP-003",
    "HR",
    "20",
    "Comfortable, Adjustable, Ergonomic",
    <ViewRecomandedVendors vendors={Recomandedvendors1} />,
    "2023-05-07",
    <StatusBulb status="Rejected" />,
    <EvidenceOfAthorization />,
    <div className={styles.ActionButonsContainer}>
      <ApprovePopup />
      <RejectPopup />
    </div>
  ),
];

const creationDate = "2021-09-01";

function ViewItem() {
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

            <h1 className={styles.Header}>{item["Item Name"]}</h1>
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
                MASTER PROCUREMENT ID : {item["Master Procurement ID"]}
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
                ITEM ID : {item["Item ID"]}
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
          <Container
            className={styles.rightButton}
            sx={{ justifyContent: { xs: "center", md: "right" } }}
          >
            <Button
              className={styles.TecAppointButton}
              variant="contained"
              sx={{
                mt: 1.2,
                mr: { xs: 6, sm: 4, md: 6 },
                borderRadius: 8,
                mb: 0.3,
                width: 170,
              }}
            >
              View All Approved Items
            </Button>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default ViewItem;