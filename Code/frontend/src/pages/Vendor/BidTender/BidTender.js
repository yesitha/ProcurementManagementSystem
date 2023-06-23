import React, { useEffect, useState } from "react";
import styles from "./BidTender.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchNoFilter from "../../../components/Search/Search";
import { Container } from "@mui/system";
import GavelIcon from "@mui/icons-material/Gavel";
import { Link as Routerlink, useParams} from "react-router-dom";
import { GetApprovedItemsDetailsvendorId } from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";


const columns = [
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  { id: "specification", label: "Specification", Width: 300, align: "center" },
  { id: "duedate", label: "Expected Delivery Date", Width: 300, align: "center" },
  { id: "bidstatus", label: "Bid Status", Width: 300, align: "center" },
  { id: "act", label: "Action", Width: 300, align: "center" },
];


function createData(ItemName, Qty, specification, duedate, bidstatus, act) {
  return { ItemName, Qty, specification, duedate, bidstatus, act };
}
const itemId = "PAY35503";


const rows = [
  createData(
    "A4 Papers",
    "45",
    "GSM 80",
    "2023-01-23",
    <Typography sx={{ color: "#227C70" }}>LKR 4000</Typography>,
    // <Routerlink to={`/tender-details/${itemId}`}>
    <Routerlink to={'/tender-details'}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#227C70",
        width: 50,
        height: 50,
        borderRadius: "20px",
      }}
    >
      <GavelIcon style={{ fontSize: 30 }} />
    </Button>
    </Routerlink>
  ),
  createData(
    "Pens",
    "45",
    "Blue",
    "2023-01-23",
    <Typography sx={{ color: "#9C254D" }}>Not Bided</Typography>,
    // <Routerlink to={`/tender-details/${itemId}`}>
    <Routerlink to={'/tender-details'}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#9C254D",
        width: 50,
        height: 50,
        borderRadius: "20px",
      }}
    >
      <GavelIcon style={{ fontSize: 30 }} />
    </Button>
    </Routerlink>
  ),
];

function BidTender() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


const { vendorId } = useParams();
const [data, setData] = useState(null);

useEffect(() => {
  const fetchdata = async () => {
    try {
      const response = await GetApprovedItemsDetailsvendorId(vendorId);
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
            <h1 className={styles.Header}> Bid Tender</h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
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
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">{row.totalQuantity}</TableCell>
                          <TableCell align="center">
                            {row.specification}
                          </TableCell>
                          <TableCell align="center">
                            {DateFormat(row.expectedDeliveryDate)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue)}
                          </TableCell>
                          <TableCell align="center">
                            {<Routerlink to={`/tender-details/${row.itemId}`}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#227C70",
                                  width: 50,
                                  height: 50,
                                  borderRadius: "20px",
                                }}
                              >
                                <GavelIcon style={{ fontSize: 30 }} />
                              </Button>
                              </Routerlink>}
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
      </Container>
    </div>
  );
}

export default BidTender;
