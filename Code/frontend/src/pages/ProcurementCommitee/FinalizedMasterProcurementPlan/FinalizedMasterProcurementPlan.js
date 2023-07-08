import React from "react";
import styles from "./FinalizedMasterProcurementPlan.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import SearchNoFilter from "../../../components/Search/Search";
import { IconButton, Paper, Stack, TextField } from "@mui/material";
import { Tooltip } from "@mui/material";
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
import { Link as Routerlink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  GetFinalizedMasterProcurementPlan,
  GetMasterProcurementPlansIDList,
} from "../../../services/ProcurementCommittee/ProcurementCommitteeServices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";
import { setDate } from "date-fns";

//===============Applicable for table data===================================

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Spe", label: "Specification", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  { id: "SppId", label: "SppId", Width: 300, align: "center" },
  { id: "Division", label: "Division", Width: 300, align: "center" },
  {
    id: "EDdate",
    label: "Expected Delivery date",
    Width: 300,
    align: "center",
  },
  { id: "Vendor", label: "Selected Vendor", Width: 300, align: "center" },
  { id: "VendorDetails", label: "Vendor Details", Width: 300, align: "center" },
  { id: "tenderValue", label: "Tender Value", Width: 300, align: "center" },
];

// function Setdate() {
//   return (
//     <Stack component="form" noValidate spacing={3}>
//       <TextField
//         id="date"
//         label="Set Date"
//         type="date"
//         align="center"
//         defaultValue={new Date().toISOString().substr(0, 10)}
//         sx={{ width: 200, height: 50 }}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//     </Stack>
//   );
// }
function DisplayDate({ date }) {
  const formattedDate = date?.substring(0, 10); // Extract only the date portion
  return (
    <Stack component="form" noValidate spacing={3} alignItems="center">
      <TextField
        id="date"
        label="Expected Delivery Date"
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

function FinalizedMasterProcurementPlan() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [mppIds, setmppIds] = useState([]);
  const [selectedmppId, setSelectedmppId] = useState("");
  const [data, setData] = useState(null);

  const { selectedmppIdforNextPage } = useParams();

  const handleSubIdChange = (event) => {
    setSelectedmppId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mppIdsResponse = await GetMasterProcurementPlansIDList();
        setmppIds(mppIdsResponse);
        console.log(mppIdsResponse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    if (selectedmppIdforNextPage) {
      setSelectedmppId(selectedmppIdforNextPage);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetFinalizedMasterProcurementPlan(selectedmppId);
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedmppId]);

  return (
    <div>
      <div className={styles.fmpp_mainBody}>
        <div className={styles.fmpp_heading}>
          <Routerlink to={-1}>
            <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          Finalized Master Procurement Plan
        </div>
        <div className={styles.fmpp_title_search}>
          <div className={styles.fmpp_title}>
            <label>MASTER PROCUREMENT PLAN ID*</label>
            <SelectDropDown
              list={mppIds}
              value={selectedmppId}
              onChange={handleSubIdChange}
            />
          </div>
          <div className={styles.fmpp_search}>
            <SearchNoFilter />
          </div>
        </div>

        {/* Add table data */}

        <div className={styles.fmpp_table}>
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
                        style={{ maxWidth: column.Width, fontWeight: "bold"}}
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
                          <TableCell align="center">{row.sppId}</TableCell>
                          <TableCell align="center">{row.division}</TableCell>
                          <TableCell align="center">
                            <DisplayDate date={row.expectedDeliverDate} />
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
        <div className={styles.fmpp_button}>
          {/* <SetPreBidMeetingDate title={"Send to Internal Auditor"} styles={{position: 'absolute', right:'0', bgcolor: '#205295', borderRadius: 5, height: 60, width: 300}}/> */}
          <DonePopup
            text={"Successfully Sent to Internal Auditor"}
            title={"Send to Internal Auditor"}
            styles={{
              position: "absolute",
              right: "0",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 300,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FinalizedMasterProcurementPlan;
