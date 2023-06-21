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
import React, { useRef, useState } from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Styles from "./AddItemtoSubProcurementPlan.module.css";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { user, list1, list2, actions, actionButtons } from "../Usermanage";
import { Link as Routerlink, useParams } from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import { useEffect } from "react";
import { pushNewItemSubProcurementPlan } from "../../services/DivisionHOD/deivisionHODServices";

import { getItemNameList } from "../../services/DivisionHOD/deivisionHODServices";
import { getVendorList } from "../../services/DivisionHOD/deivisionHODServices";

function AddItemtoSubProcurementPlan() {
  const { division, selectedSubId } = useParams();
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemSpecs, setSelectedItemSpecs] = useState(null);
  const [recommendedVendor, setRecommendedVendor] = useState("");
  const [evidenceOfAuthorization, setEvidenceOfAuthorization] = useState(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
      alert("Please select a PDF file.");
    }
    
  }

  function handleBrowseClick() {
    fileInputRef.current.click();
  }

  const handleSelectItem = (itemName) => {
    const selectedItem = itemDetails.find((item) => item.itemName === itemName);
    if (selectedItem) {
      setSelectedItemId(selectedItem.itemId);
      setSelectedItemSpecs(selectedItem.specification);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await getItemNameList();
        const itemNames = itemData.map((item) => item.itemName);
        setList(itemNames);
        setItemDetails(itemData);
      } catch (error) {
        console.log(error);
      }
      try {
        const vendorList = await getVendorList();
        console.log(vendorList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(list);
    console.log(itemDetails);
  }, [list]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
    handleSelectItem(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateParts = expectedDeliveryDate.split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T00:00:00Z`;
    const formData = {
      SppId: selectedSubId,
      ItemId: selectedItemId,
      RecomendedVendor: recommendedVendor,
     
      expectedDeliveryDate: formattedDate,
      estimatedBudget: parseInt(estimatedBudget),
      quantity: parseInt(quantity),
    };

    try {
      console.log("formData: " + JSON.stringify(formData));
      pushNewItemSubProcurementPlan(formData, selectedFile);

      // Handle success or navigate to a different page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  if (list !== null) {
    return (
      <div style={{ display: "flex", overflow: "hidden" }}>
        <Container
          sx={{
            ml: { xs: "20px", sm: "20px", md: "20px", lg: "21px", xl: "22px" },
          }}
        >
          <div className="upperSection">
            <div className={Styles.headTitle}>
              <Routerlink to={`/SubProcurmentPlan/${selectedSubId}`}>
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
                    <h3>Sub Procurement ID : {selectedSubId}</h3>
                    <h3>Division: {division}</h3>
                  </div>
                </div>

                <div className={Styles.bodyContainer}>
                  <div className={Styles.bodyLeft}>
                    <Typography sx={{ mt: 2, mb: 1 }}>Item Name</Typography>
                    <SelectDropDown
                      list={list}
                      value={itemName}
                      onChange={handleItemNameChange}
                    />

                    <Typography sx={{ mt: 1 }}>Item Id</Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="itemId"
                      name="itemId"
                      value={selectedItemId}
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Quantity"
                      label="Quantity"
                      name="Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="estimatedBudget"
                      label="Estimated Budget"
                      name="estimatedBudget"
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="recommendedVendor"
                      label="Recommended Vendor"
                      name="recommendedVendor"
                      value={recommendedVendor}
                      onChange={(e) => setRecommendedVendor(e.target.value)}
                      autoComplete="email"
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="exDate"
                      label="Expected date"
                      onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                      value={expectedDeliveryDate}
                      name="exDate"
                      autoFocus
                    />
                  </div>
                  <div className={Styles.bodyRight}>
                    <Typography sx={{ mt: 2, mb: 2 }}>
                      Item Specifications
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      rows={8}
                      multiline
                      id="Specification"
                      name="Specification"
                      value={selectedItemSpecs}
                      autoFocus
                    />

                    <div >
                    <Typography sx={{ mt: 2, }}>
                    Evidence of Authorization
                    </Typography>
                     
                      <br />
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                          type="text"
                          value={selectedFile ? selectedFile.name : ""}
                          style={{
                            width: 300,
                            height: 55,
                            backgroundColor: "white",
                            borderRadius: "9px",
                            marginRight: 15,
                          }}
                          readOnly
                        />
                        <label htmlFor="file" style={{ display: "block" }}>
                          <input
                            id="file"
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            accept="application/pdf"
                            onChange={handleFileChange}
                          />
                          <button
                            className={Styles.browseButton}
                            onClick={handleBrowseClick}
                            sx={{
                              mt: 2,
                              mb: 2,
                              ml: 2,
                              height: 55,
                              width: 150,
                              
                              
                              borderRadius: "9px",
                            }}
                          >
                            BROWSE
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Styles.addButton}>
                  <div onClick={handleSubmit}>
                    <DonePopup
                      text={"Successfully Added"}
                      title={"Add Item to Sub Procurement Plan"}
                      styles={{
                        mb: "10px",
                      }}
                      onC
                    />
                  </div>

                  <Routerlink to={"/add-new-item"}>
                    <Button className={Styles.belowButton} variant="contained">
                      Add a new Item to system
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
}

export default AddItemtoSubProcurementPlan;
