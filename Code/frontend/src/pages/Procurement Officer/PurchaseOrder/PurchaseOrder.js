import React, { useEffect, useState } from "react";
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
  Switch,
  TextField,
  Typography,
  Tooltip,
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
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link as Routerlink } from "react-router-dom";
import {
    fetchPreviewFromDB,
  getItemDetailsForPo,
  getMasterProcurementPlanContentFromDB,
  getMasterProcurementPlanFromDB,
  getSelectedVendorDetailsForEachMppId,
} from "../../../services/ProcurementHOD/ProcurementHODServices";
import { MoneyFormat } from "../../../services/dataFormats";
import { useNavigate } from "react-router-dom";


const columns = [
  { id: "ItemID", label: "Item ID", Width: 200, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
  { id: "Quantity", label: "Quantity", Width: 200, align: "center" },
  { id: "Des", label: "Description", Width: 200, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 200, align: "center" },
  { id: "Amount", label: "Amount", Width: 200, align: "center" },
  { id: "Delete", label: "", Width: 200, align: "center" },
];

function PurchaseOrder() {
  const [selectedDate, setSelectedDate] = useState(null);
  const list1 = [1, 2, 3, 4, 5];
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
  const [CreatepoId, setCreatepoId] = useState(null);
  // const [poId, setpoId] = useState(null);

  const rows = itemDetailsList;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mppList = await getMasterProcurementPlanFromDB();
        const mppIdList = mppList.map((item) => item.mppId);
        console.log(mppIdList);
        setMppIdList(mppIdList);
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
          const vendorDetailsList = await getSelectedVendorDetailsForEachMppId(
            selectedMppId
          );
          console.log(vendorDetailsList);
          setVendorDetailsList(vendorDetailsList);
          const vendorNameList = vendorDetailsList.map(
            (item) => item.selectedVendorName
          );
          console.log(vendorNameList);
          setVendorNameList(vendorNameList);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [selectedMppId]);

  useEffect(() => {
    if (selectedVendorName) {
      const selectedVendor = vendorDetailsList.find(
        (vendor) => vendor.selectedVendorName === selectedVendorName
      );
      console.log(selectedVendor);
      setVendorId(selectedVendor.vendorId);
      console.log(vendorId);
      setVendorAddress(selectedVendor.address);

      if (vendorId) {
        const fetchData = async () => {
          try {
            const itemList = await getItemDetailsForPo(selectedMppId, vendorId);
            console.log(itemList);
            setItemDetailsList(itemList);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    }
  }, [selectedVendorName,vendorId]);

  useEffect(() => {}, [selectedVendorName]);

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
  };

  const handleVendorNameDropdown = (event) => {
    console.log(event.target.value);
    setSelectedVendorName(event.target.value);
  };

  const handleCreatePO = () => {
    setCreatepoId(10);
    // navigate(`/send-purchase-order/${poId}`);
  };
  useEffect(() => {
    console.log(CreatepoId);
    if (CreatepoId) {
      const fetchData = async () => {
        try {
          const response = await fetchPreviewFromDB(selectedMppId, vendorId);
          // setpoId(response.data);
          navigate(`/send-purchase-order/${response.data}`);
        } catch (error) {
          // Handle any error that occurred during the API request
          console.error(error);
        }
      };
  
      fetchData();
    }
  }, [CreatepoId]);
   
  return (
    <div>
      <div className={styles.NotificationPageContainer__header}>
        <Routerlink to={-1}>
          <IconButton
            sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
          >
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Routerlink>
        <h1 className={styles.NotificationPageHeader}> Purchase Order</h1>
      </div>
      <div className={styles.divide}>

        <div className={styles.dropdown1} style={{ marginTop: "30px" }}>
          <label style={{ color: "white", marginLeft: "10px", fontFamily: "Mulish", fontSize: "16px" }}>
            MASTER PROCUREMENT PLAN ID*
          </label>
          <SelectDropDown onChange={handleMppIdDropdown} list={mppIdList} />
        </div>

        <div>
          <div className={styles.dropdown1}>
            <label style={{ color: "white", marginLeft: "10px",fontFamily: "Mulish", fontSize: "16px" }}>
              VENDOR NAME*
            </label>

            <SelectDropDown
              onChange={handleVendorNameDropdown}
              list={vendorNameList}
            />
          </div>
        </div>
          {vendorId && vendorAddress && (
            <div className={styles.block}>
              <Typography>
                Vendor ID: {vendorId}
                <br />
                Vendor Address: {vendorAddress}
                <br />
              </Typography>
            </div>
          )}
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
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={styles.TableHeaders}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.Width, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                  {itemDetailsList &&
                    itemDetailsList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#FFFFFF" : "#F2F2F2",
                          }}
                        >
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">{row.totalQuantity}</TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.specifications}>
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.specifications}
                              </span>
                            </Tooltip>
                          </TableCell>
                            <TableCell align="center">{MoneyFormat(row.bidValue)}</TableCell>
                            <TableCell align="center">{MoneyFormat(row.bidValue*row.totalQuantity)}</TableCell>
                          
                         
                        </TableRow>
                      ))}
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
      {/* <div onClick={handleCreatePO}> */}
        {/* <Routerlink to={`/send-purchase-order/${poId}`} > */}
          <Button
            variant="contained"
            fontFamily={"Inter"}
            sx={{
              bgcolor: "#205295",
              borderRadius: 5,
              height: 50,
              width: 200,
              marginLeft: "75px",
              marginTop: "20px",
            }}
            onClick={handleCreatePO}
          >
            PRINT PREVIEW
          </Button>
        {/* </Routerlink> */}
      {/* </div> */}
    </div>
  );
}

export default PurchaseOrder;
