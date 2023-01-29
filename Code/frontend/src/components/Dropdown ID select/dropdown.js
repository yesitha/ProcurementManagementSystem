import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 300,backgroundColor:'white',borderRadius:1}} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>I0001</MenuItem>
        <MenuItem value={10}>I0002</MenuItem>
        <MenuItem value={10}>I0003</MenuItem>
        <MenuItem value={10}>I0004</MenuItem>
        <MenuItem value={10}>I0005</MenuItem>
        <MenuItem value={10}>I0006</MenuItem>
        <MenuItem value={10}>I0007</MenuItem>
        <MenuItem value={10}>I0008</MenuItem>
        <MenuItem value={10}>I0009</MenuItem>
        <MenuItem value={10}>I0010</MenuItem>
      </Select>
    </FormControl>
  );
}