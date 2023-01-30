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
import "./ViewMasterProcurementPlan.css";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import ViewRecomandedVendors from "../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";

function ViewMasterProcurementPlan() {
const Recomandedvendors1=["Vendor 1","Vendor 2","Vendor 3","Vendor 4"]
const Recomandedvendors2=["Vendor 5","Vendor 6","Vendor 7","Vendor 8"]
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
      <ViewRecomandedVendors vendors={Recomandedvendors1}/>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0028",
      "Ruler",
      "10",
      "Finance",
      "240 GSM",
      <ViewRecomandedVendors vendors={Recomandedvendors2}/>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0015",
      "Stapler",
      "50",
      "Finance",
      "240 GSM",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0016",
      "Pens",
      "100",
      "Finance",
      "24 BOX",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0017",
      "Notebooks",
      "25",
      "Finance",
      "240 GSM",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0018",
      "Printer Ink",
      "10",
      "Finance",
      "Black",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0019",
      "Paper Clips",
      "200",
      "Finance",
      "Aluminium",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0020",
      "Tape",
      "15",
      "Finance",
      "240 GSM",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0021",
      "Envelopes",
      "75",
      "Finance",
      "240 GSM",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
      Setdate("2022.12.12")
    ),
    createData(
      "I0022",
      "File Folders",
      "50",
      "Finance",
      "240 GSM",
      <Button variant="contained" className="ViewButton">
        View
      </Button>,
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
    <div style={{ overflowX: "hidden" }}>
      <div className="sideNavBar">
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className="main"
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="upperSection">
          <div className="ManageAuctionPageContainer__header">
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <h1 className="Header">Master Procurement Plan</h1>
          </div>
        </div>

        <div className="MiddleSection">
          <div className="header2Section">
            <div className="fmpp-title">
              <Typography className="fmpp-title label" sx={{fontFamily:'mulish',fontSize:{xs:'14px',sm:'15px',md:'16px'},ml:1.2,color:'#ffffff'}}>MASTER PROCUREMENT PLAN ID*</Typography>
              <SelectDropDown className="dropDown" list={list} />
            </div>
          </div>
          <SearchNoFilter className="search" />
        </div>

        <div className="downSection">
          <Paper
            className="baseTableContainer"
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
            <TableContainer className="tableContainer">
              <Table stickyHeader aria-label="sticky table">
                <TableHead className="TableHeaders">
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
            className="rightButton"
            sx={{ justifyContent: { xs: "center", md: "right" } }}
          >
            <Button
              className="TecAppointButton"
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
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default ViewMasterProcurementPlan;
