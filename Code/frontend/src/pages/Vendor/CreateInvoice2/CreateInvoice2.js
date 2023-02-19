import React from 'react'
import styles from "./createInvoice2.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";

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

export default function CreateInvoice2() {
  return (
    <div style={{ overflowX: "hidden" }}>
        <SideNavBar list1={list1} list2={list2} user={user} />
        <div className={styles.afmpp_mainBody}>
      <div className={styles.afmpp_heading}>
                <IconButton sx={{pl:'15px',height:'34px',width:'34px'}}><ArrowBackIosIcon sx={{color:'#ffffff'}}/></IconButton>
                INVOICE
            </div>
            <div className={styles.POID}>
                <Typography sx={{marginLeft:'10px'}}>
                    PURCHASE ORDER ID:
                </Typography>

            </div>
            </div>
    </div>
  )
}
