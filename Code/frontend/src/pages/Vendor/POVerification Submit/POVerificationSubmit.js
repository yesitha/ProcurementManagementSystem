import React, { useRef } from "react";
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
import {
  GetPODetailsbyId,
  fetchAlreadyUploadedPDf,
  sendFilesToDB,
} from "../../../services/Vendor/Vendorservices";
import { MoneyFormat, DateFormat } from "../../../services/dataFormats";

function BidVerificationSubmit() {
  const { poId } = useParams();
  const [data, setData] = useState(null);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedBankGuarantee, setSelectedBankGuarantee] = useState(null);
  const [selectedBond, setSelectedBond] = useState(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const [uplodedPdf, setUploadedPdfs] = useState(null);

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
      try {
        const response = await fetchAlreadyUploadedPDf(poId);
        const data = response;
        console.log(data);
        setUploadedPdfs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (uplodedPdf) {
      setSelectedAgreement(
        uplodedPdf.find((item) => item.name === `${poId}_Agreement`? item : null)
      );
      setSelectedBankGuarantee(
        uplodedPdf.find((item) => item.name === `${poId}_BankGuarantee`? item : null)
      );
      setSelectedBond(
        uplodedPdf.find((item) => item.name === `${poId}_Bond`? item : null)
      );
    }
    console.log(uplodedPdf)
  }, [uplodedPdf]);

  const handleBrowseClick1 = () => {
    fileInputRef1.current.click();
  };
  const handleBrowseClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleBrowseClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedAgreement(file);
    } else {
      setSelectedAgreement(null);
      alert("Please select a PDF file.");
    }
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedBankGuarantee(file);
    } else {
      setSelectedBankGuarantee(null);
      alert("Please select a PDF file.");
    }
  };
  const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedBond(file);
    } else {
      setSelectedBond(null);
      alert("Please select a PDF file.");
    }
  };
  const handleDownload = (file) => {
    if (file && file.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = `${file.name}.pdf`;
      link.click();
    } else {
      console.log("Invalid file object or missing URL.");
    }
  };

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
            <h1 className={styles.Header}>
              Purchase Order Verification Submit
            </h1>
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
              mt: 3,
              mb: 3,
            }}
          >
            <Typography sx={{ color: "white", mt: 2, mb: 1, ml: 3 }}>
              Purchase Order Id : {poId}
            </Typography>
            <Typography sx={{ color: "white", mt: 1, mb: 1, ml: 3 }}>
              Date : {DateFormat(data.date)}
            </Typography>
            <Typography sx={{ color: "white", mb: 2, mt: 1, ml: 3 }}>
              Total Value : {MoneyFormat(data.totalAmount)}
            </Typography>
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
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                mt: 3,
                pt: 3,
              }}
            >
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "320px",
                    pl: "2",
                  }}
                >
                  <Typography sx={{ mt: 1, mb: 1, textAlign: "left", mb: 1 }}>
                    Agreement :
                  </Typography>
                  <Typography sx={{ mt: 1, mb: 1, textAlign: "left", mb: 1 }}>
                    Bank Guarantee :
                  </Typography>
                  <Typography sx={{ mt: 1, mb: 1, textAlign: "left", mb: 1 }}>
                    Bond :
                  </Typography>
                </Container>
                <Container sx={{ display: "flex", flexDirection: "column" }}>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 1,
                      
                    }}
                  >
                    <input
                    type="text"
                    value={selectedAgreement ? selectedAgreement.name : ""}
                    style={{
                      width: 300,
                      height: 25,
                      backgroundColor: "white",
                      borderRadius: "9px",
                      marginRight: 15,
                    }}
                    readOnly
                  />
                    
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="application/pdf"
                      ref={fileInputRef1}
                      style={{ display: "none"}}
                      onChange={handleFileChange1}
                      
                    />
                    

                   <Container sx={{display:'flex',flexDirection:'row'}}>

                   <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295",mr:2 }}
                      onClick={handleBrowseClick1}
                    >
                      Upload
                    </Button>
                    <Button
                    onClick={() => handleDownload(selectedAgreement)}
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295" }}
                    >
                      Download
                    </Button>
                   </Container>
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <input
                    type="text"
                    value={selectedBankGuarantee ? selectedBankGuarantee.name : ""}
                    style={{
                      width: 300,
                      height: 25,
                      backgroundColor: "white",
                      borderRadius: "9px",
                      marginRight: 15,
                    }}
                    readOnly
                  />
                    
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="application/pdf"
                      ref={fileInputRef2}
                      style={{ display: "none" }}
                      onChange={handleFileChange2}
                    />
<Container sx={{display:'flex',flexDirection:'row'}}>
                    <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295" ,mr:2}}
                      onClick={handleBrowseClick2}
                    >
                      Upload
                    </Button>
                    <Button
                      onClick={() => handleDownload(selectedBankGuarantee)}
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295" }}
                    >
                      Download
                    </Button>
                    </Container>
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                     <input
                    type="text"
                    value={selectedBond ? selectedBond.name : ""}
                    style={{
                      width: 300,
                      height: 25,
                      backgroundColor: "white",
                      borderRadius: "9px",
                      marginRight: 15,
                    }}
                    readOnly
                  />
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="application/pdf"
                      ref={fileInputRef3}
                      style={{ display: "none" ,}}
                      onChange={handleFileChange3}
                    />
<Container sx={{display:'flex',flexDirection:'row'}}>
                    <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295",mr:2 }}
                      onClick={handleBrowseClick3}
                    >
                      Upload
                    </Button>
                    <Button
                      onClick={() => handleDownload(selectedBond)}
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#205295" }}
                    >
                      Download
                    </Button>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Paper>
            <Routerlink to={"/letter-of-acceptance"}>
              <Button
                variant="contained"
                sx={{
                  mt: 15,
                  backgroundColor: "#205295",
                  height: 50,
                  width: 150,
                }}
                onClick={sendFilesToDB(
                  poId,
                  selectedAgreement,
                  selectedBankGuarantee,
                  selectedBond
                )}
              >
                Submit
              </Button>
            </Routerlink>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BidVerificationSubmit;
