import React from "react";
import styles from "./PDViewSubProcurementPlan.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Container,
    Button,
    FormControl,
    Box,
    NativeSelect,
    Card,
    CardContent,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    CssBaseline, Tooltip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchFilter from "../../../components/Search/Search";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import {Link as Routerlink, useParams} from "react-router-dom";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import axios from "axios";
import {useState, useEffect} from "react";
import {fetchSubProcurementPlanDetails} from '../../../services/PurchasingDivisionHOD/PurchasingDivisionHOD.js';


function PDViewSubProcurementPlan() {
    const {selectedSubId, divisionName} = useParams();
    const columns = [
        {id: "ItemID", label: "Item ID", Width: 300, align: "center"},
        {id: "ItemName", label: "Item Name", Width: 300, align: "center"},
        {id: "Qty", label: "Quantity", Width: 300, align: "center"},
        {id: "Specification", label: "Specification", Width: 300, align: "center",},
        {id: "RV", label: "Recommended Vendors", Width: 300, align: "center"},
        {id: "EDD", label: "Expected Delivery Date", Width: 300, align: "center"},
        {id: "Del", Width: 300, align: "center"},
    ];
    function DisplayDate({date}) {
        const formattedDate = date?.substring(0, 10); // Extract only the date portion
        return (
            <Stack component="form" noValidate spacing={3} alignItems="center">
                <TextField
                    id="date"
                    label="Expected Delivery Date"
                    type="date"
                    align="center"
                    value={formattedDate}
                    sx={{width: 200, height: 50}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Stack>
        );
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const division = divisionName;
    const [subIds, setSubIds] = useState([]);
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        const fetchDataForSubId = async () => {
            try {
                const response = await fetchSubProcurementPlanDetails(selectedSubId)
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataForSubId();
    }, []);


    return (
        <div style={{overflowX: "hidden"}}>
            <Container
                className={styles.main}
                sx={{
                    ml: {xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px"},
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className={styles.upperSection}>
                    <div className={styles.ManageAuctionPageContainer__header}>

                        <Routerlink to={-1}>
                            <IconButton
                                sx={{pl: "15px", height: "34px", width: "34px", mt: 3.7}}
                            >
                                <ArrowBackIosIcon sx={{color: "#ffffff"}}/>
                            </IconButton>
                        </Routerlink>
                        <h1 className={styles.Header}>Sub Procurement Plan</h1>
                    </div>
                </div>
                <div className={styles.OuterMiddle}>
                    <div className={styles.Ph2}>
                        <h4>Division: {division}</h4>
                        <h4>Sub Procurement Plan ID: {selectedSubId}</h4>
                    </div>

                    <div className={styles.MiddleSectionN}>
                    </div>
                </div>

                <div className={styles.downSection}>
                    <Paper
                        className={styles.baseTableContainer}
                        elevation={6}
                        sx={{
                            mr: {xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px",},
                            alignItems: "center",
                            borderRadius: "31px",
                        }}>
                        <TableContainer>
                            <Table>
                                <TableHead className={styles.TableHeaders}>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{maxWidth: column.Width, fontWeight: "bold"}}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data &&
                                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}
                                                          style={{backgroundColor:index % 2 === 0 ? "#FFFFFF" : "#F2F2F2",}}>
                                                              <TableCell align="center">{row.itemId}</TableCell>
                                                              <TableCell align="center">{row.itemName}</TableCell>
                                        <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={row.specification}>
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                maxWidth: "150px",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                            }}>
                                                            {row.specification}
                                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">{row.recommendedVendor}</TableCell>
                                <TableCell align="center">
                                    <DisplayDate date={row.expectedDeliveryDate}/>
                                </TableCell>
                            </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>


        </div>
</Container>
</div>
)
    ;
}


export default PDViewSubProcurementPlan;
