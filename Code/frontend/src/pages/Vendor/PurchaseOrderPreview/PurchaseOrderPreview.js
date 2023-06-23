import React from "react";
import styles from "./PurchaseOrderPreview.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as Routerlink } from "react-router-dom";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Desc", label: "Description", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  
  { id: "Uprice", label: "Unit Price", Width: 300, align: "center" },
  { id: "Total", label: "Total", Width: 300, align: "center" },
  
];
function createData(ItemID, ItemName,Desc, Qty, Uprice, Total) {
  return { ItemID, ItemName,Desc, Qty, Uprice, Total };
}
const rows = [
    createData("I0014", "A4 Papers", "GSm 80", "500", "400", 200000),
    createData("I0023", "Pen Set", "Blue ink", "100", "10", 1000),
    createData("I0031", "Notebooks", "Spiral bound", "200", "50", 10000),
    createData("I0042", "Markers", "Assorted colors", "50", "5", 250),
    createData("I0055", "Sticky Notes", "Yellow", "300", "2", 600),
];

const poId ='BAS95814';

function PurchaseOrderPreview() {
 

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
          <div className={styles.uppercontainer}>
            <div className={styles.tag}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Routerlink to={-1}>
                <IconButton
                  sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
                >
                  <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
                </IconButton>
                </Routerlink>
                <h1 className={styles.Header}>Purchase Order</h1>
              </div>
              <Typography style={{ marginLeft: "35px" }}>
               Date:[17/12/2023]<br/>
               PO# :{poId}
              </Typography>
            </div>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>PUCSL</h1>
              6TH FLOOR,<br></br>
                BOC MERCHANT TOWER,<br></br>
                ST.MICHAEL'S ROAD,<br></br>
                COLOMBO 03,<br></br>
                SRI LANKA
              {/* Date - [2023-05-10]<br></br>
              Invoice - #00012<br></br>
              Customer ID - <br></br>
              Due Date - */}
            </Typography>
          </div>
          <div style={{ marginLeft: "35px" }}>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>VENDOR</h1>
              [Company Name]<br></br>
              [Contact or Department]<br></br>
              [Street Address]<br></br>
              [City, ZIP Code]<br></br>
              [Phone]<br></br>
              [Tax]
            </Typography>
          </div>
        </div>

        <div className={styles.midSection}>
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
              borderRadius: "20px",
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
                  {rows.map((row) => {
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
          </Paper>
        </div>
        <div
          className={styles.downSection}
          elevation={6}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          }}
        >
          <div className={styles.downcontainer}>
            <div>
            <Typography>
              <h4>Comments on Special Instructions</h4>
            </Typography>
            <TextField sx={{backgroundColor:"white",borderRadius:"10px",width:"300px"}}/> 
            </div>
            <Typography>
                
              <h4>
                Sub total<br></br>
                Tax<br></br>
                Shipping<br></br>
                Other<br></br>
                Total
              </h4>
            </Typography>
          </div>
          <center>
            <Typography>
              if you have any concern of this PO, please contact<br></br>
              [Name, Phone, Email]<br></br>
            </Typography>
          </center>
          <div className={styles.btn}>
            <Button variant="contained">PRINT</Button>
            <Routerlink to={`/po-verification-submit/${poId}`}>
            <Button variant="contained" style={{ marginLeft: 40 }}>
             NEXT
            </Button>
            </Routerlink>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default PurchaseOrderPreview;
