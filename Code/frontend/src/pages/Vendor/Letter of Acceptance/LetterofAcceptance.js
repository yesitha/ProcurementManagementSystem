import React from "react";
import styles from "./LetterofAcceptance.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink } from "react-router-dom";
import { GetApprovedItemDetailsitemId, GetLetterAcceptenceData, updateLetterOfAcceptance } from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";
import { PDFViewer, Document, Page, Text,pdf,StyleSheet,View } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import {user} from "../../Usermanage";
// const FileInput = () => {
//     const [selectedImage, setSelectedImage] = useState(5);
//     const [imageUrl, setImageUrl] = useState(5);

//     useEffect(() => {
//       if (selectedImage) {
//         setImageUrl(URL.createObjectURL(selectedImage));
//       }
//     }, [selectedImage]);
// }

const venderId =user?user.id:"";

const columns = [
  { id: "DOC", Width: 200, align: "center" },
  { id: "view", Width: 200, align: "center" },
  { id: "upld", Width: 200, align: "center" },
  { id: "del", Width: 200, align: "center" },
];



function LetterofAcceptance() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  


  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleBrowseClick() {
    fileInputRef.current.click();
  }
  const {itemId} = useParams();
  const [data, setData] = useState(null);
  const [vendorDetails,setVendorDetails] = useState(null);
  
  


    
    
  

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await GetLetterAcceptenceData(itemId,venderId);
        const data = response;
        setData(data.result2);
        setVendorDetails(data.vendorD) ;
        console.log(data.result2)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDownload =  async () => {


    const stylesPDF = StyleSheet.create({
      page: {
        fontFamily: 'Helvetica',
        fontSize: 13,
        fontWeight: 400,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
        
      },
      pageContainer: {
        border: '1pt solid black', 
        flex: 1,
        padding: 10,
        paddingTop: 60,

      },
      spacing: {
        marginBottom: 20, 
      },
      heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      content: {
        marginBottom: 10,
      },
    });

    const MyDocument = () => (
      <Document>
      <Page size="A4" style={stylesPDF.page}>
        <View style={stylesPDF.pageContainer}>
          <Text style={stylesPDF.heading}>Date: {new Date().toISOString().split('T')[0]}</Text>
          <Text style={stylesPDF.content}>To: PUCSL</Text>
          <Text style={stylesPDF.content}>From: {vendorDetails.companyName}</Text>
          <Text style={stylesPDF.content}>Subject: Acceptance of Offer to Purchase Goods/Services</Text>
          <Text style={stylesPDF.content}>Dear PUCSL,</Text>
          <Text style={stylesPDF.content}>
            We are pleased to confirm our acceptance of your offer to purchase the following goods/services:
          </Text>
          <Text style={stylesPDF.content}>• Item Name: {data.itemName}</Text>
          <Text style={stylesPDF.content}>
            The price for these goods/services is {MoneyFormat(data.bidValue)} and the total cost, including taxes and fees,
            is {MoneyFormat(data.bidValue * data.totalQuantity)}.
          </Text>
          <Text style={stylesPDF.content}>
            Delivery will be made on or before {DateFormat(data.expectedDeliveryDate)}.
          </Text>
          <Text style={stylesPDF.content}>Thank you for the opportunity to work with your company.</Text>
          <Text style={stylesPDF.content}></Text>
          <Text style={stylesPDF.signature}>Sincerely,</Text>
          <Text style={stylesPDF.signatureLine}>___________________</Text>
          <Text style={stylesPDF.signature}>{vendorDetails.vendorFullName}</Text>
          <Text style={stylesPDF.signature}>{vendorDetails.companyName}</Text>
        </View>
      </Page>
    </Document>
    );
  
    const pdfBlob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.itemId}_${venderId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const dataNotification = [
    {
      message: 'New Letter of Acceptance Submited !',
      type: 'New Letter of Acceptance',
      divisionName: 'Finance',
    },
  ];
  
 
  

  if(data==null){
    return <></>
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
            <h1 className={styles.Header}> Letter of Acceptance </h1>
          </div>
        </div>
        <div className={styles.divide}>
          <div>
            <div className={styles.MiddleSection}>
              <h3 className={styles.header2}>Tender Details</h3>
              <Paper
                className={styles.UpperContainer}
                elevation={6}
                sx={{
                  mr: {
                    xs: "60px",
                    sm: "65px",
                    md: "65px",
                    lg: "68px",
                    xl: "340px",
                  },
                  alignItems: "left",
                  borderRadius: "20px",
                }}
              >
                SPECIFICATION
                <br />
                <br />
                <TextField
                  id="specification"
                  multiline
                  readOnly
                  rows={4}
                  sx={{ width: 400 }}
                  value={data.specification}
                />
                <br />
                ITEM NAME
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="duedate"
                  name="duedate"
                  size="small"
                  sx={{ width: 300 }}
                  value={data.itemName}
                  
                />
                QUANTITY
                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="qty"
                  name="qty"
                  size="small"
                  sx={{ width: 300 }}
                  value={data.totalQuantity
                  }
                />
                BID VALUE
                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="bidvalue"
                  name="bidvalue"
                  size="small"
                  sx={{ width: 300 }}
                  value={data.bidValue}
                  
                />
              </Paper>
            </div>

            <div className={styles.downSection}>
              <h3 className={styles.header2}>Upload Required Documents</h3>
            </div>
            <br />
            <div className={styles.divide}>
              <div className={styles.color}>
                LETTER OF ACCEPTANCE
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
                      marginBottom: 10,
                    }}
                    readOnly
                  />
                  <label htmlFor="file" style={{ display: "block" }}>
                    <input
                      id="file"
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button
                      style={{
                        width: 150,
                        backgroundColor: "#D29D04",
                        borderRadius: "9px",
                        color: "white",
                        height: 40,
                        marginTop: 10,
                      }}
                      onClick={handleBrowseClick}
                    >
                      BROWSE
                    </button>
                  </label>
                </div>
              </div>
            </div>
            <DonePopup
              notificationData={dataNotification[0]}
              text={"Successfully Submitted"}
              title={"Submit"}
              sx={{
                
                bgcolor: "#205295",
                borderRadius: 5,
                height: 50,
                width: 150,
                marginTop: "10px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                updateLetterOfAcceptance(data.itemId, venderId, selectedFile);
              }}
            />
          </div>
          <div>
            <div>
              <h3 className={styles.header2}>Sample Letter of Acceptance</h3>
              <Paper
                className={styles.UpperContainer}
                elevation={6}
                sx={{
                  mr: {
                    xs: "60px",
                    sm: "65px",
                    md: "65px",
                    lg: "680px",
                    xl: "700px",
                  },
                  alignItems: "left",
                  borderRadius: "20px",
                }}
              >
                 <Typography>
        Date: {new Date().toISOString().split('T')[0]}
        <br />
        <br />
        To: PUCSL
        <br />
        <br />
        From: {vendorDetails.companyName}
        <br />
        <br />
        Subject: Acceptance of Offer to Purchase Goods/Services
        <br />
        <br />
        Dear PUCSL,
        <br />
        <br />
        We are pleased to confirm our acceptance of your offer to purchase the following goods/services:
        <br />
        <br />
        Item Name: {data.itemName}
        <br />
        <br />
        The price for these goods/services is {MoneyFormat(data.bidValue)} and the total cost, including taxes and fees, is {MoneyFormat(data.bidValue * data.totalQuantity)}.
        <br />
        Delivery will be made on or before {DateFormat(data.expectedDeliveryDate)}.
        <br />
        <br />
        Thank you for the opportunity to work with your company.
        <br />
        <br />
        <br />
        Sincerely,
        <br />
        ____________
        <br />
        {vendorDetails.vendorFullName} <br />
        ({vendorDetails.companyName})
      </Typography>
              </Paper>
              <Button
                variant="contained"
                fontFamily={"Inter"}
                sx={{
                  bgcolor: "#227C70",
                  borderRadius: 5,
                  height: 50,
                  width: 150,
                  marginTop: "10px",
                  marginLeft: "200px",
                  marginTop: "20px",
                }}
                onClick={handleDownload}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default LetterofAcceptance;
