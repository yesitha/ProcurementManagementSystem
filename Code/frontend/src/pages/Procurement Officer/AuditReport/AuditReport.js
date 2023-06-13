import React from "react";
import styles from "./AuditReport.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import SearchNoFilter from "../../../components/Search/Search";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
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
import SetPreBidMeetingDate from "../../../components/Popups/SetPreBidMeetingDate/SetPreBidMeetingDate";
import Approve from "../../../images/Approve.png";
import Reject from "../../../images/Reject.png";
import ApprovePopup from "../../../components/Popups/DonePopup/ApprovePopup";
import RejectPopup from "../../../components/Popups/DonePopup/RejectPopup";
import Visibility from "../../FinanceDivisionAccountant/InvoicestobePaid/Visibility";
//===============Applicable for table data===================================

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  { id: "Division", label: "Division", Width: 300, align: "center" },
  { id: "Spec", label: "Specification", Width: 300, align: "center" },
  { id: "Vendor", label: "Vendor", Width: 300, align: "center" },
  {
    id: "EDdate",
    label: "Expected Delivery date",
    Width: 300,
    align: "center",
  },
  { id: "AudStatus", label: "Auditor's Status", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

function createData(
  ItemID,
  ItemName,
  Qty,
  Division,
  Spec,
  Vendor,
  EDdate,
  AudStatus,
  Action
) {
  return {  ItemID,
    ItemName,
    Qty,
    Division,
    Spec,
    Vendor,
    EDdate,
    AudStatus,
    Action};
}

//   const ApproveRejctButton = (
//     <>
//       <IconButton><img src={Approve}/></IconButton>
//       <IconButton><img src={Reject}/></IconButton>
//     </>
//   )

const rows = [
  createData(
    "I0014",
    "A4 Papers",
    "500",
    "IT Department",
    "Good Papers",
    <Visibility/>,
    "2023/01/01",
    <ApprovePopup />,
    <Visibility />
    
   
  ),
  createData(
    "I0028",
    "Ruler",
    "10",
    "IT Department",
    "15cm rulers",
    <Visibility />,
    "2023/01/01",
   
      <ApprovePopup />,
      <Visibility />
    
  ),
  createData(
    "I0015",
    "Stapler",
    "50",
    "IT Department",
    "steel",
    <Visibility />,
    "2023/01/01",
      <ApprovePopup />,
      <Visibility/>
  ),
  
];

//===========================================================================

// Here in class names, afmmp=AuditFinalizedMasterProcurementPlan

function AuditReport() {
  

  //=======values for 'SelectDropDown.js' as an array=======

  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

  //========================================================

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
      
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          Audit Finalized Master Procurement Plan
        </div>
        <div className={styles.afmpp_title_search}>
          <div className={styles.afmpp_title}>
            <label>MASTER PROCUREMENT PLAN ID*</label>
            <SelectDropDown list={list} />
          </div>
          <div className={styles.afmpp_search}>
            <SearchNoFilter />
          </div>
        </div>

        {/* Add table data */}

        <div className={styles.afmpp_table}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
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
        <div className={styles.afmpp_button}>
          <DonePopup
            text={"Successfully fowarded to Director General"}
            title={"Submit to DG"}
            styles={{
              position: "absolute",
              right: "0",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 200,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default AuditReport;