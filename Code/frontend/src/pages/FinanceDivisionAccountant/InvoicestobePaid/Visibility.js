import React from "react";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function () {
  return (
    <div>
      <IconButton
        sx={{bgcolor: '#205295', borderRadius: 5,color:"white","&:hover":{bgcolor:'#4573af'}}}
      >
        <VisibilityIcon />
      </IconButton>
    </div>
  );
}
