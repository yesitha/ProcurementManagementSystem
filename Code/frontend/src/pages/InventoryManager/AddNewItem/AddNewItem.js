import React from "react";
import styles from "./AddNewItem.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";

import { Button, IconButton, Typography } from "@mui/material";

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

export default function AddNewItem() {
  const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

  return (
    <div>
      <SideNavBar list1={list1} list2={list2} user={user} />
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
                label="ITEM ID"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className={styles.bodyContent}>
              <TextField
                width="306px"
                id="email"
                label="ITEM NAME"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className={styles.dropdown}>
              <Typography sx={{marginLeft:"10px",marginTop:"5px"}}>ITEM CATEGORY</Typography>
              <SelectDropDown 
              label="Item Category"
              list={list} />
            </div>
          </div>
          <div className={styles.bodyContent}>
            <TextField
              width="7000px"
              height="210px"
              id="email"
              label="SPECIFICATION"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>
      </Paper>
      {/*<div>
      <button type="button" className={styles.addbutton}><h1 styles={{textAlign:"center",fontSize:20}}>Add</h1></button>
      </div>*/}
      <div className={styles.addbutton}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#205295",
            borderRadius: "32px",
            width: "111px",
            height: "48px",
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
