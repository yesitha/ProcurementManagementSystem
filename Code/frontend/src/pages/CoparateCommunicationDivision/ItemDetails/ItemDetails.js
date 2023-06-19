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
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Styles from "./ItemDetails.module.css";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link as Routerlink, useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import { GetApprovedItemDetails } from "../../../services/CorporateCommittee/CorporateCommitteeServices";

function ItemDetails() {
  const {itemId} = useParams();
  const[data,setData]=useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await GetApprovedItemDetails(itemId);
        const data=response;
        setData(data);
        console.log(data);
  
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [] );

  if (data === null) {
    return <p style={{marginLeft:"20px"}}>Loading...</p>;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container
        sx={{
          ml: { xs: "40px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
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
            <h1 className={Styles.headTitleName}> {data.itemName}</h1>
          </div>
        </div>
        <div className="bottomSection">
          <Paper
            elevation={6}
            sx={{
              pl: { xs: 2, md: 8 },
              pr: { lg: 15, md: 5 },
              ml: { lg: 2.5, md: 1 },
              borderRadius: 10,
              position: "absolute",
              pt: 5,
            }}
          >
            <div>
              <div className={Styles.bodyContainer}>
                <div className={Styles.bodyLeft}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="itemId"
                    label="Item ID"
                    name="itemId"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                      style: { padding: '10px', borderRadius: '4px' }
                    }}
                    value={data.itemId}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="itemName"
                    label="Item Name"
                    name="itemName"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                      style: { padding: '10px', borderRadius: '4px' }
                    }}
                    value={data.itemName}
                  />
   
                  <TextField
                    margin="normal"
                    fullWidth
                    id="qty"
                    label="Quantity"
                    name="qty"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                      style: { padding: '10px', borderRadius: '4px' }
                    }}
                    value={data.approvedTotalQuantity}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="catogory"
                    label="Category"
                    name="catogary"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                      style: { padding: '10px', borderRadius: '4px' }
                    }}
                    value={data.category}
                  />
                </div>
                <div className={Styles.bodyRight}>
                  <TextField
                    margin="normal"
                    fullWidth
                    rows={8}
                    multiline
                    id="email"
                    label="Specification"
                    name="email"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                      style: { padding: '10px', borderRadius: '4px' }
                    }}
                    value={data.specification}
                  />
                </div>
              </div>
              <div className={Styles.doneButtonOuter}>
                <Routerlink to={-1}>
                <Button className={Styles.doneButton} variant="contained">
                  Done
                </Button>
                </Routerlink>
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default ItemDetails;
