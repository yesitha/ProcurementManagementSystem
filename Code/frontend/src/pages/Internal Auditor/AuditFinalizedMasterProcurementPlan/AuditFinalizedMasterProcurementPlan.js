import React from "react";
import styles from "./AuditFinalizedMasterProcurementPlan.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import SearchNoFilter from "../../../components/Search/Search";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
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
import { Link as Routerlink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetFinalizedMasterProcurementPlan2 } from "../../../services/InternalAuditor/InternalAuditorServices";
import { GetIdListForAuditFinalizedMPP } from "../../../services/InternalAuditor/InternalAuditorServices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";
import { approve } from "../../../services/InternalAuditor/InternalAuditorServices";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
//===============Applicable for table data===================================

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Spe", label: "Specification", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  {
    id: "EDdate",
    label: "Expected Delivery date",
    Width: 300,
    align: "center",
  },
  { id: "Vendor", label: "Selected Vendor", Width: 300, align: "center" },
  { id: "VendorDetails", label: "Vendor Details", Width: 300, align: "center" },
  { id: "tenderValue", label: "Tender Value", Width: 300, align: "center" },
  { id: "Action", label: "Action", Width: 300, align: "center" },
];

//   const ApproveRejctButton = (
//     <>
//       <IconButton><img src={Approve}/></IconButton>
//       <IconButton><img src={Reject}/></IconButton>
//     </>
//   )
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

function AuditFinalizedMasterProcurementPlan() {
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
  const [newdata, setnewdata] = useState(null);
  const { mppId } = useParams();
  const [selectedmppId, setSelectedmppId] = useState(null);

  const handleSubIdChange = (event) => {
    setSelectedmppId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetFinalizedMasterProcurementPlan2(mppId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [isApprovePopupVisible, setApprovePopupVisible] = useState(true);
  const [isRejectPopupVisible, setRejectPopupVisible] = useState(true);

  const handleApproveClick = (index) => {
    setRejectPopupVisible(false);
  };

  const handleRejectClick = (index) => {
    setApprovePopupVisible(false);
  };
  const dataNotification = [
    {
      message: 'Internal Auditor Report Available !',
      type: 'Internal Auditor Report Available',
      divisionName: 'Finance',
    },
  ];

  if (data === null) {
    return <p style={{ marginLeft: "20px" }}>Loading...</p>;
  }

  return (
    <div>
      <div className={styles.afmpp_mainBody}>
        <div className={styles.afmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          Audit Finalized Master Procurement Plan
        </div>
        <div className={styles.afmpp_title_search}>
          <div className={styles.OuterMiddle}>
            <div className={styles.Ph2}>
              <h4>MASTER PROCUREMENT PLAN ID: {mppId}</h4>
            </div>
          </div>
          <div className={styles.afmpp_search}>
            <SearchNoFilter />
          </div>
        </div>

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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
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
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">
                            <DisplayDate date={row.minExpectedDeliveryDate} />
                          </TableCell>
                          <TableCell align="center">
                            {row.selectedVendor ? row.selectedVendor : "----"}
                          </TableCell>
                          <TableCell align="center">
                            <VendorDetails
                              vendorId={row.selectedVendorId}
                              vendorName={row.selectedVendor}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue)}
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
                                      <Tooltip title={row.internalAuditorComment}>
                                        <CloseIcon />
                                      </Tooltip>
                                    </IconButton>
                                  </div>
                                )}
                                {row.internalAuditorStatus !== "approve" &&
                                  row.internalAuditorStatus !== "reject" && (
                                    <>
                                      {isApprovePopupVisible && (
                                        <div
                                          onClick={() => {
                                            // handleApproveClick(index);
                                            approve(mppId, row.itemId);
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
                                            link={`${process.env.REACT_APP_API_HOST}/api/InternalAuditor/UpdateInternalAuditorStatus?mppId=${mppId}&itemId=${row.itemId}&internalAuditorStatus=reject&internalAuditorComment=$rejectedComment`}
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
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <div className={styles.afmpp_button}>
          <DonePopup
            notificationData={dataNotification[0]}
            text={"Successfully submitted your status"}
            title={"Submit"}
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

export default AuditFinalizedMasterProcurementPlan;
