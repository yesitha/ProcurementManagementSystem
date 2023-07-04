import React from "react";
import styles from "./IssueItem.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import { Link as Routerlink } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { GetItemList } from "../../../services/InventoryManager/InventoryManagerServices";
import { useEffect, useState } from "react";
import { editQuantity } from "../../../services/InventoryManager/InventoryManagerServices";

export default function IssueItem() {
  const [data, setData] = useState();
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetItemList();
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleItemChange = (event) => {
    const itemName = event.target.value;
    setSelectedItemName(itemName);

    const selectedItem = data.find((item) => item.itemName === itemName);
    setSelectedItem(selectedItem);
  };

  const handleQuantityChange = (event) => {
    const quantityValue = event.target.value;
    setQuantity(quantityValue);
  };

  const [isLoading, setIsLoading] = useState(false);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  const list = data.map((item) => item.itemName); // Extract item names from data

  return (
    <div>
      <div
        style={{
          color: "white",
          fontSize: 36,
          marginLeft: "100px",
          fontFamily: "inter",
          marginTop: "20px",
        }}
      >
        Issue Item
      </div>

      <Paper elevation={6} className={styles.note1}>
        <div className={styles.flex}>
          <div className={styles.bodyMid}>
            <div className={styles.dropdown}>
              <Typography
                sx={{ marginLeft: "5px", marginTop: "5px", width: "300px" }}
              >
                ITEM NAME
              </Typography>
              <SelectDropDown
                label="Item Name"
                list={list}
                value={selectedItemName}
                onChange={handleItemChange}
              />
            </div>
            <div className={styles.bodyContent}>
              <TextField
                margin="normal"
                id="itemId"
                label="Item ID"
                name="itemId"
                value={selectedItem ? selectedItem.itemId : ""}
                autoFocus
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  style: { borderRadius: "4px", width: "310px" },
                }}
              />
            </div>
            <div className={styles.bodyContent}>
              <TextField
                margin="normal"
                id="itemId"
                label="Item Category"
                name="itemId"
                value={selectedItem ? selectedItem.categoryName : ""}
                autoFocus
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  style: { borderRadius: "4px", width: "310px" },
                }}
              />
            </div>
          </div>
          <div>
            <div className={styles.bodyContent} style={{ marginTop: "20px" }}>
              <TextField
                width="400px"
                id="email"
                label="QUANTITY"
                value={quantity}
                onChange={handleQuantityChange}
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  style: { width: "310px" },
                }}
              />
            </div>
            <div className={styles.bodyContent}>
              <TextField
                id="itemId"
                label="Specification"
                name="itemId"
                value={selectedItem ? selectedItem.specification : ""}
                autoFocus
                multiline
                rows={6} // Adjust the number of rows as needed
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  style: {
                    borderRadius: "4px",
                    width: "310px",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Paper>
      {/*<div>
      <button type="button" className={styles.addbutton}><h1 styles={{textAlign:"center",fontSize:20}}>Add</h1></button>
      </div>*/}
      <div className={styles.addbutton}>
        <Routerlink to={-1}>
          <Button
            variant="contained"
            onClick={() => {
              console.log(quantity);
              editQuantity(selectedItem.itemId, quantity);
            }}
            style={{
              backgroundColor: "#205295",
              borderRadius: "32px",
              width: "111px",
              height: "48px",
            }}
          >
            Issue
          </Button>
        </Routerlink>
      </div>
    </div>
  );
}
