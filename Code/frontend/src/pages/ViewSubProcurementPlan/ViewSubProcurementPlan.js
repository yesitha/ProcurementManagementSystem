import React from 'react'
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchNoFilter from "../../components/Search/Search";
import { Container } from "@mui/system";
import Styles from "./ViewSubProcurementPlan.module.css";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import ViewRecomandedVendors from "../../components/Popups/ViewRecomandedVendors/ViewRecomandedVendors";
import { vendors } from "../../users/vendors.js"


function ViewSubProcurementPlan() {
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
        <div>
            <SideNavBar list1={list1} list2={list2} user={user} />

            <Container

                sx={{
                    ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className={Styles.upperSection}>
                    <div className={Styles.ManageAuctionPageContainer__header}>
                        <IconButton
                            sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
                        >
                            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
                        </IconButton>

                        <h1 className={Styles.Header}>Sub Procurement Plan</h1>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default ViewSubProcurementPlan