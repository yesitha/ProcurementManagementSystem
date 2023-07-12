import styles from "./CreateModifyBidOpeningCommittee.module.css";
import React, { useState,useEffect} from "react";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import { users } from "../../../users/SystemUsers";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { submitBidOpCommitteeToDb } from "../../../services/ProcurementHOD/ProcurementHODServices";
import { fetchAlreadyMembersInBidOpCommittee } from "../../../services/ProcurementHOD/ProcurementHODServices";
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
import { Link as Routerlink,useParams } from "react-router-dom";

const rows = users;



function CreateModifyBidOpeningCommittee() {

  const {mppId}= useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const[value,setvalue]=useState("Create Bid opening Committee");
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetchAlreadyMembersInBidOpCommittee(mppId);

        const data = response;
        setLeftTableData(data.otherEmployees);
        setRightTableData(data.employeesInBidOpeningCommittee );
        if(data.employeesInBidOpeningCommittee.length>0){
          setvalue("Modify Bid Opening Committee");
        }
     console.log(rightTableData);
      } catch (error) {
        console.log(error);
      }
    };
    if (isFirstRender) {

    fetchData();
  }
   
  }, [isFirstRender]);


  //   const classes = useStyles();
  const [leftTableData, setLeftTableData] = useState(rows);
  const [rightTableData, setRightTableData] = useState([]);

  const handleClickLeftToRight = (row) => {
    setRightTableData([...rightTableData, row]);
    setLeftTableData(leftTableData.filter((data) => data.employeeId!== row.employeeId));
  };

  const handleClickRightToLeft = (row) => {
    setLeftTableData([...leftTableData, row]);
    setRightTableData(rightTableData.filter((data) => data.employeeId!== row.employeeId));
  };
  //const masterProcurementId = "MP0001";

  const handleSubmit = () => {
    // Handle form submission or any other logic here
    submitBidOpCommitteeToDb(mppId,rightTableData.filter(item => item !== null).map((item) => {
      return item.employeeId
      
    }));
    setIsFormSubmitted(true);
  };

  const handleDivClick = (event) => {
    event.stopPropagation();
    if (!isFormSubmitted) {
      handleSubmit();
    }
  };

  const dataNotification = [
    {
      message: 'Pre Bid Meeting Date Scheduled !',
      type: 'Pre Bid Meeting Date Scheduled',
      mppId: mppId,
      committeeType: 'BidOpening'
    },
  ];
  
  return (
    <div>

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
            <h1 className={styles.Header}>Create Bid Opening Committee</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>Master Procurement Id : {mppId}</h4>
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
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.employeeId
                        }
                        onClick={() => handleClickLeftToRight(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.employeeId
}
                        </TableCell>
                        <TableCell>
                          {row.employeeName}
                        </TableCell>
                        <TableCell>{row.divisionName}</TableCell>
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
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.employeeId}
                        onClick={() => handleClickRightToLeft(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.employeeId}
                        </TableCell>
                        <TableCell>
                          {row.employeeName}
                        </TableCell>
                        <TableCell>{row.divisionName}</TableCell>
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
          ><div
          onClick={handleDivClick}
          >
            <DonePopup
            CommitteeNotification={true}
            notificationData={dataNotification[0]}
            text={`Successfully ${value}`}
            title={value}
            styles={{
              position: "absolute",
              right: "0",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 200,
            }}
          /></div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default CreateModifyBidOpeningCommittee;
