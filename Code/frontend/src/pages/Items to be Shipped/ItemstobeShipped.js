import { Typography } from "@mui/material";
import React from "react";
import styles from "./ItemstobeShipped.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Successfullyinformed from "../../components/Popups/DonePopup/Successfullyinformed";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link as Routerlink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { GetItemToBeShippedDetails } from "../../services/Vendor/Vendorservices";
import { GetPOIdListByVendorId } from "../../services/Vendor/Vendorservices";
import { MoneyFormat } from "../../services/dataFormats";
import { CreatePurchaseOrderItemsToBeShippedRecords } from "../../services/Vendor/Vendorservices";

const list0 = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
const list3 = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "ShippedQty", label: "Shipped Quantity", Width: 300, align: "center" },
  { id: "Description", label: "Description", Width: 300, align: "center" },
  { id: "UnitPrice", label: "Unit Price", Width: 300, align: "center" },
  {
    id: "RemainingQty",
    label: "Remaining Quantity to ship",
    Width: 300,
    align: "center",
  },
];

function createData(
  ItemID,
  ItemName,
  ShippedQty,
  Description,
  UnitPrice,
  RemainingQty
) {
  return { ItemID, ItemName, ShippedQty, Description, UnitPrice, RemainingQty };
}

const rows = [
  createData(
    "I0014",
    "A4 Papers",
    <TextField />,
    "A4 sized Papers",
    "2000lkr",
    "52"
  ),
  createData(
    "I0015",
    "Staplers",
    <TextField />,
    "Atlas Staplers",
    "5000lkr",
    "63"
  ),
];

export default function ItemstobeShipped() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState(null);
  const [poIds, setpoIds] = useState([]);
  const [selectedpoId, setSelectedpoId] = useState("");
  const vendorId = "HEL9863";

  const handlepoIdChange = (event) => {
    setSelectedpoId(event.target.value);
  };
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textFieldValues, setTextFieldValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poIdsResponse = await GetPOIdListByVendorId(vendorId);
        setpoIds(poIdsResponse.map((item) => item.poId));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [vendorId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetItemToBeShippedDetails(selectedpoId, vendorId);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(selectedpoId);
  }, [selectedpoId]);

  return (
    <div>
      <div className={styles.upperSection}>
        <div
          className={styles.ManageAuctionPageContainer__header}
          style={{ marginLeft: "90px", display: "flex" }}
        >
          <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Routerlink>
          <h1
            style={{ fontSize: "36px", color: "#ffffff", fontFamily: "Inter" }}
          >
            Items to be Shipped{" "}
          </h1>
        </div>
      </div>

      <div className={styles.Ph3} style={{ marginLeft: "100px" }}>
        <h4
          className={styles.h4}
          style={{ marginLeft: "10px", color: "white" }}
        >
          SUB PROCUREMENT ID
        </h4>
        <div className={styles.dropDownIconContainer}>
          <SelectDropDown
            list={poIds}
            value={selectedpoId}
            onChange={handlepoIdChange}
          />
        </div>
      </div>

      <div style={{ marginLeft: "100px", marginTop: "20px" }}>
        <Paper
          className={styles.baseTableContainer}
          elevation={6}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <TableContainer
            sx={{ borderRadius: 10 }}
            className={styles.tableContainer}
          >
            <Table stickyHeader aria-label="sticky table">
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
                {data &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        data-id={row.itemId}
                      >
                        <TableCell align="center">{row.itemId}</TableCell>
                        <TableCell align="center">{row.itemName}</TableCell>
                        <TableCell align="center">
                          <TextField
                            value={textFieldValues[row.itemId] || ""}
                            onChange={(e) => {
                              const updatedValues = {
                                ...textFieldValues,
                                [row.itemId]: e.target.value,
                              };
                              setTextFieldValues(updatedValues);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {row.specifications}
                        </TableCell>
                        <TableCell align="center">
                          {MoneyFormat(row.bidValue)}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalOrderedQuantity -row.shippedQtyForNow-
                            (textFieldValues[row.itemId] ?? 0)}
                        </TableCell>
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

      <div classname={styles.Button}>
        <div
          onClick={() => {
            CreatePurchaseOrderItemsToBeShippedRecords(
              selectedpoId,
              textFieldValues
            );
            
          }}
        >
          <Successfullyinformed
            styles={{
              position: "absolute",
              right: "5%",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 130,
              marginTop: 10,
            }}
            name=" To  the Procurement Officer"
            title="Inform"
          />
        </div>
      </div>
    </div>
  );
}
