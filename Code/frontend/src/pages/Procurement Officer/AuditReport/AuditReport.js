import React, { useEffect, useState } from "react";
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
import Visibility from "../../FinanceDivisionAccountant/InvoicesneedtobePaid/Visibility";
import ViewNote from "../../../components/Popups/DonePopup/ViewNote";
import { Link as Routerlink } from "react-router-dom";
import {
  getItemNameList,
  getVendorList,
} from "../../../services/DivisionHOD/deivisionHODServices";
import {
  getMasterProcurementPlanContentFromDB,
  getMasterProcurementPlanFromDB,
} from "../../../services/ProcurementHOD/ProcurementHODServices";

function AuditReport() {
  const columns = [
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },
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

  //=======values for 'SelectDropDown.js' as an array=======
  const [mpplist, setMppList] = useState([]);
  const [selectedMppId, setSelectedMppId] = useState("");
  const [itemListToSelectedMppId, setItemListToSelectedMppId] = useState([]);
  //========================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemListToSelectedMppId =
          await getMasterProcurementPlanContentFromDB(selectedMppId);
        setItemListToSelectedMppId(itemListToSelectedMppId);
        console.log(itemListToSelectedMppId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedMppId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mppList = await getMasterProcurementPlanFromDB();
        const mppIdList = mppList.map((item) => item.mppId);
        console.log(mppIdList);
        setMppList(mppIdList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleMppIdChange = (event) => {
    setSelectedMppId(event.target.value);
    console.log(selectedMppId);
  };

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
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          Audit Report
        </div>
        <div className={styles.afmpp_title_search}>
          <div className={styles.afmpp_title}>
            <label>MASTER PROCUREMENT PLAN ID*</label>
            <SelectDropDown onChange={handleMppIdChange} list={mpplist} />
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
                  {itemListToSelectedMppId &&
                    itemListToSelectedMppId
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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">
                            {row.specification}
                          </TableCell>
                          <TableCell align="center">
                            <VendorDetails vendorId={row.selectedVendorInfo.vendorId} vendorName={row.selectedVendor
} />
                          </TableCell>
                          <TableCell align="center">
                            {new Date(
                              row.minExpectedDeliveryDate
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {row.internalAuditorStatus}
                          </TableCell>
                          <TableCell align="center">
                            {row.internalAuditorStatus == "reject" ? (
                              <ViewNote comment={row.internalAuditorComment} />
                            ) : (
                              <IconButton
                                disabled
                                sx={{ width: "40px", height: "40px", px: 0.5 }}
                                style={{ border: "1px solid #205295" }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={itemListToSelectedMppId.length}
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
            title={"Forward to DG"}
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
