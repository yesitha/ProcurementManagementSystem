import React from "react";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import styles from "./PublishPaperAd.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Container,
  Button,
  FormControl,
  Box,
  NativeSelect,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CssBaseline,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as Routerlink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ClosestPreBidMeetingDate } from "../../../services/CorporateCommittee/CorporateCommitteeServices";
import { useEffect, useState } from "react";
import { DateFormat } from "../../../services/dataFormats";
import { fetchDatatoTable } from "../../../services/CorporateCommittee/CorporateCommitteeServices";

function CreateSubProcurementPlan() {
  const columns = [
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },
    { id: "Action", label: "Action", Width: 300, align: "center" },
  ];
  function createData(ItemID, ItemName, Qty, Action) {
    return { ItemID, ItemName, Qty, Action };
  }

  const rows = [
    createData(
      "I0014",
      "A4 Papers",
      "500",
      <Routerlink to={"/publish-papaer-ad-view-item"}>
        <Button className={styles.ViewButton} variant="contained">
          View
        </Button>
      </Routerlink>
    ),
    createData(
      "P0023",
      "Printer Ink Cartridges",
      "100",
      <Routerlink to={"/publish-papaer-ad-view-item"}>
        <Button className={styles.ViewButton} variant="contained">
          View
        </Button>
      </Routerlink>
    ),
    createData(
      "C0012",
      "Computer Monitors",
      "50",
      <Routerlink to={"/publish-papaer-ad-view-item"}>
        <Button className={styles.ViewButton} variant="contained">
          View
        </Button>
      </Routerlink>
    ),
  ];

  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState();
  const [newdata, setnewdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClosestPreBidMeetingDate();
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDatatoTable(data);
        const newdata = response;
        setnewdata(newdata);
        console.log(newdata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>Publish Paper Ad</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>PRE-BID MEETING DATE : {DateFormat(data)}</h4>
          </div>
        </div>

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
            }}
          >
            <TableContainer className={styles.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={styles.TableHeaders}>
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
                  {newdata &&
                    newdata
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
                            {row.totalquantity}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            {
                              <Routerlink
                                to={
                                  `/publish-papaer-ad-view-item/${row.itemId}`
                                }
                              >
                                <Button
                                  className={styles.ViewButton}
                                  variant="contained"
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
              count={data ? data.length : 0}
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

export default CreateSubProcurementPlan;
