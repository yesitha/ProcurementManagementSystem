import React from "react";
import styles from "./TecReport.module.css";
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
import SearchNoFilter from "../../../components/Search/Search";
import { Container } from "@mui/system";

const columns = [
    {id: 'ItemID', label: 'Item ID', Width: 300, align:'center'},
    {id: 'ItemName', label: 'Item Name', Width: 300, align:'center'},
    {id: 'Qty', label: 'Quantity', Width: 300, align:'center'},
    {id: 'specification', label: 'Specification', Width: 300, align:'center'},
    {id: 'selectedbidvalue',label: 'Selected Bid Value',Width: 300,align: 'center'},
    {id: 'selectedven',label: 'Selected Vendors',Width: 300,align: 'center'},
    {id: 'numofbidreceived',label: 'Number of Bid received',Width: 300,align: 'center'},
    {id: 'act', label: 'Action', Width: 300, align:'center'},
  ];
  
  function createData(ItemID,ItemName,Qty,specification,selectedbidvalue,selectedven,numofbidreceived,act) {
    return {ItemID,ItemName,Qty,specification,selectedbidvalue,selectedven,numofbidreceived,act};
  }
  
  const rows = [
    createData('I0015',
        'A4 Papers',
        '45',
        'GSM 80',
        'LKR 4000',
        'Vendor 01',
        '05',
        <Button variant="contained">View</Button>),
     createData('I0016',
        'Pens',
        '60',
        'Blue',
        'LKR 5000',
        'Vendor 05',
        '10',
        <Button variant="contained">View</Button>),
    ]
    
function TecReport(){
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
          
            <h1 className={styles.Header}> Tec Report</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
        <SearchNoFilter className={styles.search}/>
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

export default TecReport;