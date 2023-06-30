import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import {
  Button,
  ListItemIcon,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@mui/material";

import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { borderRadius, display } from "@mui/system";
import { styled } from "@mui/material/styles";
import ReactLoading from "react-loading";
import { Link as Routerlink } from "react-router-dom";
import { user, list1, list2, actions, actionButtons } from "../Usermanage";
import { getNotification } from "../../notification";

function Dashboard() {
  const currentUser = user.userType;
  const empId = "EMP00005"; // need to get from session storage

  const date = dayjs();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newActions, setNewActions] = useState([]);

  // Create the new list

  // Display the new list

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getNotification(empId);

        console.log(response);
        setNotifications(response);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const compareByTimestamp = (a, b) => {
    return new Date(b.timeStamp) - new Date(a.timeStamp);
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const sortedNotifications = unreadNotifications.sort(compareByTimestamp);

  const createNotificationList = (notifications, actionButtons) => {
    const notificationList = [];

    notifications.forEach((notification) => {
      const { type } = notification;
      const matchingButton = actionButtons.find(
        (button) => button.displayName == type
      );

      if (matchingButton) {
        const existingNotification = notificationList.find(
          (item) => item.type == type
        );

        if (existingNotification) {
          existingNotification.count++;
        } else {
          const { displayName, path } = matchingButton;
          notificationList.push({
            type,
            displayName,
            path,
            count: 1,
          });
        }
      }
    });

    return notificationList;
  };

  useEffect(() => {

    const list = createNotificationList(sortedNotifications, actionButtons);
        console.log(actionButtons);
        console.log(list);
        setNewActions(list);
  }, [notifications]);

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
    <div style={{ display: "flex", overflow: "hidden" }}>
      <div className={styles.DashboardContainer}>
        <div className={styles.upperSection}>
          <div className={styles.upperLeftContainer}>
            <div className={styles.DashboardContainer__header}>
              <h1 className={styles.DashboardHeader}>Dashboard</h1>
            </div>
            <Paper
              elevation={6}
              sx={{
                pl: 5,
                pr: { lg: 15, md: 5 },
                ml: { lg: 2.5, md: 1 },
                borderRadius: 10,
              }}
            >
              <div
                className={styles.welcomeContainer}
                sx={{ pr: { xs: "40px" } }}
              >
                <h1 className={styles.welcomeHeader}>
                  Welcome, {user.firstname}!
                  <span className={styles.welcomeDesignation}>
                    {" "}
                    [{user.designation}]
                  </span>
                </h1>
                {loading && <ReactLoading type="bubbles" color="black" />}
                {error && (
                  <h4 className={styles.welcomeText}>
                    {" "}
                    {`There is a problem fetching the quote - ${error}`}
                  </h4>
                )}

                {quote && (
                  <h4 className={styles.welcomeText}>{quote.content}</h4>
                )}
                {quote && (
                  <h5 className={styles.confuciusName}>-{quote.author}-</h5>
                )}

                <Routerlink to={"/view-notification"}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 10,
                      width: 150,
                      mb: 2,
                      backgroundColor: "#205295",
                      color: "#ffffff",
                    }}
                  >
                    View New <br /> Notifications
                  </Button>
                </Routerlink>
              </div>
            </Paper>
          </div>
          <div className={styles.upperRightContainer}>
            <Paper
              elevation={6}
              sx={{
                mt: { lg: 3.5, md: 10.5, xs: 0 },
                ml: 8,
                mr: { md: 3 },
                width: "384px",
                alignItems: "center",
                height: "315px",
                display: { xs: "none", lg: "block", md: "block" },
                borderRadius: 10,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker className={styles.calender} date={date} />
              </LocalizationProvider>
            </Paper>
          </div>
        </div>

        <div className={styles.middleSection}>
          {actions.map((x) => (
            <Routerlink to={`/${x.path}`}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 3,
                  maxWidth: 150,
                  p: 1.5,
                  backgroundColor: "#205295",
                  color: "#ffffff",
                  px: 10,
                  mx: 4,
                  mt: 2,
                  mb: 0.5,
                }}
              >
                {x.displayName}
              </Button>
            </Routerlink>
          ))}
        </div>
        <div className={styles.lowerSection}>
          <div className={styles.lowerSectionHeader}>
            <h1 className={styles.lowerSectionHeaderText}>Notifications</h1>
            <div className={styles.lowerActionButtons}>
              {newActions.map((y) => (
                <Routerlink to={`/${y.path}`}>
                  <Button
                    className={styles.actionButton}
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      maxWidth: 150,
                      height: 130,
                      px: 1.5,
                      backgroundColor: "#9C254D",
                      color: "#ffffff",
                      px: 10,
                      mx: 4,
                      "&:hover": { backgroundColor: "#b43b63" },
                    }}
                  >
                    <div className={styles.actionButtonText}>
                      <Typography
                        className={styles.actionButtonNumber}
                        sx={{
                          fontFamily: "Inter",
                          fontSize: "34px",
                          fontWeight: "400",
                        }}
                      >
                        {y.number != 1 ? y.count : ""}
                      </Typography>
                      <Typography
                        className={styles.actionButtonText}
                        sx={{ fontFamily: "Inter", fontSize: "14px" }}
                      >
                        {y.displayName}
                      </Typography>
                    </div>
                  </Button>
                </Routerlink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
