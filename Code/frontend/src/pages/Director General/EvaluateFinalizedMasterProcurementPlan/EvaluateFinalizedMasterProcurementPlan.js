import React from 'react';
import styles from './EvaluateFinalizedMasterProcurementPlan.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from '../../../components/SelectDropDown/SelectDropDown';
import SearchNoFilter from '../../../components/Search/Search';
import { Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VendorDetails from '../../../components/Popups/VendorDetails/VendorDetails';
import DonePopup from '../../../components/Popups/DonePopup/DonePopup';
import SetPreBidMeetingDate from '../../../components/Popups/SetPreBidMeetingDate/SetPreBidMeetingDate';
import Approve from '../../../images/Approve.png';
import Reject from '../../../images/Reject.png';
//===============Applicable for table data===================================

const columns = [
    {id: 'ItemID', label: 'Item ID', Width: 300, align:'center'},
    {id: 'ItemName', label: 'Item Name', Width: 300, align:'center'},
    {id: 'Qty', label: 'Quantity', Width: 300, align:'center'},
    {id: 'Spe', label: 'Specification', Width: 300, align:'center'},
    {id: 'Division',label: 'Division',Width: 300,align: 'center'},
    {id: 'Vendor', label: 'Vendor', Width: 300, align:'center'},
    {id: 'EDdate',label: 'Expected Delivery date',Width: 300,align: 'center'},
    {id: 'AuditReview',label: 'Inernal Auditors Review',Width: 300,align: 'center'},
    {id: 'Action', label: 'Action', Width: 300,align: 'center'}
  ];

  function createData(ItemID,ItemName,Qty,Spe,Division,Vendor,EDdate,AuditReview,Action) {
    return { ItemID,ItemName,Qty,Spe,Division,Vendor,EDdate,AuditReview,Action};
  }

  const ApproveRejctButton = (
    <>
      <IconButton><img src={Approve}/></IconButton>
      <IconButton><img src={Reject}/></IconButton>
    </>
  )

  const auditApproved = (
    <>
        <Typography sx={{color:'#227C70', '&:hover':{cursor:'pointer'}}}>
            Approved
        </Typography>
    </>
  )

  const auditRejected = (
    <>
        <Typography sx={{color:'#9C254D', '&:hover':{cursor:'pointer'}}}>
            Rejected
        </Typography>
    </>
  )

  const auditPending = (
    <>
        <Typography sx={{color:'#D29D04', '&:hover':{cursor:'pointer'}}}>
            Pending
        </Typography>
    </>
  )
  
  const rows = [
    createData('I0014','A4 Papers','500','loerm','IT Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
    createData('I0028', 'Ruler', '10','loerm','IT Department',<VendorDetails/>,'2023/01/01',auditRejected,ApproveRejctButton),
    createData('I0015', 'Stapler', '50','loerm','IT Department',<VendorDetails/>,'2023/01/01',auditPending,ApproveRejctButton),
    createData('I0016', 'Pens', '100','loerm','Engineering Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
    createData('I0017', 'Notebooks', '25','loerm','Engineering Department',<VendorDetails/>,'2023/01/01',auditPending,ApproveRejctButton),
    createData('I0018', 'Printer Ink', '10','loerm','Engineering Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
    createData('I0019', 'Paper Clips', '200','loerm','Engineering Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
    createData('I0020', 'Tape', '15','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditRejected,ApproveRejctButton),
    createData('I0021', 'Envelopes', '75','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditRejected,ApproveRejctButton),
    createData('I0022', 'File Folders', '50','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditPending,ApproveRejctButton),
    createData('I0023', 'Scissors', '20','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditPending,ApproveRejctButton),
    createData('I0024', 'Whiteboard Markers', '30','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
    createData('I0025', 'Calculator', '5','loerm','Finance Department',<VendorDetails/>,'2023/01/01',auditPending,ApproveRejctButton),
    createData('I0026', 'Post-it Notes', '100','loerm','Technical Department',<VendorDetails/>,'2023/01/01',auditRejected,ApproveRejctButton),
    createData('I0027', 'Highlighters', '20','loerm','Technical Department',<VendorDetails/>,'2023/01/01',auditApproved,ApproveRejctButton),
  ]

//===========================================================================

// Here in class names, efmmp=EvaluateFinalizedMasterProcurementPlan

function EvaluateFinalizedMasterProcurementPlan() {

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

//=======values for 'SelectDropDown.js' as an array=======

const list=['MPPI10000', 'MPPI10001', 'MPPI10002', 'MPPI10003'];

//========================================================

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
    <div>
        <SideNavBar list1={list1} list2={list2} user={user}/>
        <div className={styles.efmpp_mainBody}>
            <div className={styles.efmpp_heading}>
                <IconButton sx={{pl:'15px',height:'34px',width:'34px'}}><ArrowBackIosIcon sx={{color:'#ffffff'}}/></IconButton>
                Evaluate Finalized Master Procurement Plan
            </div>
            <div className={styles.efmpp_title_search}>
                <div className={styles.efmpp_title}>
                    <label>MASTER PROCUREMENT PLAN ID*</label>
                    <SelectDropDown list={list}/>
                </div>
                <div className={styles.efmpp_search}>
                    <SearchNoFilter/>
                </div>
            </div>
            
            {/* Add table data */}

            <div className={styles.efmpp_table}>
                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 5, scrollBehavior: 'smooth'}}>
                    <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className={styles.TableHeaders0}>
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
            <div className={styles.efmpp_button}>  
              <DonePopup text={"Successfully informed Procurement Officer"} title={"Permission For Raising PO"} styles={{position: 'absolute', right:'0', bgcolor: '#205295', borderRadius: 5, height: 60, width: 350}}/>
            </div>
        </div>
    </div>
  )
}

export default EvaluateFinalizedMasterProcurementPlan