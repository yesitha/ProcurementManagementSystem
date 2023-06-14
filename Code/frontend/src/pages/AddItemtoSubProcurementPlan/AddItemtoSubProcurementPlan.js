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
import React, { useState } from "react";
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
  const [evidenceOfAuthorization, setEvidenceOfAuthorization] = useState(
    "0xAAA860541B3FA4BA9E97ADA65AA909186581278367A609976B3FFFBDCFFBAB9A83CF7E1B78A5E274A34510231CD7A434D0E399D56477A6039EC8E9DB3FE7EAA2EC12228A2BEDA0BF9EB3E02196E67A939ACBECEC62D6350B297A7DAFBB0635BC5A6D360AB41A08E242D936B197846DB74E554173FAFE4016DC1761B070F104987D23C728B070DF7FC209A9889F8474A40DC56066C4C1C15C2D1F2D9DB8577251D59E3373BD4407DE76C1B0F154B77658A3BDA3AB909DD3BC626AFB904241C76A9758B3015000E6C8BD82EF0311D00875A9D4FAFBB4C7C037CA77115249769B35FA4559FB047507A2D6DBED0EAED0AA926286E76E47CCB6CF987B36D9EE947F47E7BA08CB760C7033CC5724D9DAB289FACC7FEFC28F2DEE2E8F8A63893E2EB4425CA626F3C7DF1B5615B3A1EFA7DDF5E5F13C0C6EA4BCB7BACCDA3CECA9E7F59EA3E27D348B9633ED6499ADDB8CFE86B1957D970222459D9FEE6C26ECA32FAD2EBE024CC460C0595B081F0A0A0FDB2ECE548A562B4FF27B5D44DD451F6F464934EC7E1D89B2C251D4233BF9023A9390123D589818D881DECB86EF7F827A3AECC2D5D61D90BEA51C9138820814F97922B14C33E216AE305B6BA05102C242CE59E94F372D64750054983C06E05679CAD20DCCCD364758D513A47AB2EF6CA2594E69281EC4C14BBD3C4BDE49D9A75005F2D67EF4F675981191792388EAC211E7F5E3B8762D5A0511C20E91EA690EFB6C5374C018EDAE63D9D1178C4A9DC3D3793AF653F6EFDAD897D06D31E7E3ADA8837DB7347502F8F94780DEA515CDBB73FF3B18B072BA057D799B2848807C7BF6236E09CCE68E5D7641FD0C761035C2C915FA32ABCBFD36C8783ABADAD9B079CA04E881A7C3EE8D70DDA16E75AD8F6C44D85F328549D02A26374154ABD3829D9183427128B31B05276DC1CD2A8EC11AE9CD76027A7EF48034BD5A70829AE19D5B04DDF16B1D4391BD590A188802009775276BDE5D8022138FC23D6A58AB838D8B247226B1CFAECB89E4442173DBF831BDC3FA5A2F033FDAE1C962A9DFD93812D57D8D6390DAE6A6789F54783B01A0B3C90CAD95B0295E88E49844E76D05EBB0AC324CF54E95A1E2DC54E28FAFC79EE029AEDFD32BA261AC1F047EF795FE3873B3A3CB09B5AA65346ACAB85C46CED91DF964BDBE2518850AD19FD54916A94CDE1B6EDB0BFB952A7F48AB6860E90565512A60FD31407A4D9B1EC13715D51C1EC17EDA40D8F2CD2264393E757AAF2420CC3A841EB5AC1B9DA0213FED395D15A92C8DA7E20FC48D5E5D3E99F80205D3ECF9A16BDA51FD6815633CA0B6B3E0E807239448ED07421008AD25C17612239B9B4D53F398F23A582F24927ED223D6AB7D5691D46DBCE6E4B79063"
  );
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [quantity, setQuantity] = useState(0);

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
      sppId: selectedSubId,
      itemId: selectedItemId,
      recommendedVendor: recommendedVendor,
      evidenceOfAuthorization: evidenceOfAuthorization,
      expectedDeliveryDate: formattedDate,
      estimatedBudget: parseInt(estimatedBudget),
      quantity: parseInt(quantity),
    };

    try {
      console.log("formData: " + JSON.stringify(formData));
      pushNewItemSubProcurementPlan(formData);

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

                    <div className={Styles.evidenceContainer}>
                      <p>Evidence of Authorization*</p>

                      <AddCircleOutlineIcon />
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
