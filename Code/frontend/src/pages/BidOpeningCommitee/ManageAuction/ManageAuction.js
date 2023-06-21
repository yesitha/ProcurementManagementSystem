import React, { useState, useEffect } from "react";
import styles from "./ManageAuction.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchNoFilter from "../../../components/Search/Search";
import { Container } from "@mui/system";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink } from "react-router-dom";
import {
  GetSubProcurementApprovedItems,
  UpdateAuctionDates,
} from "../../../services/BidOpeningCommittee/BidOpeningCommitteeServices";

const columns = [
  { id: "ItemID", label: "Item ID", width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", width: 300, align: "center" },
  { id: "Qty", label: "Quantity", width: 300, align: "center" },
  { id: "Ven", label: "Vendors", width: 300, align: "center" },
  { id: "Odate", label: "Opening Date", width: 300, align: "center" },
  { id: "Cdate", label: "Closing Date", width: 300, align: "center" },
  { id: "Rdate", label: "Remaining Days", width: 300, align: "center" },
  { id: "act", label: "Action", width: 300, align: "center" },
];

function ManageAuction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetSubProcurementApprovedItems();
        const data = response;
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpeningDateChange = (itemId, event) => {
    const newDate = event.target.value;
    setData((prevData) =>
      prevData.map((item) =>
        item.itemId === itemId ? { ...item, openingDate: newDate } : item
      )
    );
  };

  const handleClosingDateChange = (itemId, event) => {
    const newDate = event.target.value;
    setData((prevData) =>
      prevData.map((item) =>
        item.itemId === itemId ? { ...item, closingDate: newDate } : item
      )
    );
  };

  const calculateRemainingDays = (openingDate, closingDate) => {
    const currentDate = new Date();
    const openingDateObj = new Date(openingDate);
    const closingDateObj = new Date(closingDate);

    if (currentDate >= openingDateObj && currentDate <= closingDateObj) {
      const timeDiff = closingDateObj.getTime() - currentDate.getTime();
      const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return remainingDays + " Days";
    } else {
      return "- -";
    }
  };

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
            <h1 className={styles.Header}> Manage Auctions</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <h1 className={styles.header2}>Items to Auction</h1>
          <SearchNoFilter className={styles.search} />
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
              borderRadius: "10px",
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
                        style={{ maxWidth: column.width }}
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
                      .map((row) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.itemId}
                        >
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {row.recommendedVendors.map((vendor, index) => (
                              <React.Fragment key={index}>
                                {vendor}
                                <br />
                              </React.Fragment>
                            ))}
                          </TableCell>
                          <TableCell align="center">
                            <Stack component="form" noValidate spacing={3}>
                              <TextField
                                id={`openingDate-${row.itemId}`}
                                label="Opening Date"
                                type="date"
                                value={row.openingDate}
                                onChange={(event) =>
                                  handleOpeningDateChange(row.itemId, event)
                                }
                                sx={{ width: 150, height: 40 }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Stack component="form" noValidate spacing={3}>
                              <TextField
                                id={`closingDate-${row.itemId}`}
                                label="Closing Date"
                                type="date"
                                value={row.closingDate}
                                onChange={(event) =>
                                  handleClosingDateChange(row.itemId, event)
                                }
                                sx={{ width: 150, height: 40 }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            {calculateRemainingDays(
                              row.openingDate,
                              row.closingDate
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <div
                              onClick={(event) => {
                                UpdateAuctionDates(
                                  row.itemId,
                                  row.openingDate,
                                  row.closingDate
                                );
                                event.stopPropagation();
                              }}
                            >
                              <DonePopup
                                text={"Successfully Scheduled"}
                                title={"Schedule"}
                                color="primary"
                                sx={{ height: "40px" }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={data ? data.length : 0}
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

export default ManageAuction;
