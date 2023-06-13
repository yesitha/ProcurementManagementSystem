import React from 'react'
import styles from "./AddItemstoPO.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchNoFilter from "../../../components/SearchNoFilter/SearchNoFilter";
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

  const columns = [
    
    { id: "ItemID", label: "Item ID", Width: 200, align: "center" },
    { id: "ItemName", label: "Item Name", Width: 200, align: "center" },
    { id: "Quantity", label: "Quantity", Width: 200, align: "center" },
    { id: "Spec", label: "Specification", Width: 200, align: "center" },
  ];
  function createData(ItemID, ItemName, Quantity, Specification) {
    return { ItemID, ItemName, Quantity, Specification };
  }

  const rows = [
    createData("M002", "Pen", 30, "Black ink"),
    createData("M003", "Notebook", 10, "A5 size, ruled pages"),
    createData("M004", "Eraser", 100, "Soft and smudge-free"),
    createData("M005", "Highlighter", 20, "Assorted colors"),
    createData("M006", "Stapler", 5, "Standard size, includes staples")]
;

function AddItemstoPO() {
    const list1 = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];
    const list2=["susan","bunty","don","yasiru"];

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
        <div className={styles.divide}>
    <div className={styles.NotificationPageContainer__header}>
    
    <IconButton
      sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
    >
      <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
    </IconButton>
    
    <h1 className={styles.NotificationPageHeader}> Add Items to PO</h1>
  </div>
  <div>
  <SearchNoFilter />
  </div>
  </div>
  <div className={styles.divide}>
  <div className={styles.dropdown1}>
        <label style={{ color: "white", marginLeft: "10px" }}>
                MASTER PROCUREMENT ID*
              </label>
              <SelectDropDown list={list1} />
        </div>
        <div className={styles.dropdown1}>
        <label style={{ color: "white", marginLeft: "10px" }}>
                VENDOR NAME*
              </label>
              <SelectDropDown list={list2} />
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
          <Button
      variant="contained"
      fontFamily={"Inter"}
      sx={{ bgcolor: "#205295", borderRadius: 5, height: 50, width: 200,marginLeft:"1200px",marginTop:"20px" }}
    >
     ADD TO PO
    </Button>
  </div>
  )
}

export default AddItemstoPO