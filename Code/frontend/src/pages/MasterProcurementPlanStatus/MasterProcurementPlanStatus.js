import { Grid, IconButton, Paper, Step } from "@mui/material";
import { Container, display } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import styles from "./MasterProcurementPlanStatus.module.css";
import { Link as Routerlink, useParams } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { GetMasterProcurementPlanStatus } from "../../services/ProcurementHOD/ProcurementHODServices";

const steps = [
  "Initiating Procurement Process",
  "TEC Committee Approval",
  "Procurement Committee Approval",
  "Tendor",
  "Audit Verification",
  "DG Approval",
  "Purchase Order",
  "GRN",
  "Invoice",
  "Payment"
];

function MasterProcurementPlanStatus() {

  const {mppId} = useParams();
  const [data,setData] = useState();
  let stepNo = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetMasterProcurementPlanStatus(mppId);
        const data = response;
        setData(data.statusId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
for (let i = 0; i <= 10; i++) {
  if (data=== `STS00010`) {
    stepNo = 10;
    break;
  }  
  else if (data=== `STS0000${i}`) {
      stepNo = i;
      break;
    }
  }
  console.log(stepNo);
  stepNo = parseInt(stepNo);

  return (
    <div style={{ overflowX: "hidden" }}>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.NotificationPageContainer__header}>
            <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            </Routerlink>
            <h1 className={styles.NotificationPageHeader}>
              {" "}
              Master Procurement Plan Status
            </h1>
          </div>
        </div>
        <div className={styles.downSection}>
          <Paper
            className={styles.ProgressBarOuter}
            elevation={6}
            sx={{ py: 4, borderRadius: 5, mr: 8, px: 1 }}
          >
            <ProgressBar step={stepNo} steps={steps} />
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default MasterProcurementPlanStatus;
