import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropDown({ list, value, onChange, defaultValue }) {
  return (
    <div>
      <FormControl
        sx={{
          my: 0.5,
          ml: 1,
          mr: 10,
          minWidth: { xs: 200, sm: 280, md: 300 },
          maxWidth: 300,
        }}
      >
        <Select
          label="Age"
          value={value}
          onChange={onChange}
          
          displayEmpty
          sx={{ bgcolor: "#fff", borderRadius: 2, maxHeight: 35 }}
        >
          {list.map((course, index) => (
            <MenuItem key={index} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
