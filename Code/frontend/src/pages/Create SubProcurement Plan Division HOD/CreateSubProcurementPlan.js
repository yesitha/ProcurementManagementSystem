import React from 'react'
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./CreateSubProcurementPlan.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container, Button, FormControl, Box, NativeSelect, Card, CardContent, IconButton, Paper, Stack, TextField, Typography, Select, MenuItem, InputLabel, CssBaseline } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import SearchFilter from "../../../src/components/SearchNoFilter/SearchNoFilter";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchNoFilter from "../../components/Search/Search";
import SelectDropDown from '../../components/SelectDropDown/SelectDropDown';


function CreateSubProcurementPlan() {

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
    { id: 'ItemID', label: 'Item ID', Width: 300, align: 'center' },
    { id: 'ItemName', label: 'Item Name', Width: 300, align: 'center' },
    { id: 'Qty', label: 'Quantity', Width: 300, align: 'center' },
    { id: 'Specification', label: 'Specification', Width: 300, align: 'center' },
    { id: 'RV', label: 'Recommended Vendors', Width: 300, align: 'center' },
    { id: 'EDD', label: 'Expected Delivery Date', Width: 300, align: 'center' },
    { id: 'Del', Width: 300, align: 'center' },
  ];
  function createData(ItemID, ItemName, Qty, Specification, RV, EDD, Del) {
    return { ItemID, ItemName, Qty, Specification, RV, EDD, Del };
  }

  const rows = [
    createData('I0014', 'A4 Papers', '500', 'GSM 80', 'ABC Bookshop', '2023-10-05',
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("P0023", "Printer Ink Cartridges", "100", "Epson Compatible", "XYZ Office Supplies", "2022-03-15",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("C0012", "Computer Monitors", "50", "27 inch, 1080p", "DEF Electronics", "2022-05-20",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("S0056", "Safety Gloves", "1000", "Latex-free, Medium Size", "GHI Workwear", "2022-07-10",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("M0089", "Medical Supplies", "500", "Sterilized, Disposable", "JKL Healthcare", "2022-09-15",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("F0035", "Furniture", "20", "Leather, Executive office chair", "MNO Interior Design", "2022-11-25",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("T0078", "Telecommunication Equipment", "30", "5G compatible, Router", "PQR Technology", "2023-01-15",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("B0092", "Building Materials", "200", "Galvanized steel, 2x4", "STU Construction", "2023-03-10",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("L0101", "Lab Equipment", "50", "Digital, pH meter", "VWX Science", "2023-05-20",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("G0049", "Gardening Equipment", "100", "Gas-powered, Lawnmower", "YZ Landscaping", "2023-07-15",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),
    createData("D0123", "Janitorial Supplies", "300", "Eco-friendly, All-purpose cleaner", "ABC Cleaning", "2023-09-10",
      <IconButton aria-label="delete" sx={{ color: '#205295' }}><DeleteIcon /></IconButton>),

  ]

  const list = ['MPPI10000', 'MPPI10001', 'MPPI10002', 'MPPI10003'];
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
    <div style={{ overflowX: "hidden" }}>


      <div className={styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className={styles.main}
        sx={{ ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" }, display: "flex", flexDirection: "column" }}
      >

        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <IconButton sx={{ pl: '15px', height: '34px', width: '34px', mt: 3.7 }}><ArrowBackIosIcon sx={{ color: '#ffffff', }} /></IconButton>

            <h1 className={styles.Header}>Sub Procurement Plan</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>Division: [Production Division]</h4>
          </div>


          <div className={styles.MiddleSectionN}>
            <div className={styles.Ph3}>
              <h4 className={styles.h4m}>SUB PROCUREMENT ID*</h4>
              <SelectDropDown list={list} />
            </div>

            <SearchNoFilter className={styles.search} />
          </div>
        </div>

        <div className={styles.downSection}>



          <Paper className={styles.baseTableContainer} elevation={6} sx={{ mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" }, alignItems: "center", borderRadius: "31px" }}>
            <TableContainer className={styles.tableContainer} >
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
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

          <div classname='footerButton' style={{display:'flex', alignContent:'flex-end',marginTop:15}}>
            <Button variant="contained">Add Item</Button>
            <Button variant="contained" style={{marginLeft:40}}>Modify item</Button>
          </div>






        </div>



      </Container >
    </div >

  )
}

export default CreateSubProcurementPlan