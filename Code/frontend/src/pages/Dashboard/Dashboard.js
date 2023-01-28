import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import { Button,  ListItemIcon,  makeStyles,  Paper,  Typography, withStyles, } from "@mui/material";

import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { borderRadius, display } from "@mui/system";
import { styled } from "@mui/material/styles";
import ReactLoading from 'react-loading';



function Dashboard() {

 
  
const date=dayjs();
  const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
  const actions=["Set Pre Bid Meeting Date","Appoint Bid Opening Committee","Evaluate Master Procurement Plan","Create Purchase Order","Create GRN","Evaluate Vendor Fianace Status","View Master Procurement Plan"]
  const actionButtons=[{name:"New Master Procurement plan for Evaluate",number:"2"},{name:"Rejected Item Modified",number:"1"},{name:"Auctions End",number:"1/30"},{name:"Vendor Rejected",number:"1"},{name:"Set Pre Bid Meeting Date"},{name:"Internal Auditor Report Availble"},{name:"Approved Items from DG",number:"10"},{name:"New Invoices Available",number:"10"}]
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
 const [quote, setQuote] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  fetch(`https://api.quotable.io/random?maxLength=100`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return response.json();
  })
    .then((actualData) => {
      setQuote(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setQuote(null);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);



  return (
    <div style={{ display: "flex",overflow:"hidden" }}>
      <SideNavBar list1={list1} list2={list2} user={user} />
      
        <div className="DashboardContainer" >
          <div className="upperSection">
            <div className="upperLeftContainer">
              <div className="DashboardContainer__header">
                <h1 className="DashboardHeader">Dashboard</h1>
              </div>
              <Paper   elevation={6} sx={{pl:5,pr:{lg:15,md:5} ,ml:{lg:2.5,md:1},borderRadius:10}}>
              <div className="welcomeContainer" sx={{pr:{xs:"40px"}}}>
                <h1 className="welcomeHeader">
                  Welcome, {user.firstname}!
                  <span className="welcomeDesignation"> [{user.designation}]</span>
                </h1>
                {loading && <ReactLoading type="bubbles" color="black"  />}
                {error && (
                <h4  className="welcomeText"> {`There is a problem fetching the quote - ${error}`}</h4>
                )}

                {quote && <h4  className="welcomeText">{quote.content}</h4>}
                {quote && <h5 className="confuciusName">-{quote.author}-</h5>}
                
                 <Button variant="contained" sx={{ borderRadius: 10 , width:150 ,mb:2, backgroundColor:'#205295' ,color:'#ffffff'}}>View New <br/>Notifications</Button>
              </div>
              </Paper>
              
            </div>
            <div className="upperRightContainer">
              <Paper elevation={6} sx={{mt:{lg:3.5 ,md:10.5,xs:0}, ml:8 , mr:{md:3},width:'384px',alignItems:"center",height:"315px",display:{xs:'none',lg:"block",md:"block"},borderRadius:10}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <CalendarPicker className="calender" date={date}  />
              </LocalizationProvider>
              </Paper>
              
            </div>
          </div>
          <div className="middleSection">
            {actions.map((action)=>(
              <Button variant="contained" sx={{ borderRadius: 3 , maxWidth:150 ,p:1.5, backgroundColor:'#205295' ,color:'#ffffff',px:10,mx:4,mt:2,mb:0.5}}>{action}</Button>
            ))}
          
  
          </div>
          <div className="lowerSection">
          <div className="lowerSectionHeader">
            <h1 className="lowerSectionHeaderText">Notifications</h1>
            <div className="lowerActionButtons">
            {actionButtons.map((action)=>(
              <Button className="actionButton" variant="contained" sx={{ borderRadius: 3 , maxWidth:150 , height:130,px:1.5, backgroundColor:'#9C254D' ,color:'#ffffff',px:10,mx:4,'&:hover':{backgroundColor:'#b43b63'}}}><div className="actionButtonText"><Typography className="actionButtonNumber" sx={{fontFamily:'Inter',fontSize:'34px',fontWeight:'400'}}>{action.number!=null? action.number:""}</Typography><Typography className="actionButtonText" sx={{fontFamily:'Inter',fontSize:'14px'}}>{action.name}</Typography></div></Button>
            ))}
            </div>
          </div>
          </div>
          
        </div>
      
    </div>
  );
}

export default Dashboard;
