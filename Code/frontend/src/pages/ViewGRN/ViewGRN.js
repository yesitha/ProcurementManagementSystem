import React, { useEffect, useState } from "react";
import styles from "./viewGRN.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewNote from "../../components/Popups/DonePopup/ViewNote";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetGRNIdListByVendorId } from "../../services/Vendor/Vendorservices";
import { DateFormat } from "../../services/dataFormats";
import { user } from "../Usermanage";

const columns = [
  { id: "GRNID", label: "GRN ID", Width: 200, align: "center" },
  { id: "POID", label: "PO ID", Width: 200, align: "center" },
  { id: "Date", label: "Date", Width: 200, align: "center" },
  { id: "Action", label: "Action", Width: 200, align: "center" },
];

const vendorId = user ? user.id : "";
// const vendorId = "VEN00001";

export default function ViewGRN() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const { vendorId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetGRNIdListByVendorId(vendorId);
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
    <div>
      <div className={styles.afmpp_heading}>
        <Routerlink to={-1}>
          <IconButton sx={{ pl: "15px", height: "34px", width: "34px" }}>
            <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Routerlink>
        View GRN
      </div>

      <div className={styles.afmpp_table}>
        <Paper
          sx={{
            marginLeft: "70px",
            width: "70%",
            overflow: "auto",
            borderRadius: 5,
            scrollBehavior: "smooth",
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
                {data &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{row.grnId}</TableCell>
                        <TableCell align="center">{row.poId}</TableCell>
                        <TableCell align="center">
                          {DateFormat(row.date)}
                        </TableCell>
                        <TableCell align="center">
                          {
                            <Routerlink to={`/grn/${row.poId}/${row.grnId}`}>
                              <IconButton
                                sx={{ width: "40px", height: "40px", px: 0.5 ,color:"#205295"}}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Routerlink>
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
    </div>
  );
}
