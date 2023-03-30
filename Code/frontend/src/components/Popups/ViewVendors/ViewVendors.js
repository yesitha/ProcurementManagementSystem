import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentDownload from "../../../images/DocumentDownload.png";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ViewVendors.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  align: "center",
  transform: "translate(-50%, -50%)",
  width: { xs: 200, sm: 250, md: 400 },
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 3,
};

export default function ViewVendors({ vendors }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        className={styles.ViewButton}
      >
        View
      </Button>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ position: "absolute", right: "10%" }}>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#000", fontSize: 25 }} />
            </IconButton>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            <div>
              {vendors.map((vendor, index) => (
                <ListItem>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar`} src={vendor.profilePic} />
                    </ListItemAvatar>
                    <ListItemText primary={vendor.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
