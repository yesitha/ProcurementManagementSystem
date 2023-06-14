import React from 'react'
import styles from "./PurchaseOrder.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as Routerlink } from 'react-router-dom';


const columns = [
    
    { id: "ItemID", label: "Item ID", Width: 200, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
    { id: "Quantity", label: "Quantity", Width: 200, align: "center" },
    { id: "Des", label: "Description", Width: 200, align: "center" },
    { id: "UnitPrice", label: "Unit Price", Width: 200, align: "center" },
    { id: "Amount", label: "Amount", Width: 200, align: "center" },
    { id: "Delete", label: "", Width: 200, align: "center" }
  ];
  function createData(ItemID, ItemName, Quantity, Des,UnitPrice,Amount,Delete) {
    return { ItemID, ItemName, Quantity, Des,UnitPrice,Amount,Delete };
  }

  const rows = [
    createData("M002", "Pen", 30, "Black ink, ballpoint pen", 15, 450, <Button> <DeleteIcon /></Button>),
    createData("M003", "Notebook", 10, "A5 size, ruled pages", 25, 250,<Button> <DeleteIcon /></Button>),
    createData("M004", "Eraser", 100, "Soft and smudge-free", 5, 500, <Button> <DeleteIcon /></Button>),
    createData("M005", "Highlighter", 20, "Assorted colors", 10, 200, <Button> <DeleteIcon /></Button>),
    createData("M006", "Stapler", 5, "Standard size, includes staples", 50, 250, <Button> <DeleteIcon /></Button>)]
;

function PurchaseOrder() {
    const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
    const list1=[1,2,3,4,5,];
    const list2=["susan","bunty","don","yasiru"];

    const vendorID = "";
    const vendorAddress="";

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
    <div>
    <div className={styles.NotificationPageContainer__header}>
    <Routerlink to={-1}>
    <IconButton
      sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
    >
      <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
    </IconButton>
    </Routerlink>
    <h1 className={styles.NotificationPageHeader}> Purchase Order</h1>
  </div>
  <div className={styles.divide}>
  <div className={styles.dropdown1} style={{marginTop:"60px"}}>
              <label style={{ color: "white", marginLeft: "10px" }}>
                MASTER PROCUREMENT PLAN ID*
              </label>
              <SelectDropDown list={list} />
            </div>
     <div>
        <div className={styles.dropdown1}>
        <label style={{ color: "white", marginLeft: "10px" }}>
                Date
              </label>
              <SelectDropDown list={list1} />
        </div>
        <div className={styles.dropdown1}>
        <label style={{ color: "white", marginLeft: "10px" }}>
                Vendor Name
              </label>
              <SelectDropDown list={list2} />
        </div>
        </div> 
        <div className={styles.block}>
            <Typography>
                Vendor ID:{vendorID}<br/>
                Vendor Address:{vendorAddress}<br/>

            </Typography>
        </div>
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
          <Routerlink to={'/add-item-to-PO'}>
          <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 200,marginLeft:"75px",marginTop:"20px" }}
    >
     ADD ITEM
    </Button>
    </Routerlink>
    <Routerlink to={'/send-purchase-order'}>
    <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 200,marginLeft:"900px",marginTop:"20px" }}
    >
     PRINT PREVIEW
    </Button>
    </Routerlink>
  </div>
  )
}

export default PurchaseOrder