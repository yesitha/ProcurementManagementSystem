import React, { useEffect, useState } from "react";
import styles from "./VendorSelection.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import VendorDetails from "../../../components/Popups/VendorDetails/VendorDetails";
import { Link as Routerlink } from "react-router-dom";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { GetVendorSelectionBidDetails, VendorSelectionVidIid } from "../../../services/TecCommitte/TecCommitteeservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "ItemId", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  { id: "specification", label: "Specification", Width: 300, align: "center" },
  {
    id: "exdeliveryDate",
    label: "Expected Delivery Date",
    Width: 300,
    align: "center",
  },
  { id: "vendorID", label: "Vendor ID", Width: 300, align: "center" },
  { id: "VendorName", label: "Vendor Name", Width: 300, align: "center" },
  { id: "bidvalue", label: "Bid Value", Width: 300, align: "center" },
  { id: "Venveri", label: "Vendor Verification", Width: 300, align: "center" },
  { id: "act", label: "Action", Width: 300, align: "center" },
];

function VendorSelection() {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetVendorSelectionBidDetails();
        const data = response;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
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
            <h1 className={styles.Header}>Vendor Selection</h1>
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
            <TableContainer className={styles.tableContainer}>
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
                        >
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {row.specification}
                          </TableCell>
                          <TableCell align="center">
                            {DateFormat(row.expectedDeliveryDate)}
                          </TableCell>
                          <TableCell align="center">
                            {row.bidinfo[0].vendorId}
                          </TableCell>
                          <TableCell align="center">
                            {row.bidinfo[0].vendorName}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidinfo[0].bidValue)}
                          </TableCell>
                          <TableCell align="center">
                            {<VendorDetails />}
                          </TableCell>
                          <TableCell align="center">
                            {
                              <div
                                  onClick={(event) => {
                                    VendorSelectionVidIid(row.bidinfo[0].vendorId, row.itemId);
                                    event.stopPropagation();
                                  }}
                                >
                              <DonePopup
                                text={"Vendor Selection Successfully"}
                                title={"Select"}
                                styles={{
                                  mb: "10px",
                                  ml: "10px",
                                }}
                              />
                              </div>
                            }
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
  );
}

export default VendorSelection;
