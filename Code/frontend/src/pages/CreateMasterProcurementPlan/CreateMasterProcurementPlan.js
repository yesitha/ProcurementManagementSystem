import styles from "./CreateMasterProcurementPlan.module.css";
import React, { useState } from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import { users } from "../../users/SystemUsers";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link as Routerlink} from 'react-router-dom';
import { useEffect } from "react";
import{fetchSppDataFromDb} from '../../services/PurchasingDivisionHOD/PurchasingDivisionHOD.js';
import {createNewMPP} from '../../services/PurchasingDivisionHOD/PurchasingDivisionHOD.js';
const rows = users;


function CreateMasterProcurementPlan() {

const [leftTableData, setLeftTableData] = useState(rows);
const [rightTableData, setRightTableData] = useState([]);

useEffect(() => {

const fetchData = async () => {

try {

  const response = await fetchSppDataFromDb();
  
  const data = response;
  setLeftTableData(data);
  console.log(data);

}catch (error) {
  console.log(error);
}

}
fetchData();

}, []);

  const handleClickLeftToRight = (row) => {
    setRightTableData([...rightTableData, row]);
    setLeftTableData(leftTableData.filter((data) => data.sppId !== row.sppId));
  };

  const handleClickRightToLeft = (row) => {
    setLeftTableData([...leftTableData, row]);
    setRightTableData(rightTableData.filter((data) => data.sppId!== row.sppId));
  };
  

  return (
    <div style={{ overflowX: "auto" }}>

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
            <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            </Routerlink>

            <h1 className={styles.Header}>Create Master Procurement Plan</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          

          <Container
            className={styles.MiddleSection}
            sx={{
              display: "flex",
              pt: 4,
              flexDirection: { xs: "column", lg: "row" },
            }}
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div className={styles.leftTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="left table">
                  <TableHead>
                    <TableRow>
                      <TableCell>SubProc ID</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Grand Total</TableCell>
                      <TableCell>Action</TableCell>
                    

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow
                      className={styles.TableRow}
                      key={row.sppId}
                      onClick={() => handleClickLeftToRight(row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.sppId}
                      </TableCell>
                      <TableCell>
                        {row.divisionName}
                      </TableCell>
                      <TableCell>{row.totalEstimatedBudget}</TableCell>
                      <TableCell>
                        <Routerlink to={`/pd-view-sub-procurement-plan`}>
                        <VisibilityIcon sx={{color:'#205295'}} onClick={(event) => {
                          event.stopPropagation();
                          console.log("Preview Clicked");
                        }} />
                        </Routerlink>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div
              className="ArrowSection"
              style={{ alignSelf: "center", margin: 10 }}
            >
              <DoubleArrowIcon
                style={{ fontSize: 50 }}
                sx={{
                  transform: {
                    xs: "rotate(90deg)",
                    sm: "rotate(90deg)",
                    lg: "rotate(0deg)",
                  },
                }}
              />{" "}
            </div>
            <div className={styles.rightTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="right table">
                  <TableHead>
                    <TableRow>
                      <TableCell>SubProc ID</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Grand Total</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.sppId}
                        onClick={() => handleClickRightToLeft(row)}
                      >
                        <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {row.divisionName}
                      </TableCell>
                      <TableCell>{row.totalEstimatedBudget}</TableCell>
                      
                        <TableCell><Routerlink to={`/pd-view-sub-procurement-plan`}>
                        <VisibilityIcon  sx={{color:'#205295'}} onClick={(event) => {
                          event.stopPropagation();
                          console.log("Preview Clicked");
                        }} />
                        </Routerlink></TableCell>

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
            sx={{ justifyContent: { xs: "left", sm: "center", lg: "center" } }}
          >
            <Routerlink to={'/RequesttoInitiateMasterProcurementPlan'}>
            <Button
              onClick={() => createNewMPP(rightTableData.map((data) => data.sppId))}
              className={styles.TecAppointButton}
              variant="contained"
              sx={{
                mt: 2,
                ml: { xs: 14, md: 2 },
                borderRadius: 4,
                mb: 0.3,
                minWidth: "150px",
              }}
            >
              Create Master Procurement Plan
            </Button>
            </Routerlink>
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default CreateMasterProcurementPlan