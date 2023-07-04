import React from "react";
import styles from "./AddNewItem.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import { Link as Routerlink } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CategoryNameList } from "../../../services/InventoryManager/InventoryManagerServices";
import { PostNewItemData } from "../../../services/InventoryManager/InventoryManagerServices";

export default function AddNewItem() {
  

  const [data, setData] = useState();


  const [selectedCategory, setSelectedCategory] = useState(null);
  
  let categoryId = null;
  
 
  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
  };
 

  const handleFormSubmit = ( itemName,
    specification,
  
    selectedOption) => {
    const selectedCategoryObject = data.find(
      
      (item) => item.categoryName === selectedCategory, 
    );
console.log(selectedCategoryObject)
    if (selectedCategoryObject) {
      categoryId = selectedCategoryObject.categoryId;
      
    }
    PostNewItemData( itemName,
      specification,
      categoryId,
      selectedOption
               
      );
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [itemName, setItemName] = useState('');
  const [specification, setSpecification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryNameList();
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

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
        Add New Item
      </div>

      <Paper elevation={6} className={styles.note1}>
        <div className={styles.flex}>
          <div className={styles.bodyMid}>
            <div className={styles.bodyContent}>
              <TextField
                width="306px"
                id="email"
                label="ITEM NAME"
                name="email"
                autoComplete="email"
                autoFocus
                value={itemName}
          onChange={(event) => setItemName(event.target.value)}
              />
            </div>
            {/* <div className={styles.bodyContent}>
              <TextField
                width="306px"
                id="email"
                label="ITEM NAME"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </div> */}
            <div className={styles.dropdown}>
              <Typography sx={{ marginLeft: "10px", marginTop: "5px" }}>
                ITEM CATEGORY
              </Typography>
              <SelectDropDown
                label="Item Category"
                list={data.map((item) => item.categoryName)}
                value={selectedCategory}
              onChange={handleCategorySelection}
              
              
              />
              
            </div>
            <div className={styles.dropdown}>
              <Typography sx={{ marginLeft: "10px", marginTop: "5px" }}>
                ITEM TYPE
              </Typography>
              <SelectDropDown
                label="Item Category"
                list={["Assets", "Stock"]} // Updated list with only two items
                value={selectedOption}
                onChange={handleOptionChange}
              />
            </div>
          </div>
          <div className={styles.bodyContent}>
            <TextField
              width="10px"
              height="210px"
              id="email"
              label="SPECIFICATION"
              name="email"
              autoComplete="email"
              autoFocus
              multiline
              rows={6} // Adjust the number of rows as needed
              value={specification}
              InputProps={{style: {
                borderRadius: "4px",
                width: "310px",height:"230px"}}}
          onChange={(event) => setSpecification(event.target.value)}
            />
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
              handleFormSubmit( itemName,
                specification,
              
                selectedOption);
             
              
            }}
            style={{
              backgroundColor: "#205295",
              borderRadius: "32px",
              width: "111px",
              height: "48px",
            }}
          >
            Add
          </Button>
        </Routerlink>
      </div>
    </div>
  );
}
