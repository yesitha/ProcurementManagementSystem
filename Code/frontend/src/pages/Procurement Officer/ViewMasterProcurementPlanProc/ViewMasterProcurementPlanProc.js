import React from 'react'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./ViewMasterProcurementPlanProc.module.css";
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
  Typography,
} from "@mui/material";
import SearchNoFilter from "../../../components/SearchNoFilter/SearchNoFilter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Visibility from "../../../pages/FinanceDivisionAccountant/InvoicestobePaid/Visibility";

const columns = [
  {
    id: "MasterProcurementPlanID",
    label: "Master Procurement Plan ID",
    Width: 200,
    align: "center",
  },
  { id: "GrandTotal", label: "Grand Total", Width: 200, align: "center" },
  { id: "CreationDate", label: "Creation Date", Width: 200, align: "center" },
  { id: "Status", label: "Status", Width: 200, align: "center" },
  { id: "Action1", label: "Action", Width: 200, align: "center" },
  { id: "Action2", label: "Action", Width: 200, align: "center" },
];
function createData(MasterProcurementPlanID, GrandTotal, CreationDate, Status,Action1,Action2) {
  return { MasterProcurementPlanID, GrandTotal, CreationDate, Status,Action1,Action2 };
}

const rows = [
  createData(
    "MP-0001",
    "Rs. 1000000",
    "2021-09-01",
    <Visibility />,
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>,
    <Button
    className={styles.ViewButton}
    variant="contained"
    sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
  >
    {" "}
    Appoint Tec <br/>Committee{" "}
  </Button>
  ),
  createData(
    "MP-0002",
    "Rs. 2000000",
    "2021-09-02",
    <Visibility />,
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>,
     <Button
     className={styles.ViewButton}
     variant="contained"
     sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
   >
     {" "}
     Appoint Tec <br/>Committee{" "}
   </Button>
  ),
  createData(
    "MP-0003",
    "Rs. 3000000",
    "2021-09-03",
    <Visibility />,
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      view{" "}
    </Button>,
     <Button
     className={styles.ViewButton}
     variant="contained"
     sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
   >
     {" "}
     Appoint Tec <br/>Committee{" "}
   </Button>
  ),
  createData(
    "MP-0004",
    "Rs. 4000000",
    "2021-09-04",
    <Visibility />,
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      {" "}
      View{" "}
    </Button>,
     <Button
     className={styles.ViewButton}
     variant="contained"
     sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
   >
     {" "}
     Appoint Tec <br/>Committee{" "}
   </Button>
  ),
  createData(
    "MP-0005",
    "Rs. 5000000",
    "2021-09-05",
    <Visibility />,
    <Button
      className={styles.ViewButton}
      variant="contained"
      sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
    >
      View
    </Button>,
     <Button
     className={styles.ViewButton}
     variant="contained"
     sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
   >
     {" "}
     Appoint Tec <br/>Committee{" "}
   </Button>
  ),
];




function ViewMasterProcurementPlanProc() {
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
    <div >
    <div className={styles.NotificationPageContainer__header}>
    
    <IconButton
      sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
    >
      <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
    </IconButton>
    
    <h1 className={styles.NotificationPageHeader}> Master Procurement Plan</h1>
  </div>
  <div className={styles.MiddleSection}>
          <SearchNoFilter className={styles.search} />
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


  </div>

  );
}

export default ViewMasterProcurementPlanProc