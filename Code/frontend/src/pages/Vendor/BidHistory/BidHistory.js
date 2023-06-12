import React from 'react';
import styles from "./BidHistory.module.css";
import {
  Container,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box ,Button,Typography} from "@mui/material";
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
import { Link as Routerlink } from 'react-router-dom';

const columns = [
  {id: "ItemName",label: "Item Name",Width: 300,align: "center",},
  { id: "Quantity", label: "Quantity", Width: 300, align: "center" },
  { id: "Specification", label: "Specification", Width: 300, align: "center" },
  { id: "BidValue", label: "Bid Value", Width: 300, align: "center" },
  { id: "BidStatus", label: "Bid Status", Width: 300, align: "center" },
  { id: "Verification", label: "Verification", Width: 300, align: "center" },
  { id: "VerificationStatus", label: "Verification Status", Width: 300, align: "center" },
];
function createData(ItemName, Quantity, Specification, BidValue, BidStatus, Verification,VerificationStatus) {
  return {ItemName, Quantity, Specification, BidValue, BidStatus, Verification,VerificationStatus};
}

const rows = [
  createData(
    "A4 Papers",
    "45",
    "GSM 80",
    <Typography sx={{ color: "#227C70" }}>LKR 4000</Typography>,
    <Typography sx={{ color: "#227C70" }}>Selected</Typography>,
    <Routerlink to={'/'}>
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
    </Routerlink>,
    <Typography sx={{ color: "#227C70" }}>Approveed</Typography>
  ),
];

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
                      style={{ maxWidth: column.Width }}
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
    </Container>
  </div>
  )
}

export default BidHistory;