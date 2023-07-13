import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentDownload from "../../../images/DocumentDownload.png";
import CloseIcon from "@mui/icons-material/Close";
import { getVendorVerifyPdfs } from "../../../services/Vendor/Vendorservices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  align: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 3,
};

export default function BasicModal({ vendorId,vendorName}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [data, setData] = React.useState([]);

  React.useEffect(() => { 
    
    const fetchData = async () => {
      try {
        const response = await getVendorVerifyPdfs(vendorId);
        setData(response);
        console.log(response);
        console.log(vendorId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  

  }, []);

  const downloadFile = (url,name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url;
    link.target = {name};
    link.click();
  };

  return (
    <div>
      {/* <IconButton onClick={handleOpen}>
        <VisibilityIcon sx={{ color: "#205295", fontSize: 35 }} />
      </IconButton> */}
      <IconButton
        onClick={handleOpen}
        disabled={!vendorId || !vendorName}
      >
        <VisibilityIcon 
          sx={{
            color: !vendorId || !vendorName ? "#888888" : "#205295",
            fontSize: 35,
            pointerEvents: !vendorId || !vendorName ? "none" : "auto",
          }}
        />
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
            sx={{ mt: -2 }}
          >
            Vendor <br />
            Verification
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "#A3A3A3" }}
            fontFamily={"Inter"}
            align="center"
          >
            Click here to Download Following Documents of <b>{vendorName}</b>
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 10,
              fontFamily: "Inter",
            }}
          >
            <div>
            <IconButton onClick={() => downloadFile(data[0].url,data[0].name)}>
    <img src={DocumentDownload} />
  </IconButton>
  <label>Business Registration</label>
</div>
<div>
  <IconButton onClick={() => downloadFile(data[2].url,data[2].name)}>
    <img src={DocumentDownload} />
  </IconButton>
  <label>Tax Identification</label>
</div>
<div>
  <IconButton onClick={() => downloadFile(data[1].url,data[1].name)}>
    <img src={DocumentDownload} />
  </IconButton>
  <label>Insurance Certificate</label>
</div>
<div>
  <IconButton onClick={() => downloadFile(data[3].url,data[3].name)}>
    <img src={DocumentDownload} />
  </IconButton>
  <label>Other Documents</label>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
