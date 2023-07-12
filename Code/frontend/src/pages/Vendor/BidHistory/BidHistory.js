import React, { useEffect, useState } from "react";
import styles from "./BidHistory.module.css";
import { Container, IconButton, Paper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Typography,Stack,TextField,Tooltip } from "@mui/material";
import SearchNoFilter from "../../../components/Search/Search";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import "../../../fonts.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetBidHistory } from "../../../services/Vendor/Vendorservices";
import { DateFormat } from "../../../services/dataFormats";
import { user } from "../../Usermanage";
import { MoneyFormat } from "../../../services/dataFormats";

const columns = [
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Quantity", label: "Quantity", Width: 300, align: "center" },
  { id: "Specification", label: "Specification", Width: 300, align: "center" },
  {
    id: "exDDate",
    label: "Expected Delivery Date",
    Width: 300,
    align: "center",
  },
  { id: "BidValue", label: "Bid Value", Width: 300, align: "center" },
  { id: "BidStatus", label: "Bid Status", Width: 300, align: "center" },
  { id: "LoA", label: "Letter of Acceptance", Width: 300, align: "center" },
];

function DisplayDate({ date }) {
  const formattedDate = date?.substring(0, 10); // Extract only the date portion
  return (
    <Stack component="form" noValidate spacing={3} alignItems="center">
      <TextField
        id="date"
        label="Minimum Expected Delivery Date"
        type="date"
        align="center"
        value={formattedDate}
        sx={{ width: 200, height: 50 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}

function BidHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const vendorId  = user ? user.id : ""; //this need to get from the login
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetBidHistory(vendorId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className={styles.outer}>
      <Container
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.PageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>Bid History</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <SearchNoFilter className={styles.search} />
        </div>

        {/* Add table data */}

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
              pt: 2,
            }}
          >
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={styles.TableHeaders0}>
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
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#FFFFFF" : "#F2F2F2",
                          }}
                        >
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.specification}>
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.specification}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <DisplayDate date={row.expectedDeliveryDate} />
                          </TableCell>
                          <TableCell align="center">{MoneyFormat(row.bidValue)}</TableCell>
                          <TableCell align="center">{row.bidStatus}</TableCell>
                          <TableCell align="center">
                            {row.bidStatus === "Selected" && !row.isletterOfAcceptance
? (
                              <Routerlink
                                to={`/letter-of-acceptance/${row.itemId}`}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    width: 70,
                                    height: 30,
                                    borderRadius: "20px",
                                  }}
                                  
                                >
                                  Submit
                                </Button>
                              </Routerlink>
                            ) : (
                              <Button
                                variant="contained"
                                disabled
                                sx={{
                                  width: 70,
                                  height: 30,
                                  borderRadius: "20px",
                                }}
                              >
                                Submit
                              </Button>
                            )}
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

export default BidHistory;
