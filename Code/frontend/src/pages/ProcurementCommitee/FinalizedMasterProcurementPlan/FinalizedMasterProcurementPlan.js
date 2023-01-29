import React from 'react';
import './FinalizedMasterProcurementPlan.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SearchNoFilter from '../../../components/Search/Search';

// In class names, fmmp=FinalizedMasterProcurementPlan

function FinalizedMasterProcurementPlan() {
  return (
    <div>
        <div className='fmpp-heading'>
            <IconButton sx={{pl:'15px',height:'34px',width:'34px'}}><ArrowBackIosIcon sx={{color:'#ffffff'}}/></IconButton>
            Finalized Master Procurement Plan
        </div>
        <div className='fmpp-title'>
            MASTER PROCUREMENT PLAN ID*
            <Select className='selector'
                placeholder="Select a Master Procurement plan ID…"
                indicator={<KeyboardArrowDown />}
                sx={{
                    width: 310,
                    [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                    },
                    },
                }}
                >
                <Option className='option' value="MPPI1000">MPPI1000</Option>
                <Option className='option' value="MPPI1001">MPPI1001</Option>
                <Option className='option' value="MPPI1002">MPPI1002</Option>
                <Option className='option' value="MPPI1003">MPPI1003</Option>
            </Select>
            {/* <SearchNoFilter/> */}
        </div>
    </div>
  )
}

export default FinalizedMasterProcurementPlan