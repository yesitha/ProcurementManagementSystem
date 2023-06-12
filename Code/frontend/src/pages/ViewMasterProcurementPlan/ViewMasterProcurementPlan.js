import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
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
import SearchNoFilter from "../../components/Search/Search";
import { Container } from "@mui/system";
import styles from "./ViewMasterProcurementPlan.module.css";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import ViewRecomandedVendors from "../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";
import { vendors } from "../../users/vendors.js";
import { Link as Routerlink } from "react-router-dom";

function ViewMasterProcurementPlan() {
  const Recomandedvendors1 = vendors;

  const columns = [
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },
    { id: "Devi", label: "Devision", Width: 300, align: "center" },
    { id: "Specs", label: "Specifications", Width: 300, align: "center" },
    { id: "RVen", label: "Recommended Vendors", Width: 300, align: "center" },
    {
      id: "Edate",
      label: "Expected Delivery date",
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

  function createData(ItemID, ItemName, Qty, Devi, Specs, RVen, Edate) {
    return { ItemID, ItemName, Qty, Devi, Specs, RVen, Edate };
  }

  const rows = [
    createData(
      "I0014",
      "A4 Papers",
      "500",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0028",
      "Ruler",
      "10",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0015",
      "Stapler",
      "50",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0016",
      "Pens",
      "100",
      "Finance",
      "24 BOX",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0017",
      "Notebooks",
      "25",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0018",
      "Printer Ink",
      "10",
      "Finance",
      "Black",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0019",
      "Paper Clips",
      "200",
      "Finance",
      "Aluminium",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0020",
      "Tape",
      "15",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0021",
      "Envelopes",
      "75",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
    ),
    createData(
      "I0022",
      "File Folders",
      "50",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors1} />,
      Setdate("2022.12.12")
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

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

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
            <h1 className={styles.Header}>Master Procurement Plan</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <div className={styles.header2Section}>
            <div>
              <Typography
                sx={{
                  fontFamily: "mulish",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  ml: 1.2,
                  color: "#ffffff",
                }}
              >
                MASTER PROCUREMENT PLAN ID*
              </Typography>
              <SelectDropDown className={styles.dropDown} list={list} />
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
          <Container
            className={styles.rightButton}
            sx={{ justifyContent: { xs: "center", md: "right" } }}
          >
            <Routerlink to={'/create-modify-teccommittee'}>
            <Button
              className={styles.TecAppointButton}
              variant="contained"
              sx={{
                mt: 1.2,
                mr: { xs: 6, sm: 4, md: 6 },
                borderRadius: 8,
                mb: 0.3,
              }}
            >
              Appoint TEC Committee
            </Button>
            </Routerlink>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default ViewMasterProcurementPlan;
