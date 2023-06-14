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
import PreviewIcon from '@mui/icons-material/Preview';
import {Link as Routerlink} from 'react-router-dom';

const rows = users;


function CreateMasterProcurementPlan() {

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
  const masterProcurementId = "MP0001";

  return (
    <div>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",

          flexDirection: "column",
          //   ]overflowY: "hidden",
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
          <div className={styles.Ph2}>
            <h4>Master Procurement Id : {masterProcurementId}</h4>
          </div>

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
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow
                      className={styles.TableRow}
                      key={row.id}
                      onClick={() => handleClickLeftToRight(row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {row.firstname + " " + row.lastname}
                      </TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>
                        <Routerlink to={`/pd-view-sub-procurement-plan`}>
                        <PreviewIcon onClick={(event) => {
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
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.id}
                        onClick={() => handleClickRightToLeft(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>
                          {row.firstname + " " + row.lastname}
                        </TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell><Routerlink to={`/pd-view-sub-procurement-plan`}>
                        <PreviewIcon onClick={(event) => {
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