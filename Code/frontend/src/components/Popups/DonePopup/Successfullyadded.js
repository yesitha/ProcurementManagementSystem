import React from 'react'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentDownload from "../../../images/DocumentDownload.png";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

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

export default function Sucessfullyadded({ name, title, styles }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            align="center"
            fontFamily={"Inter"}
            sx={{ mt: -2 }}
          >
            DONE!
          </Typography>
          <Typography
            id="modal-modal-description"
            fontFamily={"Inter"}
            sx={{ mt: 1, color: "#A3A3A3" }}
            align="center"
          >
            Successfully informed {name}
          </Typography>
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
