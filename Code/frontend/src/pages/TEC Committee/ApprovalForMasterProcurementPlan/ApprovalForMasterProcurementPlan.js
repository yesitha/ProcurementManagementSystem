import React from "react";
import styles from "./ApprovalForMasterProcurementPlan.module.css";
import {
  Button,
  Container,
  IconButton,
  Paper,
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
import { Link as Routerlink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetMasterProcurementPlanmppid } from "./../../../services/TecCommitte/TecCommitteeservices";
import { GetItemListmppid } from "./../../../services/TecCommitte/TecCommitteeservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "itemID", label: "Item ID", Width: 300, align: "center" },
  { id: "itemName", label: "Item Name", Width: 300, align: "center" },
  { id: "quentity", label: "Quentity", Width: 300, align: "center" },
  {
    id: "estimatedBudget",
    label: "Estimated Budget",
    Width: 300,
    align: "center",
  },
  { id: "action", label: "Action", Width: 300, align: "center" },
];

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

  const { mppId } = useParams();
  const [title, settitle] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetMasterProcurementPlanmppid(mppId);
        const title = response;
        settitle(title);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await GetItemListmppid(mppId);
        const data = response;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (title === null) {
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
                MASTER PROCUREMENT ID : {mppId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                CREATED DATE : {DateFormat(title.creationDate)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "12px", sm: "15px", md: "16px" },
                  color: "#ffffff",
                }}
              >
                GRAND TOTAL : {MoneyFormat(title.estimatedGrandTotal)}
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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.estimatedBudget)}
                          </TableCell>
                          <TableCell align="center">
                            {
                              <Routerlink
                                to={`/view-item-tec/${row.itemId}/${mppId}`}
                              >
                                <Button
                                  className={styles.ViewButton}
                                  variant="contained"
                                  sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
                                >
                                  View
                                </Button>
                              </Routerlink>
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
        </div>
      </Container>
    </div>
  );
}

export default ApprovalForMasterProcurementPlan;
