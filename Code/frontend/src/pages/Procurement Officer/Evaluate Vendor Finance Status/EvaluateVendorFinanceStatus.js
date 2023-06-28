import React from "react";
import styles from "./EvaluateVendorFinanceStatus.module.css";
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
import "../../../fonts.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EvidenceOfAthorization from "../../../components/Popups/EvidenceOfAuthorization/EvidenceOfAuthorization";
import ApprovePopup from "../../../components/Popups/DonePopup/ApprovePopup";
import RejectPopup from "../../../components/Popups/DonePopup/RejectPopup";
import ViewRecomandedVendors from "../../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";
import { vendors } from "../../../users/vendors.js";
import StatusBulb from "../../../components/StatusBulb/StatusBulb";
import { Link as Routerlink } from "react-router-dom";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { GetVendorFinanceStatedetails } from "../../../services/ProcurementHOD/ProcurementHODServices";
import { useEffect, useState } from "react";
import { approve } from "../../../services/ProcurementHOD/ProcurementHODServices";
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
  { id: "Vendor", label: "Vendor", Width: 300, align: "center" },
  { id: "Item", label: "Purhcase Order", Width: 300, align: "center" },
  { id: "Submit Document", label: "Submit Documents", Width: 300, align: "center" },
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
];


const creationDate = "2021-09-01";


function EvaluateVendorFinanceStatus() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [data, setData] = useState(null);
  const [isApprovePopupVisible, setApprovePopupVisible] = useState(true);
  const [isRejectPopupVisible, setRejectPopupVisible] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetVendorFinanceStatedetails();
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
            <h1 className={styles.Header}>Evaluate Vendor Finance Status</h1>
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
                        >
                          <TableCell align="center">{row.poId}</TableCell>
                         
                          <TableCell align="center">
                            {row.vendorId}
                          </TableCell>
                          <TableCell align="center" >
                          sdsdsds
                          </TableCell>
                          <TableCell align="center">
                            {
                              <div className={styles.ActionButonsContainer}>
                                {row.internalAuditorStatus === "approve" && (
                                  <div>
                                    <IconButton
                                      sx={{
                                        width: "40px",
                                        height: "40px",
                                        px: 0.5,
                                      }}
                                      className={styles.approveButton}
                                    >
                                      <DoneIcon />
                                    </IconButton>
                                  </div>
                                )}
                                {row.internalAuditorStatus === "reject" && (
                                  <div>
                                    <IconButton
                                      sx={{
                                        width: "40px",
                                        height: "40px",
                                        px: 0.5,
                                      }}
                                      className={styles.rejectButton}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                )}
                                {row.internalAuditorStatus !== "approve" &&
                                  row.internalAuditorStatus !== "reject" && (
                                    <>
                                      {isApprovePopupVisible && (
                                        <div
                                          onClick={() => {
                                            approve(row.vendorId,row.poId);
                                            // handleApproveClick(index);
                                           
                                          }}
                                        >
                                          <ApprovePopup />
                                        </div>
                                      )}
                                      {isRejectPopupVisible && (
                                        <div
                                        //   onClick={() =>{
                                        //     handleRejectClick(index);
                                        //  }}
                                        >
                                          <RejectPopup
                                            link={`${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/UpdateProcurementOfficerStatus/${row.vendorId}/${row.poId}?status=reject`}
                                          />
                                        </div>
                                      )}
                                    </>
                                  )}
                              </div>
                            }
                          </TableCell>
                         
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              // count={rows.length}
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
            <DonePopup
            text={"Successfully Evaluated Vendor Finance Status"}
            title={"Done"}
            styles={{
                mt: 1.2,
                mr: { xs: 6, sm: 4, md: 6 },
                borderRadius: 8,
                mb: 0.3,
                width: 170,
            }}
          />
          </Container>
        </div>
      </Container>
    </div>
  );
}


export default EvaluateVendorFinanceStatus;