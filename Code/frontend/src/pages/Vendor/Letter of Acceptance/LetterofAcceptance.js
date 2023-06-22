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

// const FileInput = () => {
//     const [selectedImage, setSelectedImage] = useState(5);
//     const [imageUrl, setImageUrl] = useState(5);

//     useEffect(() => {
//       if (selectedImage) {
//         setImageUrl(URL.createObjectURL(selectedImage));
//       }
//     }, [selectedImage]);
// }

///////////////Add axios/////////////
// async function getTenderItemDetails(id) {
//   try {
//     const response = await axios.get(`https://localhost:7102/api/Items/TenderItemDetails/${id}`);

//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

const columns = [
  { id: "DOC", Width: 200, align: "center" },
  { id: "view", Width: 200, align: "center" },
  { id: "upld", Width: 200, align: "center" },
  { id: "del", Width: 200, align: "center" },
];

function createData(DOC, view, upld, del) {
  return { DOC, view, upld, del };
}

function LetterofAcceptance() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleBrowseClick() {
    fileInputRef.current.click();
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
                  rows={4}
                  sx={{ width: 400 }}
                  //   value={data.specification}
                />
                <br />
                ITEM NAME
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="duedate"
                  name="duedate"
                  size="small"
                  sx={{ width: 300 }}
                />
                QUANTITY
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="qty"
                  name="qty"
                  size="small"
                  sx={{ width: 300 }}
                />
                BID VALUE
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="bidvalue"
                  name="bidvalue"
                  size="small"
                  sx={{ width: 300 }}
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
              text={"Successfully Submitted"}
              title={"Submit"}
              sx={{
                bgcolor: "#205295",
                borderRadius: 5,
                height: 50,
                width: 150,
                marginTop: "10px",
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
                  Date:_____ <br />
                  <br />
                  To: [Company Name] <br />
                  <br />
                  From: [Vendor Name] <br />
                  <br />
                  Subject: Acceptance of Offer to Purchase Goods/Services
                  <br />
                  <br />
                  Dear [Company Name],
                  <br />
                  <br />
                  We are pleased to confirm our acceptance of your offer to
                  purchase the following goods/services:
                  <br />
                  <br />
                  [Description of goods/services] <br />
                  <br />
                  The price for these goods/services is [price] and the total
                  cost, including taxes and fees, is [total cost]. <br />
                  Delivery will be made on or before [delivery date]. <br />
                  We are pleased to confirm that we are able to offer these
                  goods for a period of [Number of Years] [years/months].
                  <br />
                  Thank you for the opportunity to work with your company.
                  <br />
                  <br />
                  Sincerely, <br />
                  ____
                  <br />
                  [Vendor Name]
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
