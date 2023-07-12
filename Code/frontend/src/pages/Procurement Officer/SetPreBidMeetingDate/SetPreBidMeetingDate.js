import { Grid, IconButton, Paper, Step, Button } from "@mui/material";
import { Container, display } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import styles from "./SetPreBidMeetingDate.module.css";
import { Link as Routerlink, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SetPreBidMeetingDatePO } from "../../../services/ProcurementHOD/ProcurementHODServices";
import Typography from "@mui/material/Typography";


function SetPreBidMeetingDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = dayjs();

  const shouldDisableDate = (date) => {
    // Logic to disable specific dates if needed
    return false; // Return true to disable a date
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSetDate = async () => {
    try {
      const response = await SetPreBidMeetingDatePO(selectedDate);
      console.log(response);
      // Handle success response here
    } catch (error) {
      console.log(error);
      // Handle error here
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
          alignItems: "center", // Align content center
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.NotificationPageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.NotificationPageHeader}>
              Set Pre Bid Meeting Date
            </h1>
          </div>
        </div>
        <div className={styles.downSection}>
          <Paper
            className={styles.ProgressBarOuter}
            elevation={6}
            sx={{ py: 4, borderRadius: 5, mr: 8, px: 1, minWidth: "300px" }} // Set minimum width for the paper
          >
            <Typography variant="h6">Set Date</Typography><br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={styles.calender}
                selected={selectedDate}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                calendarClassName={styles.customDatePicker} // Add custom CSS class for date picker
              />
            </LocalizationProvider><br></br>
            <Button variant="contained" onClick={handleSetDate} sx={{ mt: 2 }}>
              Set
            </Button>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default SetPreBidMeetingDate;
