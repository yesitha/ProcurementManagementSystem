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
import styles from "./EvidenceOfAuthorization.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ListItemIcon, makeStyles, Paper, withStyles } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useEffect } from "react";
import { fetchPdf } from "../../../services/TecCommitte/TecCommitteeservices";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  align: "center",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function EvidenceOfAuthorization(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [sppId, setSppId] = React.useState(props.sppId);
  const [itemId, setItemId] = React.useState(props.itemId);

  console.log(props);
  

  const handleOpen = async () => {
    try {
      const response = await fetchPdf(props.sppId, props.itemId);
      const data = response;
      setData(data);
    } catch (error) {
      console.log(error);
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Update sppId and itemId if the props change
  React.useEffect(() => {
    if (props.sppId !== null && props.itemId !== null && props.sppId !== undefined && props.itemId !== undefined) {
      setSppId(props.sppId.toString());
      setItemId(props.itemId.toString());
    }
  }, [props.sppId, props.itemId]);
  
  const handleDownload = () => {
    
    const link = document.createElement('a');
    link.href = data.url;
    link.download = `${data.name}.pdf`;
    link.click();
  };


  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{ width: "40px", height: "40px" }}
        className={styles.viewEvidenceButton}
      >
        <VisibilityIcon />
      </IconButton>

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
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            align="center"
            fontFamily={"Inter"}
            sx={{ mt: 0 }}
          >
            Evidence of Authorization
          </Typography>
          <Typography
            id="modal-modal-description"
            fontFamily={"Inter"}
            sx={{ mt: 1, color: "#A3A3A3" }}
            align="center"
          >
            Click to download Following Document
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                
              }}
              onClick={handleDownload}
            >
              <ListItemIcon sx={{ color: "#205295" }}>
                <InsertDriveFileIcon style={{ fontSize: 80 }} />
              </ListItemIcon>
              <Typography variant="subtitle2">{data.name}.pdf</Typography>
            </div>
           
           
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
              onClick={handleClose}
              variant="contained"
              fontFamily={"Inter"}
              sx={{
                bgcolor: "#205295",
                borderRadius: 5,
                height: 40,
                width: 100,
                my: 2,
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
