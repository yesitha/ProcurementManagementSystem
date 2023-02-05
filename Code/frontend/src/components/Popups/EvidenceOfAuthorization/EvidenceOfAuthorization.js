import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DocumentDownload from '../../../images/DocumentDownload.png';
import CloseIcon from '@mui/icons-material/Close';
import { Button} from "@mui/material";
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './EvidenceOfAuthorization.module.css';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ListItemIcon,  makeStyles,  Paper, withStyles, } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    align: 'center',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export default function EvidenceOfAthorization() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    
    

  return (
    <div>
    <IconButton onClick={handleOpen} sx={{width:'40px',height:'40px'}} className={styles.viewEvidenceButton}><VisibilityIcon/></IconButton>
      
    <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div style={{display:'flex', alignItems:'right', justifyContent:'right'}}>
            <IconButton onClick={handleClose}><CloseIcon sx={{color:'#000', fontSize:25}}/></IconButton>
            </div>
          <Typography id="modal-modal-title" variant="h4" component="h2" align='center' fontFamily={'Inter'} sx={{mt:0}}>
            Evidence of Authorization
          </Typography>
          <Typography id="modal-modal-description" fontFamily={'Inter'} sx={{ mt: 1, color: '#A3A3A3' }} align='center'>
            Click to download Following Documents
          </Typography>
          <div style={{display:'flex',flexDirection:'row' ,alignItems:'center', justifyContent:'center', marginTop:10}}>
            <div style={{display:'flex',flexDirection:'column' ,alignItems:'center', justifyContent:'center', marginTop:10,marginRight:20}}>
            <ListItemIcon sx={{color:'#205295'}}><InsertDriveFileIcon style={{ fontSize: 80 }}/></ListItemIcon>
            <Typography variant='subtitle2'>Evidence 1</Typography>
            </div>
            <div style={{display:'flex',flexDirection:'column' ,alignItems:'center', justifyContent:'center', marginTop:10,marginLeft:20}}>
            <ListItemIcon sx={{color:'#205295'}}><InsertDriveFileIcon style={{ fontSize: 80 }}/></ListItemIcon>
            <Typography variant='subtitle2'>Evidence 2</Typography>
            </div>
            <div style={{display:'flex',flexDirection:'column' ,alignItems:'center', justifyContent:'center', marginTop:10}}></div>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:10}}>
          <Button variant='contained' fontFamily={'Inter'} sx={{bgcolor: '#205295', borderRadius: 5, height: 40, width: 100,my:2}}>OK</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}