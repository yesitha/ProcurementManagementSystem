import { Grid, IconButton, Paper } from "@mui/material";
import { Container, display } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./MasterProcurementPlanStatus.module.css";
import { Link as Routerlink } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const steps = [
  "Initiating Procurement Process",
  "Approval for Specification",
  "Approval for Procurement",
  "Audit Verification",
  "DG Approval for PO",
  "Issuing Purchase Order",
  "Initiating Procurement Process",
  "Good Receive Note",
  "Payment Voucher",
];
function MasterProcurementPlanStatus() {
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
            <ProgressBar step="2" steps={steps} />
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default MasterProcurementPlanStatus;
