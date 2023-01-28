import { IconButton } from '@mui/material'
import React from 'react'
import './Search.css'
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: alpha('#fffffff', 0.80),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '600px',
    height: '70px',
  },
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function SearchNoFilter() {
  return (
    <Search className="search" sx={{borderRadius:6,flexDirection:"row",}}>
               <div className="searchArea">
                    
                    <div className="searchInput">
                        <StyledInputBase 
                        color='black'
                          placeholder="Search…"
                          inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <div className="searchIcons">
                    
                    <IconButton sx={{display:"flex",flexDirection:"row",borderRadius:50,backgroundColor:'#205295',height:{xs:25,md:30, lg:50},width:{xs:25,md:30, lg:50},mt:1,mr:1,px:2,'&:hover':{backgroundColor:'#2c74b3'}}}>
                          <SearchIcon sx={{color:'#ffffff'}}/>
                        </IconButton>
                    </div>
               </div>
              </Search>
  )
}

export default SearchNoFilter
