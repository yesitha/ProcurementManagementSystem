import React from "react";
import styles from "./BidTender.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Paper,Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchNoFilter from "../../../components/Search/Search";
import { Container } from "@mui/system";
import GavelIcon from '@mui/icons-material/Gavel';

const columns = [
    {id: 'ItemName', label: 'Item Name', Width: 300, align:'center'},
    {id: 'Qty', label: 'Quantity', Width: 300, align:'center'},
    {id: 'specification', label: 'Specification', Width: 300, align:'center'},
    {id: 'duedate',label: 'Due Date',Width: 300,align: 'center'},
    {id: 'bidstatus',label: 'Bid Status',Width: 300,align: 'center'},
    {id: 'act', label: 'Action', Width: 300, align:'center'},
  ];
  
  function createData(ItemName,Qty,specification,duedate,bidstatus,act) {
    return {ItemName,Qty,specification,duedate,bidstatus,act};
  }
  
  const rows = [
    createData('A4 Papers',
        '45',
        'GSM 80',
        '2023-01-23',
        <Typography sx={{color:'#227C70'}}>LKR 4000</Typography>,
        <Button variant="contained" sx={{backgroundColor: '#227C70',width:50,height:50,borderRadius:"20px"}}>
        <GavelIcon style={{ fontSize: 30 }} />
        </Button>),
     createData('Pens',
        '45',
        'Blue',
        '2023-01-23',
        <Typography sx={{color:'#9C254D'}}>Not Bided</Typography>,
        <Button variant="contained" sx={{backgroundColor: '#9C254D',width:50,height:50,borderRadius:"20px"}}>
        <GavelIcon style={{ fontSize: 30 }} />
        </Button>),
  ]
    
function BidTender(){
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
          
            <h1 className={styles.Header}> Bid Tender</h1>
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

export default BidTender;