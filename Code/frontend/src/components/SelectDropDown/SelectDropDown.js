import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectDropDown({list}) {
  const [SelectorValue, setSelectorValue] = React.useState('');

  const handleChange = (event) => {
    setSelectorValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300,maxWidth: 300}}>
        <Select
          value={SelectorValue}
          onChange={handleChange}
          displayEmpty
          sx={{bgcolor: '#fff', borderRadius: 2, maxHeight: 35}}
        >
          {/* <MenuItem value="">
            <em>default</em>
          </MenuItem> */}
          {list.map((course, index) => {
            return (
                <MenuItem value={index}>{course}</MenuItem>
            )
        })}
        </Select>
      </FormControl>
    </div>
  );
}