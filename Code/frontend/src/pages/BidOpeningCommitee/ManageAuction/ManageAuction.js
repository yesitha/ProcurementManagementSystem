import React from "react";
import "./ManageAuction.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
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
    {id: 'Ven', label: 'Vendors', Width: 300, align:'center'},
    {id: 'Odate',label: 'Opening Date',Width: 300,align: 'center'},
    {id: 'Cdate',label: 'Closing Date',Width: 300,align: 'center'},
    {id: 'Rdate',label: 'Remaining Days',Width: 300,align: 'center'},
    {id: 'act', label: 'Action', Width: 300, align:'center'},
  ];
  
  function Setdate() {
    return (
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="date"
          label="Set Date"
          type="date"
          align="center"
          defaultValue={new Date().toISOString().substr(0, 10)}
          sx={{ width: 200, height: 50 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    );
  }

  function createData(ItemID,ItemName,Qty,Ven,Odate,Cdate,act) {
    if (!Cdate) return null;
    const currentDate = new Date();
    const future = new Date(Cdate);
    const timeDiff = future.getTime() - currentDate.getTime();
    const Rdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return { ItemID,ItemName,Qty,Ven,Odate,Cdate,Rdate,act };
  }
  
  const rows = [
    createData('I0014',
    'A4 Papers',
    '500',
    <Button variant="contained">View</Button>,
    Setdate(),
    Setdate(),
    <Button variant="contained">Schedule</Button>),
    
    createData('I0028', 'Ruler', '10',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0015', 'Stapler', '50',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0016', 'Pens', '100',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0017', 'Notebooks', '25',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0018', 'Printer Ink', '10',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0019', 'Paper Clips', '200',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0020', 'Tape', '15',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0021', 'Envelopes', '75',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0022', 'File Folders', '50',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0023', 'Scissors', '20',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0024', 'Whiteboard Markers', '30',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0025', 'Calculator', '5',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0026', 'Post-it Notes', '100',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0027', 'Highlighters', '20',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
  ]

function ManageAuction(){
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
      <div className="sideNavBar">
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className="main"
        sx={{ ml: { xs: "60px",sm:"65px", md: "65px",lg:"68px", xl: "70px" } ,display:"flex",flexDirection:"column"}}
      >
        <div className="upperSection">
          <div className="ManageAuctionPageContainer__header">
            <IconButton sx={{  pl:'15px' ,height:'34px',width:'34px',mt:3.7}}><ArrowBackIosIcon sx={{color:'#ffffff',}}/></IconButton>
          
            <h1 className="Header"> Manage Auctions</h1>
          </div>
        </div>

        <div className="MiddleSection">
        <h1 className="header2">Items to Auction</h1>
        <SearchNoFilter className="search"/>
        </div>


        <div className="downSection">
        <Paper  className="baseTableContainer" elevation={6} sx={{mr: { xs: "60px",sm:"65px", md: "65px",lg:"68px", xl: "70px" },alignItems:"center",borderRadius:"31px"}}>
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

export default ManageAuction;