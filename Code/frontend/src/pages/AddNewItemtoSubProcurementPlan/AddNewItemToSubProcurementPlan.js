import {
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Box,
  Container,
  paperClasses,
} from "@mui/material";
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Styles from "./AddNewItemtoSubProcurementPlan.module.css";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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

function AddNewItemtoSubProcurementPlan() {
  return (
    <div>
      <div className={Styles.sideNavBar}>
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>
      <Container
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
        }}
      >
        <div className="upperSection">
          <div className={Styles.headTitle}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <h1 className={Styles.headTitleName}> Add New Item</h1>
          </div>
        </div>
        <div className="bottomSection">
          <Paper
            elevation={6}
            sx={{
              pl: 5,
              pr: { lg: 15, md: 5 },
              ml: { lg: 2.5, md: 1 },
              borderRadius: 10,
              position: "absolute",
            }}
          >
            <div className={Styles.entireBody}>
              <div className={Styles.bodyBlueContainerMain}>
                <div className={Styles.bodyBlueContainer}>
                  <h3>Item id : I0056</h3>
                </div>
              </div>

              <div className={Styles.bodyContainer}>
                <div className={Styles.bodyLeft}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Item Name"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Item ID"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                <div className={Styles.bodyRight}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    rows={4.5}
                    multiline
                    id="email"
                    label="Specification"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>
              <div className={Styles.addButton}>
                <Button variant="contained">Add Item</Button>
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default AddNewItemtoSubProcurementPlan;
