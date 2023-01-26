import React, { useState } from "react";
import "./ManageAuction.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Stack, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const columns = [
    { id: 'ItemID', label: 'Item ID', Width: 300, align:'center'},
    { id: 'ItemName', label: 'Item Name', Width: 300, align:'center'},
    { id: 'Qty', label: 'Quantity', Width: 300, align:'center'},
    { id: 'Ven', label: 'Vendors', Width: 300, align:'center'},
    {id: 'Odate',label: 'Opening Date',Width: 300,align: 'center'},
    {id: 'Cdate',label: 'Closing Date',Width: 300,align: 'center'},
    {id: 'Rdate',label: 'Remaining Days',Width: 300,align: 'center'},
    { id: 'act', label: 'Action', Width: 300, align:'center'},
  ];
  function Setdate() {
    return (
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="date"
          label="Set Date"
          type="date"
          align="center"
          defaultValue="YYYY-MM-DD"
          sx={{ width: 200 }}
          //onChange={handleDateChange}
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
    
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
    createData('I0014','A4 Papers','500',<Button variant="contained">View</Button>,Setdate(),Setdate(),<Button variant="contained">Schedule</Button>),
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
        <div>
        <SideNavBar list1={list1} list2={list2} user={user}/>
        <div className="PageHeader1">
        <IconButton><ArrowBackIosIcon color="white"/></IconButton>
        Manage Auction
        <br></br>
        <br></br>
        </div>
        <div className="PageHeader2">
        Items to Auction
        </div>
        <div className="midbody">
        <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
        </div>
        </div>
    )
}

export default ManageAuction;