import {
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Box,
  Container,
  paperClasses,
  Typography,
} from "@mui/material";
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Styles from "./AddNewItemtoSubProcurementPlan.module.css";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Link as Routerlink} from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import { useState } from "react";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import { useEffect } from "react";
import { getCategoryList } from "../../services/DivisionHOD/deivisionHODServices";
import { addNewItemDb } from "../../services/DivisionHOD/deivisionHODServices";
function AddNewItemtoSubProcurementPlan() {

  useEffect(() => {

    const fetchData = async () => {
        
  
      try {
        const data = await getCategoryList();
        console.log(data);
        setcategoryList(data);
        
       
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();


  }, []);
  
  const [categoryList, setcategoryList] = useState([]);
 
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  const [itemName, setItemName] = useState("");
  const [itemSpecification, setItemSpecification] = useState("");
  const [isAdding, setIsAdding] = React.useState(false);
  const handleCategoryIdChange = (event) => {
    setSelectedCategoryId(event.target.value);
    console.log(event.target.value);
  };

  const addData = () => {
    if (!isAdding) { 
      setIsAdding(true);
      addNewItemDb(itemName, itemSpecification, selectedCategoryId)
        .then(() => {
          console.log("Item Added");
          
         
        })
        .catch((error) => {
          console.log(error);
          return;
          
        });
    }
  };
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
              pt: { lg: 2.5, md: 1},
              pb: { lg: 2.5, md: 1 },
              ml: { lg: 2.5, md: 1 },
              borderRadius: 10,
              position: "absolute",
            }}
          >
            <div className={Styles.entireBody}>
              <div className={Styles.bodyBlueContainerMain}>
                
              </div>

              <div className={Styles.bodyContainer}>
                <div className={Styles.bodyLeft}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ItemName"
                    label="Item Name"
                    name="ItemName"
                    autoComplete="ItemName"
                    autoFocus
                    onChange={(e) => setItemName(e.target.value)}
                  />
                   <div >
              <Typography>Category</Typography>
              <div >
              
              <SelectDropDown list={categoryList.map((category) => category.categoryName)} value={selectedCategoryId} onChange={handleCategoryIdChange} /> 
              
              </div>
              </div>

                  
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
                    onChange={(e) => setItemSpecification(e.target.value)}
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>
              <div className={Styles.addButton} onClick={() => {
                  addData();
                }}>
              <DonePopup
                text={"Successfully Added New Item to System"}
                title={"Add"}
                
                styles={{
                  marginTop: "50px",
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
