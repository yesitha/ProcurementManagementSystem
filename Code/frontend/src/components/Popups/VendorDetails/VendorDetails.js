import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DocumentDownload from '../../../images/DocumentDownload.png';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    align: 'center',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
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
      <IconButton onClick={handleOpen}><VisibilityIcon sx={{color:'#205295', fontSize:35}}/></IconButton>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div style={{position:'absolute',right:'10%'}}>
            <IconButton onClick={handleClose}><CloseIcon sx={{color:'#000', fontSize:25}}/></IconButton>
            </div>
          <Typography id="modal-modal-title" variant="h4" component="h2" align='center' sx={{mt:2}}>
            Vendor <br/>Verification
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: '#A3A3A3' }} align='center'>
            Click here to Download Following Documents
          </Typography>
          <div style={{display : 'flex' ,alignItems: 'center', justifyContent: 'center', textAlign:'center', marginTop:10}}>
            <div>
            <IconButton><img src={DocumentDownload}/></IconButton>
            <label>Bussiness Registration</label>
            </div>
            <div>
            <IconButton><img src={DocumentDownload}/></IconButton>
            <label>Tax Identification</label>
            </div>
            <div>
            <IconButton><img src={DocumentDownload}/></IconButton>
            <label>Insurance Certification</label>
            </div>
            <div>
            <IconButton><img src={DocumentDownload}/></IconButton>
            <label>Other Documents</label>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}