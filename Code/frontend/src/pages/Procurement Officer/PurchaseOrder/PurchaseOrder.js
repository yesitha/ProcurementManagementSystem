import React, {useEffect, useState} from 'react'
import styles from "./PurchaseOrder.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Switch, TextField,
    Typography,
} from "@mui/material";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link as Routerlink} from 'react-router-dom';
import {
    getItemDetailsForPo,
    getMasterProcurementPlanContentFromDB,
    getMasterProcurementPlanFromDB,
    getSelectedVendorDetailsForEachMppId
} from "../../../services/ProcurementHOD/ProcurementHODServices";



const columns = [
    {id: "ItemID", label: "Item ID", Width: 200, align: "center"},
    {id: "ItemName", label: "Item Name", Width: 200, align: "center"},
    {id: "Quantity", label: "Quantity", Width: 200, align: "center"},
    {id: "Des", label: "Description", Width: 200, align: "center"},
    {id: "UnitPrice", label: "Unit Price", Width: 200, align: "center"},
    {id: "Amount", label: "Amount", Width: 200, align: "center"},
    {id: "Delete", label: "", Width: 200, align: "center"}
];

function PurchaseOrder() {
    const [selectedDate, setSelectedDate] = useState(null);
    const list1 = [1, 2, 3, 4, 5,];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [vendorId, setVendorId] = React.useState("");
    const [vendorAddress, setVendorAddress] = React.useState("");
    const [selectedMppId, setSelectedMppId] = useState("");
    const [selectedVendorName, setSelectedVendorName] = useState("");
    const [mppIdList, setMppIdList] = useState([]);
    const [vendorNameList, setVendorNameList] = useState([]);
    const [vendorDetailsList, setVendorDetailsList] = useState([]);
    const [itemDetailsList, setItemDetailsList] = useState([]);

    const rows = itemDetailsList;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const mppList = await getMasterProcurementPlanFromDB();
                const mppIdList = (mppList.map((item) => item.mppId));
                console.log(mppIdList);
                setMppIdList(mppIdList)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (selectedMppId) {
            const fetchData = async () => {
                try {
                    const vendorDetailsList = await getSelectedVendorDetailsForEachMppId(selectedMppId);
                    console.log(vendorDetailsList);
                    setVendorDetailsList(vendorDetailsList)
                    const vendorNameList = vendorDetailsList.map((item) => item.selectedVendorName);
                    console.log(vendorNameList);
                    setVendorNameList(vendorNameList)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [selectedMppId]);

    useEffect(() => {
        if (selectedVendorName) {
            const selectedVendor = vendorDetailsList.find((vendor) => vendor.selectedVendorName === selectedVendorName);
            console.log(selectedVendor);
            setVendorId(selectedVendor.vendorId)
            setVendorAddress(selectedVendor.address)

            if (vendorId) {
                const fetchData = async () => {
                    try {
                        const itemList = await getItemDetailsForPo(selectedMppId,vendorId);
                        console.log(itemList);
                        setItemDetailsList(itemList);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        }
    }, [selectedVendorName]);

    useEffect(() => {

    },[selectedVendorName]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleMppIdDropdown = (event) => {
        console.log(event.target.value);
        setSelectedMppId(event.target.value);
    }

    const handleVendorNameDropdown = (event) => {
        console.log(event.target.value);
        setSelectedVendorName(event.target.value);
    }

    return (
        <div>
            <div className={styles.NotificationPageContainer__header}>
                <Routerlink to={-1}>
                    <IconButton sx={{pl: "15px", height: "34px", width: "34px", mt: 3.7}}>
                        <ArrowBackIosIcon sx={{color: "#ffffff"}}/>
                    </IconButton>
                </Routerlink>
                <h1 className={styles.NotificationPageHeader}> Purchase Order</h1>
            </div>
            <div className={styles.divide}>
                <div className={styles.dropdown1}>
                    <label style={{color: "white", marginLeft: "10px"}}>Date</label>

                </div>

                <div className={styles.dropdown1} style={{marginTop: "60px"}}>
                    <label style={{color: "white", marginLeft: "10px"}}>
                        MASTER PROCUREMENT PLAN ID
                    </label>
                    <SelectDropDown
                        onChange={handleMppIdDropdown}
                        list={mppIdList}/>
                </div>

                <div>
                    <div className={styles.dropdown1}>
                        <label style={{color: "white", marginLeft: "10px"}}>
                            Vendor Name
                        </label>

                        <SelectDropDown
                            onChange={handleVendorNameDropdown}
                            list={vendorNameList}/>
                    </div>
                </div>
                <div className={styles.block}>
                    {vendorId && vendorAddress && (
                        <Typography>
                            Vendor ID: {vendorId}<br/>
                            Vendor Address: {vendorAddress}<br/>
                        </Typography>
                    )}
                </div>
            </div>
            <div className={styles.table}>
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
                        pt: 2,
                    }}
                >
                    <TableContainer sx={{maxHeight: "100%"}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className={styles.TableHeaders}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{maxWidth: column.Width}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === "number"
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Routerlink to={'/send-purchase-order'}>
                <Button
                    variant="contained"
                    fontFamily={"Inter"}
                    sx={{
                        bgcolor: "#205295",
                        borderRadius: 5,
                        height: 50,
                        width: 200,
                        marginLeft: "75px",
                        marginTop: "20px"
                    }}
                >
                    PRINT PREVIEW
                </Button>
            </Routerlink>
        </div>
    )
}

export default PurchaseOrder