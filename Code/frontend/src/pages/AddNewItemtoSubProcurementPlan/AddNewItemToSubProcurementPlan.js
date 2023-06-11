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
import {Link as Routerlink} from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";

function AddNewItemtoSubProcurementPlan() {
  return (
    <div>
      <div className={Styles.sideNavBar}>
      </div>
      <Container
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
        }}
      >
        <div className="upperSection">
          <div className={Styles.headTitle}>
            <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            </Routerlink>
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
              <DonePopup
                text={"Successfully Added New Item to System"}
                title={"Add"}
                styles={{
                  position: "absolute",
                  right: "0",
                  bgcolor: "#205295",
                  borderRadius: 5,
                  height: 60,
                  width: 300,
                }}
                />
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default AddNewItemtoSubProcurementPlan;
