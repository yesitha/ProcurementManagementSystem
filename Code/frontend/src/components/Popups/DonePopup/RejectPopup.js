import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentDownload from "../../../images/DocumentDownload.png";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import styles from "./RejectPopup.module.css";
import { Container } from "@mui/system";
import axios from "axios";
import { addNotification } from "../../../notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  align: "center",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 3,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [rejectComment, setRejectComment] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
    window.location.reload();}
  const handleCommentChange = (event) => setRejectComment(event.target.value);
  const [commentAddedlink, setCommentAddedLink] = React.useState(props.link.toString());
  const manipulatedString = commentAddedlink.replace('$rejectedComment', rejectComment);
  
  const handleOkClick = async () => {
    setCommentAddedLink(manipulatedString);
    if(props.notificationData){
    addNotification(props.notificationData);
    }
    try {
      const response = await axios.put(manipulatedString);
      console.log(manipulatedString);
      console.log(response);
      sessionStorage.removeItem('rejectComment');
    } catch (error) {
      console.log(error);
      throw error;
    }
  window.location.reload();
   handleClose();
  };
  
  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{ width: "40px", height: "40px", px: 0.5 }}
        className={styles.rejectButton}
      >
        <CloseIcon />
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
              <CloseIcon
                sx={{
                  color: "#000",
                  fontSize: 25,
                  hover: { bgcolor: "#b23e65" },
                }}
              />
            </IconButton>
          </div>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "150px", height: 50 }}
              id="rejectcomment"
              label="Enter Comment"
              type="search"
              value={rejectComment}
              onChange={handleCommentChange}
            />
            <Button
              onClick={handleOkClick}
              variant="contained"
              fontFamily={"Inter"}
              sx={{
                bgcolor: "#a62c55",
                borderRadius: 5,
                height: 40,
                width: 100,
                mt: 3,
                "&:hover": { bgcolor: "#b23e65" },
              }}
            >
              OK
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
