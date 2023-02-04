import styles from "./CreateModifyTECCommittee.module.css";
import React, { useState } from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import {users} from "../../users/SystemUsers";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DonePopup from '../../components/Popups/DonePopup/DonePopup';
import {
  IconButton,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles,
  Paper,
  Button,
} from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


const rows = users;




function CreateModifyTECCommittee() {

    
//   const classes = useStyles();
const [leftTableData, setLeftTableData] = useState(rows);
const [rightTableData, setRightTableData] = useState([]);

const handleClickLeftToRight = (row) => {
    setRightTableData([...rightTableData, row]);
    setLeftTableData(leftTableData.filter((data) => data.id !== row.id));
};

const handleClickRightToLeft = (row) => {
    setLeftTableData([...leftTableData, row]);
    setRightTableData(rightTableData.filter((data) => data.id !== row.id));
};
  const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
  const masterProcurementId = "MP0001";
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
  return (
    <div style={{ overflowX: "auto" }}>
      <div className={styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          
          flexDirection: "column",
        //   overflowY: "hidden",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <h1 className={styles.Header}>Create TEC Committee</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>Master Procurement Id : {masterProcurementId}</h4>
          </div>
        
        <Container className={styles.MiddleSection} sx={{display:"flex",pt:4,flexDirection:{xs:"column",lg:"row"}}} style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
          <div className={styles.leftTable}>
              <TableContainer className={styles.TableContainer} component={Paper}>
                <Table className={styles.table} aria-label="left table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow className={styles.TableRow} key={row.id} onClick={() => handleClickLeftToRight(row)} >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.firstname +" " +row.lastname}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </div>

          <div className="ArrowSection" style={{alignSelf:'center',margin:10,}}><DoubleArrowIcon style={{ fontSize: 50, }} sx={{transform:{xs:'rotate(90deg)',sm:'rotate(90deg)',lg:'rotate(0deg)'}}} /> </div>
         <div className={styles.rightTable} >
              <TableContainer className={styles.TableContainer} component={Paper}   >
                <Table className={styles.table} aria-label="right table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow className={styles.TableRow} key={row.id}   onClick={() => handleClickRightToLeft(row)}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.firstname +" " +row.lastname}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
         </div>
        </Container>
        </div>
        <div className={styles.lowerSection}>
        <Container
            className={styles.rightButton}
            sx={{ justifyContent: { xs: "left" ,sm:"center", lg: "center" } }}
          >
            
            <Button
              className={styles.TecAppointButton}
              
              variant="contained"
              sx={{
                mt: 2,
                ml:{xs:14,md:2},
                borderRadius: 4,
                mb: 0.3,
                minWidth:'150px'
              }}
            >
              Create TEC Committee
            </Button>
          </Container>

            </div>
      </Container>
    </div>
  );
}

export default CreateModifyTECCommittee;
