import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./ViewMasterProcurementPlanProc.module.css";
import { DateFormat } from "../../../services/dataFormats";
import { MoneyFormat } from "../../../services/dataFormats";
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
import Visibility from "../../FinanceDivisionAccountant/InvoicesneedtobePaid/Visibility";
import { Link as Routerlink } from "react-router-dom";
import { useEffect } from "react";
import { fetchDataFromDb } from "../../../services/ProcurementHOD/ProcurementHODServices";
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
  { id: "Action3", label: "Action", Width: 200, align: "center" },
];
function createData(
  MasterProcurementPlanID,
  GrandTotal,
  CreationDate,
  Status,
  Action1,
  Action2
) {
  return {
    MasterProcurementPlanID,
    GrandTotal,
    CreationDate,
    Status,
    Action1,
    Action2,
  };
}

function ViewMasterProcurementPlanProc() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, SetData] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromDb();

        const data = response;
        SetData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
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
        <h1 className={styles.NotificationPageHeader}>
          {" "}
          Master Procurement Plan
        </h1>
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
                {data &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{row.mppId}</TableCell>
                        <TableCell align="center">
                          {MoneyFormat(row.estimatedGrandTotal)}
                        </TableCell>
                        <TableCell align="center">
                          {DateFormat(row.creationDate)}
                        </TableCell>
                        <TableCell align="center">
                          <Routerlink to={"/master-procurement-plan-status"}>
                            <Visibility />
                          </Routerlink>
                        </TableCell>
                        <TableCell>
                          <Routerlink to={"/view-master-procurement-plan"}>
                            <Button
                              className={styles.ViewButton}
                              variant="contained"
                              sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
                            >
                              {" "}
                              View{" "}
                            </Button>
                          </Routerlink>
                        </TableCell>
                        
                        <TableCell align="center">
                          <Routerlink to={"/create-modify-teccommittee"}>
                            <Button
                              className={styles.ViewButton}
                              variant="contained"
                              sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
                            >
                              {" "}
                              Appoint Tec <br />
                              Committee{" "}
                            </Button>
                          </Routerlink>
                        </TableCell>
                        <TableCell align="center">
                          <Routerlink to={"/create-modify-bidopeningC"}>
                            <Button
                              className={styles.ViewButton}
                              variant="contained"
                              sx={{ borderRadius: 8, px: { xs: 2, md: 5 } }}
                            >
                              {" "}
                              Appoint BidOpening <br />
                              Committee{" "}
                            </Button>
                          </Routerlink>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={data.length}
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

export default ViewMasterProcurementPlanProc;
