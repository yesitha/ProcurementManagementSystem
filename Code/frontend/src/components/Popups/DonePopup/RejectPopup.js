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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              id="outlined-search"
              label="Enter Comment"
              type="search"
            />
            <Button
              onClick={handleClose}
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
