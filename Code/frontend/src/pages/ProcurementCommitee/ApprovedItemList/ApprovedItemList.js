import React from "react";
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
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import ViewVendors from "../../../components/Popups/ViewVendors/ViewVendors";
import { vendors } from "../../../users/vendors.js";
import { Link as Routerlink } from "react-router-dom";

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

  function Setdate(date) {
    return (
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="date"
          type="date"
          align="center"
          disabled
          defaultValue={new Date(date).toISOString().substr(0, 10)}
          sx={{ width: 140, height: 50 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    );
  }

  function createData(ItemID, ItemName, Qty, Ven, Action) {
    return { ItemID, ItemName, Qty, Ven, Action };
  }

  const rows = [
    createData(
      "I0015",
      "Stapler",
      "50",

      <ViewVendors vendors={Recomandedvendors1} />,
      <Button variant="contained" className={styles.NotifyVendors}>
        Notify Vendors
      </Button>
    ),
    createData(
      "I0016",
      "Pens",
      "100",

      <ViewVendors vendors={Recomandedvendors1} />,
      <Button variant="contained" className={styles.NotifyVendors}>
        Notify Vendors
      </Button>
    ),
    createData(
      "I0017",
      "Notebooks",
      "25",

      <ViewVendors vendors={Recomandedvendors1} />,
      <Button variant="contained" className={styles.NotifyVendors}>
        Notify Vendors
      </Button>
    ),
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

  return (
    <div className={styles.outer} style={{ overflowX: "hidden" }}>
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
      </Container>
    </div>
  );
}

export default ViewMasterProcurementPlan;
