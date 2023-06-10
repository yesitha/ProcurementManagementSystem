import React from 'react'
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";


function FormInputText({name,control,label}) {
  return (
    <div>
         <Controller
        name={this.name}
        control={this.control}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={this.label} />
        )}
      />
    </div>
  )
}

export default FormInputText