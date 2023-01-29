import React from 'react'
import './Search.css'
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: alpha('#fffffff', 0.80),
    },
    marginLeft: 0,
    width: '450px',
    
  }));
  
  
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

function SearchFilter() {
  return (
    <Search className="search" sx={{borderRadius:6,flexDirection:"row",mr:"40px",height:{xs:"60px"}}}>
               <div className="searchArea">
                    
                    <div className="searchInput">
                        <StyledInputBase 
                          placeholder="Search…"
                          inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <div className="searchIcons" >
                    <IconButton  sx={{display:"flex",flexDirection:"row",borderRadius:50,backgroundColor:'#205295',height:{xs:45,md:50, lg:50},width:{xs:45,md:50, lg:50},mt:{lg:0.5,md:0.5,sm:1,xs:1},mr:1,px:2,'&:hover':{backgroundColor:'#205295#2c74b3'},mb:{xs:2,xl:4}}}  >
                        
                          <FilterListIcon sx={{color:'#ffffff'}}/>
                       
                    </IconButton>
                    <IconButton sx={{display:"flex",flexDirection:"row",borderRadius:50,backgroundColor:'#205295',height:{xs:45,md:50, lg:50},width:{xs:45,md:50, lg:50},mt:{lg:0.5,md:0.5,sm:1,xs:1},mr:1,px:2,'&:hover':{backgroundColor:'#2c74b'}}}>
                          <SearchIcon sx={{color:'#ffffff'}}/>
                        </IconButton>
                    </div>
               </div>
              </Search>
  )
}

export default SearchFilter
