import React, { useEffect, useState } from "react";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchNoFilter from "../../../components/Search/Search";
import { Container } from "@mui/system";
import styles from "./ApprovedItemList.module.css";
import ViewVendors from "../../../components/Popups/ViewVendors/ViewVendors";
import { vendors } from "../../../users/vendors.js";
import Sucessfullyinformed from "../../../components/Popups/DonePopup/Successfullyinformed";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetApprovedItems } from "../../../services/ProcurementCommittee/ProcurementCommitteeServices";

function ViewMasterProcurementPlan() {
  const Recomandedvendors1 = vendors;
  const columns = [
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },

    { id: "Ven", label: "Vendors", Width: 300, align: "center" },
    {
      id: "Action",
      label: "Action",
      Width: 300,
      align: "center",
    },
  ];


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
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetApprovedItems(mppId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const dataNotification = [
    {
      message: 'Publish Paper Ad !',
      type: 'Publish Paper Ad',
      divisionName: 'CoparateCommunication',
    },
    {
      message: 'Publish Paper Ad !',
      type: 'Publish Paper Ad',
      
    },

  ];
  return (
    <div className={styles.outer}>
      <Container
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
            <h1 className={styles.Header}>Approved Item List</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <div className={styles.header2Section}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontFamily: "inter",
                  fontWeight: "500",
                  fontSize: 28,
                  ml: 1.2,
                  mr: 4,
                  color: "#ffffff",
                  alignSelf: "flex-end",
                  mt: 4,
                }}
              >
                Items to Notify
              </Typography>
            </div>
          </div>
          <SearchNoFilter className={styles.search} />
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
                            {row.recommendedVendors}
                          </TableCell>
                          <TableCell align="center">{<Sucessfullyinformed notifyVendors={true} notificationData={dataNotification[0]} name="Vendor" title="Notify Vendor" notificationData2={dataNotification[1]}/>}</TableCell>
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

export default ViewMasterProcurementPlan;
