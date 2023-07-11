import React from "react";
import styles from "./TenderDetails.module.css";
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
  CreateVendorPlaceBidItem,
  GetApprovedItemDetailsitemId,
} from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";
import { user } from "../../Usermanage";

function TenderDetails() {
  const [bidValue, setbidValue] = useState(null);

  const handleChange = (event) => {
    setbidValue(event.target.value);
  };

  const calculateTenderValue = () => {
    if (bidValue && data && data[0]) {
      const tenderValue =
        parseFloat(bidValue) * parseFloat(data[0].totalQuantity);
      return isNaN(tenderValue) ? "" : MoneyFormat(tenderValue);
    }
    return "";
  };

  const { itemId } = useParams();
  const [data, setData] = useState(null);
  const vendorId = user.id;
  // console.log(vendorId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetApprovedItemDetailsitemId(itemId);
        const data = response;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (data === null) {
    return <p style={{ marginLeft: "20px" }}>Loading...</p>;
  }

  const handlePlaceBid = async () => {
    try {
      await CreateVendorPlaceBidItem(vendorId, itemId, bidValue);
    } catch (error) {
      console.log(error);
    }
  };

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
            <h1 className={styles.Header}>{data[0].itemName}</h1>
          </div>
        </div>
        <h3 className={styles.header2}>Tender Details</h3>
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
              width: 700,
            }}
          >
            SPECIFICATION
            <TextField
              margin="normal"
              rows={8}
              multiline
              id="specification"
              name="specification"
              autoFocus
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { padding: "10px", borderRadius: "4px", maxWidth: 500 },
              }}
              value={data[0].specification}
            />
            EXPECTED DELIVERY DATE
            <TextField
              margin="normal"
              fullWidth
              id="exdate"
              name="exdate"
              autoFocus
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  padding: "10px",
                  borderRadius: "4px",
                  height: 56,
                  width: 300,
                },
              }}
              value={DateFormat(data[0].expectedDeliveryDate)}
            />
            QUANTITY
            <TextField
              margin="normal"
              fullWidth
              size="medium"
              id="qty"
              name="qty"
              autoFocus
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  padding: "10px",
                  borderRadius: "4px",
                  height: 56,
                  width: 300,
                },
              }}
              value={data[0].totalQuantity}
            />
            BID VALUE
            <TextField
              margin="normal"
              required
              fullWidth
              size="medium"
              id="bidvalue"
              name="bidvalue"
              sx={{ width: 300 }}
              value={bidValue}
              onChange={handleChange}
            />
            TOTAL TENDER VALUE
            <TextField
              margin="normal"
              required
              fullWidth
              id="tendervalue"
              name="tendervalue"
              size="medium"
              sx={{ width: 300 }}
              value={calculateTenderValue()}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  padding: "10px",
                  borderRadius: "4px",
                  height: 56,
                  width: 300,
                },
              }}
            />
          </Paper>
        </div>

        <div className={styles.downSection}>
          <h3 className={styles.header2}></h3>
          <div className={styles.tableNbutton}>
            <div onClick={handlePlaceBid}>
              <Routerlink to={-1}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#227C70",
                    width: 150,
                    height: 150,
                    borderRadius: "20px",
                  }}
                >
                  <Container display="flex" flexDirection="column">
                    <GavelIcon style={{ fontSize: 40 }} />
                    <Typography>Place BID</Typography>
                  </Container>
                </Button>
              </Routerlink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TenderDetails;
