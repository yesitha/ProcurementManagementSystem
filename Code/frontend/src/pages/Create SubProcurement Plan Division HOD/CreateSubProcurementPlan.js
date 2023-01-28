import React from 'react'
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, FormControl, Box, NativeSelect, Card, CardContent, IconButton, Paper, Stack, TextField, Typography, Select, MenuItem, InputLabel, CssBaseline } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';


function CreateSubProcurementPlan() {

    const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
    const user = {
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com",
        designation: "Financial Division HOD",
        department: "Finance",
        phone: "1234567890",
        address: "123, ABC Street, XYZ City, 123456",
        gender: "Male",
        profilePic: "https://www.w3schools.com/howto/img_avatar.png",
    };



    return (

        <div style={{ display: "flex" }}>
            <CssBaseline />
            <SideNavBar list1={list1} list2={list2} user={user} />
            <Grid container>
                <Grid item xs={12}>

                    <Grid container fixed> 
                        <Grid item xs={1}>
                            <IconButton><ArrowBackIosIcon/></IconButton>
                        </Grid>
                        <Grid item xs ={11}>
                            <h1 className="titleHead">Sub Procurement Plan</h1>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                   
                    //Division:[Production Division]


                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            //subProcurementID
                        </Grid>
                        <Grid item xs={6}>
                            //Search
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    // table
                </Grid>

            </Grid>


        </div>
    )
}

export default CreateSubProcurementPlan