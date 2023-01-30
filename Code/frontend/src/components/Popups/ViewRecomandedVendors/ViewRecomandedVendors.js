import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, IconButton} from "@mui/material";
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



export default function ViewRecomandedVendors({vendors}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className="ViewButton">View</Button>
      
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
            Recomanded <br/>Vendors
          </Typography>
          
          <div style={{display : 'flex' ,alignItems: 'center', justifyContent: 'center', textAlign:'center', marginTop:10}}>
            
            <div>
            {vendors.map((vendor) => (


         <ListItem
            key={value}
             >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value}`} />
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