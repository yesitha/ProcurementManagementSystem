import React, { useEffect, useState } from "react";
import styles from "./ViewItemPC.module.css";
import {
  Button,
  Container,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
import { Link as Routerlink, useParams } from "react-router-dom";
import {
  GetItemDetails,
  approve,
} from "../../../services/ProcurementCommittee/ProcurementCommitteeServices";
import { DateFormat } from "../../../services/dataFormats";

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

function ViewItemPC() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { itemId, mppId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetItemDetails(itemId, mppId);
        const data = response;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (data === null) {
    return <p>Loading...</p>;
  }

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
            <h1 className={styles.Header}>{data.itemName}</h1>
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
                MASTER PROCUREMENT ID : {mppId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                CREATED DATE : {DateFormat(data.creationDate)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                ITEM ID : {itemId}
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
                  {data.itemDetails &&
                    data.itemDetails
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
                          <TableCell align="center">{row.sppId}</TableCell>
                          <TableCell align="center">
                            {row.divisionName}
                          </TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
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
                            {row.recommendedVendors}
                          </TableCell>
                          <TableCell align="center">
                            {DateFormat(row.expectedDeliveryDate)}
                          </TableCell>
                          <TableCell align="center">
                            {row.tecCommitteeStatus}
                          </TableCell>
                          <TableCell align="center">
                            {
                              <EvidenceOfAthorization
                                sppId={row.sppId}
                                itemId={itemId}
                              />
                            }
                          </TableCell>
                          <TableCell align="center">
                            {
                              <div className={styles.ActionButonsContainer}>
                                <div
                                  onClick={(event) => {
                                    approve(row.sppId, itemId);
                                    event.stopPropagation();
                                  }}
                                >
                                  <ApprovePopup />
                                </div>
                                <RejectPopup
                                   notificationData={{
                                    message: 'Item Rejected !',
                                    type: 'Item Rejected',
                                    divisionName: row.divisionName,
                                  }}
                                  link={`${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/UpdateProcurementCommitteeStatus?sppId=${row.sppId}&itemId=${itemId}&procurementCommitteeStatus=reject&procurementCommitteeComment=$rejectedComment`}
                                />
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
              count={10}
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
            <Routerlink to={`/ApprovedItemList/${mppId}`}>
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
            </Routerlink>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default ViewItemPC;
