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
import Styles from "./AddItemtoSubProcurementPlan.module.css";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { user, list1, list2, actions, actionButtons } from '../Usermanage';
import { Link as Routerlink } from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";


function AddItemtoSubProcurementPlan() {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Container
        sx={{
          ml: { xs: "20px", sm: "20px", md: "20px", lg: "21px", xl: "22px" },
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
            <h1 className={Styles.headTitleName}>
              [ Add / Modify / Modify Rejected ] Item to Sub Procurement Plan{" "}
            </h1>
          </div>
        </div>
        <div className="bottomSection">
          <Paper
            elevation={6}
            sx={{
              pl: 5,
              pr: { lg: 5, md: 5 },
              ml: { lg: 2.5, md: 1 },
              mr: 2,
              borderRadius: 10,
            }}
          >
            <div>
              <div className={Styles.bodyBlueContainerMain}>
                <div className={Styles.bodyBlueContainer}>
                  <h3>Sub Procurement ID : Sp003</h3>
                  <h3>Division: [Production Division]</h3>
                </div>
              </div>

              <div className={Styles.bodyContainer}>
                <div className={Styles.bodyLeft}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="itemName"
                    label="Item Name"
                    name="itemName"
                    autoFocus
                  />



                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="itemId"
                    label="Item ID"
                    name="itemId"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Quantity"
                    label="Quantity"
                    name="Quantity"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="estimatedBudget"
                    label="Estimated Budget"
                    name="estimatedBudget"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="recommendedVendor"
                    label="Recommended Vendor"
                    name="recommendedVendor"
                    autoComplete="email"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="exDate"
                    label="Expected date"
                    name="exDate"
                    autoFocus
                  />
                </div>
                <div className={Styles.bodyRight}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    rows={8}
                    multiline
                    id="Specification"
                    label="Specification"
                    name="Specification"
                    autoFocus
                  />

                  <div className={Styles.evidenceContainer}>
                    <p>Evidence of Authorization*</p>
                    <AddCircleOutlineIcon />
                  </div>
                </div>
              </div>
              <div className={Styles.addButton}>
                <DonePopup
                text={"Successfully Added"}
                title={"Add Item to Sub Procurement Plan"}
                styles={{
                  position: "absolute",
                  right: "0",
                  bgcolor: "#205295",
                  borderRadius: 5,
                  height: 60,
                  width: 300,
                }}
                />
                <Routerlink to={'/add-new-item'}>               
                 <Button className={Styles.belowButton}variant="contained">Add a new Item to system</Button>
                </Routerlink>

              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default AddItemtoSubProcurementPlan;
