import { Typography } from "@mui/material";
import React from "react";
import styles from "./StatusBulb.module.css";

function setColur(status) {
  if (status === "Pending") {
    return "#D29D04";
  } else if (status === "Approved") {
    return "#227C70";
  } else if (status === "Rejected") {
    return "#9C254D";
  }
}

function StatusBulb({ status }) {
  return (
    <div
      style={{ backgroundColor: setColur(status) }}
      className={styles.StatusBulb}
    >
      <Typography sx={{ fontFamily: "inter", fontWeight: "600" }}>
        {status}
      </Typography>
    </div>
  );
}

export default StatusBulb;
