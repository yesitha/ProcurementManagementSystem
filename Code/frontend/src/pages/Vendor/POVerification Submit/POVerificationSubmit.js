import React from "react";
import styles from "./BidVerificationSubmit.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import GavelIcon from "@mui/icons-material/Gavel";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link as Routerlink } from "react-router-dom";
import {GetPODetailsbyId} from "../../../services/Vendor/Vendorservices";
import {MoneyFormat,DateFormat} from "../../../services/dataFormats"

///////////////Add axios/////////////

const columns = [
  { id: "DOC", Width: 200, align: "center" },
  { id: "view", Width: 200, align: "center" },
  { id: "upld", Width: 200, align: "center" },
  { id: "del", Width: 200, align: "center" },
];




function BidVerificationSubmit() {
  const {poId} =useParams();
  const [data,setData]= useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetPODetailsbyId(poId);
        const data = response;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  if (data === null) {
    return <p></p>;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.TenderDetailsPageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>Purchase Order Verification Submit</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <Paper
            className={styles.UpperContainer}
            elevation={6}
            sx={{
              mr: {
                xs: "60px",
                sm: "65px",
                md: "65px",
                lg: "68px",
                xl: "70px",
              },
              alignItems: "left",
              borderRadius: "20px",
              width: 400,
              backgroundColor: "#205295",
              mt:3,
              mb:3,
              
            }}
          >
            <Typography sx={{color:'white',mt:2,mb:1,ml:3}}>Purchase Order Id : {poId}</Typography>
            <Typography sx={{color:'white',mt:1,mb:1,ml:3}}>Date : {DateFormat(data.date)}</Typography>
            <Typography sx={{color:'white',mb:2,mt:1,ml:3}}>Total Value : {MoneyFormat(data.totalAmount)}</Typography>
          </Paper>
        </div>

        <div className={styles.downSection}>
          <h3 className={styles.header2}>Upload Required Document</h3>
          <div className={styles.tableNbutton}>
            <Paper
              className={styles.DownContainer}
              elevation={6}
              sx={{
                mr: {
                  xs: "60px",
                  sm: "65px",
                  md: "65px",
                  lg: "68px",
                  xl: "70px",
                },
                alignItems: "center",
                borderRadius: "20px",
                justifyContent:'center',
                textAlign:'center',
                alignItems:'center',
                mt:3,
                pt:3
              }}
            >
       <Container sx={{display:'flex',flexDirection:'row'}}>
       <Container  sx={{display:'flex',flexDirection:'column',width:'320px',pl:'2'}}>
        <Typography sx={{mt:1,mb:1,textAlign:'left',mb:1}}>Agreement :</Typography>
        <Typography sx={{mt:1,mb:1,textAlign:'left',mb:1}}>Bank Guarantee :</Typography>
        <Typography sx={{mt:1,mb:1,textAlign:'left',mb:1}}>Bond :</Typography>
       </Container>
      <Container sx={{display:'flex',flexDirection:'column'}}>
        <Container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',mb:1}}>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Download</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Upload</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Delete</Button>
        </Container>
        <Container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',mb:1}}>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Download</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Upload</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Delete</Button>
        </Container>
        <Container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Download</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Upload</Button>
          <Button sx={{color:'white',backgroundColor:'#205295'}}>Delete</Button>
        </Container>

      </Container>

       </Container>



            </Paper>
            <Routerlink to={"/letter-of-acceptance"}>
              <Button variant="contained" sx={{ mt: 15 ,backgroundColor:'#205295' ,height:50,width:150 }}>
                Next
              </Button>
            </Routerlink>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BidVerificationSubmit;
