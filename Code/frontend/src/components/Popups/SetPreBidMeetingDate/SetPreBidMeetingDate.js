import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentDownload from "../../../images/DocumentDownload.png";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ListItemIcon, makeStyles, Paper, withStyles } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  align: "center",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 1,
};

export default function BasicModal({ title, styles }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = React.useState(dayjs());

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={styles}>
        {title}
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#000", fontSize: 25 }} />
            </IconButton>
          </div>
          <div>
            <Paper
              elevation={6}
              sx={{
                mr: 2,
                ml: 2,
                width: "384px",
                alignItems: "center",
                height: "315px",
                borderRadius: 10,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker
                  date={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </LocalizationProvider>
            </Paper>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Button
              variant="contained"
              fontFamily={"Inter"}
              sx={{
                bgcolor: "#205295",
                borderRadius: 5,
                height: 60,
                width: 100,
              }}
            >
              OK
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
