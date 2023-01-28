import { Grid, IconButton } from "@mui/material";
import { Container, display } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import "./MasterProcurementPlanStatus.css";

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
function MasterProcurementPlanStatus() {
  return (
    <div>
      <div className="sideNavBar">
        <SideNavBar list1={list1} list2={list2} user={user} />
      </div>

      <Container
        className="main"
        sx={{ ml: { xs: "60px",sm:"65px", md: "65px",lg:"68px", xl: "70px" } ,display:"flex",flexDirection:"column"}}
      >
        <div className="upperSection">
          <div className="NotificationPageContainer__header">
            <IconButton sx={{  pl:'15px' ,height:'34px',width:'34px',mt:3.7}}><ArrowBackIosIcon sx={{color:'#ffffff',}}/></IconButton>
          
            <h1 className="NotificationPageHeader"> Master Procurement Plan Status</h1>
          </div>
          
              
         
        </div>
        <div className="downSection">
            
        </div>
      </Container>
    </div>
  );
}

export default MasterProcurementPlanStatus;
