import React, { useEffect, useState } from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./NotificationPage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { user, list1, list2, actions, actionButtons } from "../Usermanage";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../../fonts.css";
import { Box } from "@mui/system";
import SearchNoFilter from "../../components/SearchNoFilter/SearchNoFilter";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { getNotification, updateNotification } from "../../notification";

//

const empId = user ? user.id : "";

const extractMessagesAndPaths = (notifications, elements) => {
  const result = [];

  notifications.forEach((notification) => {
    const matchingElement = elements.find(
      (element) => element.displayName === notification.type
    );

    result.push({
      notificationId: notification.notificationId || "",
      message: notification.message || "",
      path: matchingElement ? matchingElement.path || "" : "",
    });
  });

  return result;
};

function NotificationPage() {
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

  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const compareByTimestamp = (a, b) => {
    return new Date(b.timeStamp) - new Date(a.timeStamp);
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const sortedNotifications = unreadNotifications.sort(compareByTimestamp);
  const displayNotifications = extractMessagesAndPaths(
    sortedNotifications,
    actionButtons
  );
  console.log(sortedNotifications);
  console.log(displayNotifications);

  const handleClick = (id, path) => {
    updateNotification(id);
    navigate(`/${path}`);
  };

  return (
    <div className={styles.NotificationPageContainer}>
      <div
        className={styles.upperSection}
        style={{ display: "flex", alignItems: "center" }}
      >
        <RouterLink to={-1} className={styles.backButton}>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
        </RouterLink>
        <h1 className={styles.NotificationPageHeader}>Notifications</h1>
      </div>

      {/* <div className={styles.searchSection} style={{ marginBottom: "50px" }}>
        <SearchNoFilter />
      </div> */}

      <div className={styles.notificationList}>
        <Paper className={styles.paper} elevation={6}>
          <List>
            {displayNotifications.map((notification, index) => (
              <ListItem
                key={index}
                divider={index < displayNotifications.length - 1}
                className={styles.listItem}
              >
                <ListItemText>
                  <Typography className={styles.ListItemText}>
                    {notification.message}
                  </Typography>
                </ListItemText>
                <Button
                  variant="contained"
                  className={styles.viewButton}
                  onClick={() =>
                    handleClick(notification.notificationId, notification.path)
                  }
                >
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default NotificationPage;
