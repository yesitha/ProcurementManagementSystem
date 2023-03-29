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
import Styles from "../RequesttoInitiateSubProcurementPlan/RequesttoInitiateSubProcurementPlan.module.css";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import ViewRecomandedVendors from "../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";
import { vendors } from "../../users/vendors.js";

function RequesttoInitiateSubProcurementPlan() {
  const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    designation: "Financial Division HOD",
    department: "Finance",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City, 123456",
    gender: "Male",
    profilePic: "https://www.w3schools.com/howto/img_avatar.png",
  };
  const Recomandedvendors1 = vendors;
  const columns = [
    {
      id: "ItemID",
      label: "Master Procurement Plan ID",
      Width: 300,
      align: "center",
    },
    { id: "ItemName", label: "Grand Total", Width: 300, align: "center" },
    { id: "Qty", label: "Creation Date", Width: 300, align: "center" },
    { id: "Devi", label: "Status", Width: 300, align: "center" },
    { id: "Specs", label: "Action", Width: 300, align: "center" },
  ];

  const rows = [
    createData(
      "M0015",
      "50000.00",
      Setdate("2022.11.01"),
      "Approved",
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2, borderRadius: 4 }}
      >
        Request to Initiate
      </Button>
    ),
    createData(
      "M0016",
      "25000.00",
      Setdate("2022.10.15"),
      "Rejected",
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2, borderRadius: 4 }}
      >
        Request to Initiate
      </Button>
    ),
    createData(
      "M0017",
      "75000.00",
      Setdate("2022.09.20"),
      "Pending",
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2, borderRadius: 4 }}
      >
        Request to Initiate
      </Button>
    ),
    createData(
      "M0018",
      "100000.00",
      Setdate("2022.08.05"),
      "Approved",
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2, borderRadius: 4 }}
      >
        Request to Initiate
      </Button>
    ),
    createData(
      "M0019",
      "35000.00",
      Setdate("2022.07.25"),
      "Rejected",
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2, borderRadius: 4 }}
      >
        Request to Initiate
      </Button>
    ),
  ];

  function createData(ItemID, ItemName, Qty, Devi, Specs, RVen, Edate) {
    return { ItemID, ItemName, Qty, Devi, Specs, RVen, Edate };
  }
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
    <div>
      <div>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={Styles.upperSection}>
          <div className={Styles.Page__Header}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <h1 className={Styles.Header}>Master Procurement Plan</h1>
          </div>
        </div>

        <div className={Styles.MiddleSection}>
          <div className={Styles.header2Section}></div>
          <SearchNoFilter className={Styles.search} />
        </div>

        <Paper
          className={Styles.baseTableContainer}
          elevation={6}
          sx={{
            mt: "20px",
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
          <TableContainer className={Styles.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={Styles.TableHeaders}>
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
      </Container>
    </div>
  );
}

export default RequesttoInitiateSubProcurementPlan;
