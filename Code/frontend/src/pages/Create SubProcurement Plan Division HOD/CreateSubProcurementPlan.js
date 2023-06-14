
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
  CssBaseline,
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
import { Link as Routerlink } from "react-router-dom";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import axios from "axios";
import { useState, useEffect } from "react";

const hodId='HIP05185';//get from login user(HOD)
function CreateSubProcurementPlan() {

  ///////////////Add axios/////////////
  async function getDivision(hodId) {
    try {
      const response = await axios.get(`https://localhost:7102/api/DivisionHOD/divisionName/${hodId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getSubProcurmentPlanPerDivision(hodId) {
    try {
      const response2 = await axios.get(`https://localhost:7102/api/DivisionHOD/sppIds/${hodId}`);
      return response2.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  const columns = [
    { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
    { id: "Qty", label: "Quantity", Width: 300, align: "center" },
    {
      id: "Specification",
      label: "Specification",
      Width: 300,
      align: "center",
    },
    { id: "RV", label: "Recommended Vendors", Width: 300, align: "center" },
    { id: "EDD", label: "Expected Delivery Date", Width: 300, align: "center" },
    { id: "Del", Width: 300, align: "center" },
  ];
  // function createData(ItemID, ItemName, Qty, Specification, RV, EDD, Del) {
  //   return { ItemID, ItemName, Qty, Specification, RV, EDD, Del };
  // }

  // const rows = [
  //   createData(
  //     "I0014",
  //     "A4 Papers",
  //     "500",
  //     "GSM 80",
  //     "ABC Bookshop",
  //     "2023-10-05",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "P0023",
  //     "Printer Ink Cartridges",
  //     "100",
  //     "Epson Compatible",
  //     "XYZ Office Supplies",
  //     "2022-03-15",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "C0012",
  //     "Computer Monitors",
  //     "50",
  //     "27 inch, 1080p",
  //     "DEF Electronics",
  //     "2022-05-20",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "S0056",
  //     "Safety Gloves",
  //     "1000",
  //     "Latex-free, Medium Size",
  //     "GHI Workwear",
  //     "2022-07-10",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "M0089",
  //     "Medical Supplies",
  //     "500",
  //     "Sterilized, Disposable",
  //     "JKL Healthcare",
  //     "2022-09-15",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "F0035",
  //     "Furniture",
  //     "20",
  //     "Leather, Executive office chair",
  //     "MNO Interior Design",
  //     "2022-11-25",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "T0078",
  //     "Telecommunication Equipment",
  //     "30",
  //     "5G compatible, Router",
  //     "PQR Technology",
  //     "2023-01-15",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "B0092",
  //     "Building Materials",
  //     "200",
  //     "Galvanized steel, 2x4",
  //     "STU Construction",
  //     "2023-03-10",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "L0101",
  //     "Lab Equipment",
  //     "50",
  //     "Digital, pH meter",
  //     "VWX Science",
  //     "2023-05-20",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "G0049",
  //     "Gardening Equipment",
  //     "100",
  //     "Gas-powered, Lawnmower",
  //     "YZ Landscaping",
  //     "2023-07-15",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  //   createData(
  //     "D0123",
  //     "Janitorial Supplies",
  //     "300",
  //     "Eco-friendly, All-purpose cleaner",
  //     "ABC Cleaning",
  //     "2023-09-10",
  //     <IconButton aria-label="delete" sx={{ color: "#205295" }}>
  //       <DeleteIcon />
  //     </IconButton>
  //   ),
  // ];

 
  const [page, setPage] = React.useState(0);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };

  // Function to perform search
  const performSearch = () => {
    // Filter the data based on the search query
    const filteredResults = data.filter((item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Map over the filtered results and create a new array with all item properties
    const filteredDataWithAllProperties = filteredResults.map((item) => {
      return {
        ...item, // Spread all the existing properties of the item
      };
    });
  
    // Update the filteredData state with the filtered results
    setFilteredData(filteredDataWithAllProperties);
    console.log(filteredDataWithAllProperties);
  };

  

  const handleSubIdChange = (event) => {
    setSelectedSubId(event.target.value);
  };

  const fetchDataForSubId = async () => {
    try {
      const response = await axios.get(`https://localhost:7102/api/DivisionHOD/SubProcurementPlanItems/${selectedSubId}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
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
  }, []);

  useEffect(() => {
    const fetchDataForSubId = async () => {
      try {
        const response = await axios.get(`https://localhost:7102/api/DivisionHOD/SubProcurementPlanItems/${selectedSubId}`);
        
        setData(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    
      fetchDataForSubId();
    
  }, [selectedSubId]);
  

  return (
    <div style={{ overflowX: "hidden" }}>
      

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>

            <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
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
              <SelectDropDown list={subIds} value={selectedSubId} onChange={handleSubIdChange} /> <AddCircleOutlineIcon />
            </div>

            <SearchFilter  value={searchQuery}
        onChange={handleSearchQueryChange}
        onSearch={performSearch} />
           
        
      
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
                        style={{ maxWidth: column.Width }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
          <TableBody>
            { data && data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align="center">{row.itemId}</TableCell>
                  <TableCell align="center">{row.itemName}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.specification}</TableCell>
                  <TableCell align="center">{row.recommendedVendor}</TableCell>
                  <TableCell align="center">{new Date(row.expectedDeliveryDate).toLocaleDateString()}</TableCell>
                  
                  <TableCell align="center"><IconButton aria-label="delete" sx={{ color: "#205295" }}>
                <DeleteIcon />
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
            style={{ display: "flex", alignContent: "flex-end", marginTop: 15 }}
          >
            
            <Routerlink to={`/add-item-to-subprocurement-Plan/${division}/${selectedSubId}`}>
              <Button variant="contained">Add Item</Button>
              </Routerlink>
            
            {/* <Button variant="contained" style={{ marginLeft: 40 }} >
              Submit
            </Button> */}
            <DonePopup
            text={"Successfully Submitted"}
            title={"Submit"}
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
