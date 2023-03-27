import React from "react";
import styles from "./ReviseVendorSelection.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from "@mui/system";
import VendorDetails from '../../../components/Popups/VendorDetails/VendorDetails';

const columns = [
    {id: 'vendorID', label: 'Vendor ID', Width: 300, align:'center'},
    {id: 'VendorName', label: 'Vendor Name', Width: 300, align:'center'},
    {id: 'Item', label: 'Item', Width: 300, align:'center'},
    {id: 'Qty', label: 'Quantity', Width: 300, align:'center'},
    {id: 'specification', label: 'Specification', Width: 300, align:'center'},
    {id: 'bidvalue',label: 'Bid Value',Width: 300,align: 'center'},
    {id: 'Venveri',label: 'Vendor Verification',Width: 300,align: 'center'},
    {id: 'act', label: 'Action', Width: 300, align:'center'},
  ];
  
  function createData(vendorID,VendorName,Item,Qty,specification,bidvalue,Venveri,act) {
    return {vendorID,VendorName,Item,Qty,specification,bidvalue,Venveri,act};
  }
  
  const rows = [
    createData('V0015',
        'ABC Bookshop',
        'A4 Papers',
        '40',
        'GSM 80',
        '4000',
        <VendorDetails/>,
        <Button variant='contained' fontFamily={'Inter'} sx={{bgcolor: '#205295', borderRadius: 5, height: 50, width: 100}}>Select</Button>),
     createData('V0016',
        'ABC Bookshop',
        'A4 Papers',
        '40',
        'GSM 80',
        '4000',
        <VendorDetails/>,
        <Button variant='contained' fontFamily={'Inter'} sx={{bgcolor: '#205295', borderRadius: 5, height: 50, width: 100}}>Select</Button>)
    ]
    
function ReviseVendorSelection(){
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
      const BidDate = "2022.12.15";
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return(
      <div style={{overflowX:"hidden"}}>
      <div className={styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className={styles.main}
        sx={{ ml: { xs: "60px",sm:"65px", md: "65px",lg:"68px", xl: "70px" } ,display:"flex",flexDirection:"column"}}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <IconButton sx={{  pl:'15px' ,height:'34px',width:'34px',mt:3.7}}><ArrowBackIosIcon sx={{color:'#ffffff',}}/></IconButton>
          
            <h1 className={styles.Header}>Revise Vendor Selection</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
        <div className={styles.Ph2}>
            <h4>Bid Date : {BidDate}</h4>
          </div>
        </div>


        <div className={styles.downSection}>
        <Paper  className={styles.baseTableContainer} elevation={6} sx={{mr: { xs: "60px",sm:"65px", md: "65px",lg:"68px", xl: "70px" },alignItems:"center",borderRadius:"31px"}}>
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
          rowsPerPageOptions={[10,25,50,100]}
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
    )
}

export default ReviseVendorSelection;