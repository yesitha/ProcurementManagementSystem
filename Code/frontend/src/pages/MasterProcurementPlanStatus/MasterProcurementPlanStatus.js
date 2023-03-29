import { Grid, IconButton, Paper } from "@mui/material";
import { Container, display } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./MasterProcurementPlanStatus.module.css";

import ProgressBar from "../../components/ProgressBar/ProgressBar";

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
      <div className={styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

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
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

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
