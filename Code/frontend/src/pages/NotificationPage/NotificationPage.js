
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./NotificationPage.module.css";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Switch, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../../fonts.css';
import { Box } from "@mui/system";
import SearchNoFilter from "../../components/SearchNoFilter/SearchNoFilter";

const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
const actionButtons=[{name:"New Master Procurement plan for Evaluate",number:"2"},{name:"Rejected Item Modified",number:"1"},{name:"Auctions End",number:"1/30"},{name:"Vendor Rejected",number:"1"}]
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





function NotificationPage() {

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className={styles.NotificationPageContainer}>
        <div className={styles.supperSection}>
          <div className={styles.NotificationPageContainer__header}>
            <IconButton sx={{  pl:'15px' ,height:'34px',width:'34px',mt:3.7}}><ArrowBackIosIcon sx={{color:'#ffffff',}}/></IconButton>
          
            <h1 className={styles.NotificationPageHeader}> Notifications</h1>
          </div>
          
              <SearchNoFilter/>
         
        </div>
        <div className={styles.downSection}>
            <div className={styles.ArrowBackIosIconNotificationPageContainer__body}>
            <Paper className={styles.paper} elevation={6} sx={{borderRadius:10,width:'50vw',pl:3,pr:6,ml:5.5}}>
                <List>
                    {actionButtons.map((notification,index)=>(
                       
                    <ListItem divider={index < actionButtons.length - 1}> 
                    <ListItemText className={styles.ListItemText} sx={{fontFamily:'Inter',fontWeight:'500'}}>
                        <Typography className={styles.ListItemText}>{notification.number} - {notification.name}</Typography>
                         </ListItemText>
                    <Button variant="contained" sx={{borderRadius:5,backgroundColor:'#205295',color:'#ffffff',fontSize:'20px',py:1,px:4,'&:hover':{backgroundColor:'#2C74B3'},textTransform: 'none'}}>View</Button>
                    
                   </ListItem>
              

                  
                    ))}
                
                
                </List>
                
                
                </Paper>

                </div>

        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
