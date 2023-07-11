import React from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import styles from "./CreateSubProcurementPlan.module.css";
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
import SearchFilter from "../../components/Search/Search";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import {Link as Routerlink, useParams} from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import axios from "axios";
import {useState, useEffect} from "react";
import {getDivision} from "../../services/DivisionHOD/deivisionHODServices";
import {getSubProcurmentPlanPerDivision} from "../../services/DivisionHOD/deivisionHODServices";
import {fetchDataForSubId} from "../../services/DivisionHOD/deivisionHODServices";
import {deleteItemFromdb} from "../../services/DivisionHOD/deivisionHODServices";
import {createNewSubProcurementPlan} from "../../services/DivisionHOD/deivisionHODServices";
import {user} from "../Usermanage";

const hodId = user ? user.id : '';

function CreateSubProcurementPlan() {
    const {selectedSubIdfomNextPage} = useParams();
    const columns = [
        {id: "ItemID", label: "Item ID", Width: 300, align: "center"},
        {id: "ItemName", label: "Item Name", Width: 300, align: "center"},
        {id: "Qty", label: "Quantity", Width: 300, align: "center"},
        {id: "Specification", label: "Specification", Width: 300, align: "center",},
        {id: "RV", label: "Recommended Vendors", Width: 300, align: "center"},
        {id: "EDD", label: "Expected Delivery Date", Width: 300, align: "center"},
        {id: "Del", Width: 300, align: "center"},
    ];

    const [page, setPage] = React.useState(0);
    const [notificationData, setNotificationData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [division, setDivision] = useState([]);
    const [subIds, setSubIds] = useState([]);
    const [selectedSubId, setSelectedSubId] = useState('');
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const deleteItem = (itemId, sppId) => {
        try {
            deleteItemFromdb(itemId, sppId);
            console.log("Item deleted");
            const updatedData = data.filter(item => item.itemId !== itemId);
            setData(updatedData);
        } catch (error) {
            console.log(error);
        }
    };

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

    const CreateNewSubProcurementPlan = (event) => {
        const fetchData = async () => {
            try {
                const data = await createNewSubProcurementPlan(hodId);
                setSubIds(prevArray => [...prevArray, data]);
                setSelectedSubId(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };

    const handleSubIdChange = (event) => {
        setSelectedSubId(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const divisionResponse = await getDivision(hodId);
                setDivision(divisionResponse);
            } catch (error) {
                console.log(error);
            }

            try {
                const subIdsResponse = await getSubProcurmentPlanPerDivision(hodId);
                setSubIds(subIdsResponse);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        if (selectedSubIdfomNextPage) {
            setSelectedSubId(selectedSubIdfomNextPage);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataForSubId(selectedSubId);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedSubId]);

    const dataNotification = [
        {
            message: 'New Sub Procurement Plan Created !',
            type: 'New Sub Procurement Plans',
            divisionName: 'Purchasing Division',
        },
    ];


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
                            <IconButton sx={{pl: "15px", height: "34px", width: "34px", mt: 3.7}}>
                                <ArrowBackIosIcon sx={{color: "#ffffff"}}/>
                            </IconButton>
                        </Routerlink>
                        <h1 className={styles.Header}>Sub Procurement Plan</h1>
                    </div>
                </div>
                <div className={styles.OuterMiddle}>
                    <div className={styles.Ph2}>
                        <h4>Division: {division}</h4>
                    </div>

                    <div className={styles.MiddleSectionN}>
                        <div className={styles.Ph3}>
                            <h4 className={styles.h4m}>SUB PROCUREMENT ID</h4>
                            <div className={styles.dropDownIconContainer}>
                                <AddCircleOutlineIcon className={styles.addButton}
                                                      onClick={CreateNewSubProcurementPlan}/>
                                <SelectDropDown list={subIds} value={selectedSubId} onChange={handleSubIdChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.downSection}>
                    <Paper
                        className={styles.baseTableContainer}
                        elevation={6}
                        sx={{
                            mr: {
                                xs: "60px",
                                sm: "65px",
                                md: "65px",
                                lg: "68px",
                                xl: "70px",
                            },
                            alignItems: "center",
                            borderRadius: "31px",
                        }}
                    >
                        <TableContainer>
                            <Table>
                                <TableHead className={styles.TableHeaders}>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{maxWidth: column.Width, fontWeight: "bold"}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index} style={{
                                                backgroundColor:
                                                    index % 2 === 0 ? "#FFFFFF" : "#F2F2F2",
                                            }}>
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
                                                <TableCell align="center"><IconButton aria-label="delete" sx={{color: "#205295"}}>
                                                    <DeleteIcon onClick={() => deleteItem(row.itemId, selectedSubId)}/>
                                                </IconButton></TableCell>
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


                    <div
                        classname="footerButton"
                        style={{display: "flex", alignContent: "flex-end", marginTop: 15}}
                    >

                        <Routerlink to={`/add-item-to-subprocurement-Plan/${division}/${selectedSubId}`}>
                            <Button variant="contained">Add Item</Button>
                        </Routerlink>

                        <DonePopup
                            text={"Successfully Submitted"}
                            title={"Submit"}
                            notificationData={dataNotification[0]}
                            styles={{
                                mb: "10px",
                                ml: "10px",
                            }}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}


export default CreateSubProcurementPlan;
