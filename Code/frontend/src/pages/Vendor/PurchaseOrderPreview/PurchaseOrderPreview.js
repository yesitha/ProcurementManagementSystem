import React, {useState,useEffect} from "react";
import styles from "./PurchaseOrderPreview.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, Paper, TextField, Typography, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as Routerlink, useParams } from "react-router-dom";
import { GetPOItemDetails, GetPOVendorDetails } from "../../../services/Vendor/Vendorservices";
import { DateFormat, MoneyFormat } from "../../../services/dataFormats";
import { user } from "../../Usermanage";

const vendorId = user ? user.id : "";

const columns = [
  { id: "ItemID", label: "Item ID", Width: 300, align: "center" },
  { id: "ItemName", label: "Item Name", Width: 300, align: "center" },
  { id: "Desc", label: "Description", Width: 300, align: "center" },
  { id: "Qty", label: "Quantity", Width: 300, align: "center" },
  
  { id: "Uprice", label: "Unit Price", Width: 300, align: "center" },
  { id: "Total", label: "Total", Width: 300, align: "center" },
  
];
const handlePrint = () => {
  const printContent = document.getElementById("print-area");
  if (printContent) {
    const originalContent = document.body.innerHTML;
    const printContentHTML = printContent.innerHTML;
    document.body.innerHTML = printContentHTML;
    window.print();
    document.body.innerHTML = originalContent;
  }
  window.location.reload();
};

function PurchaseOrderPreview() {
  const { poId  } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetPOVendorDetails(poId);
        const data = response;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const [tabledata, settableData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetPOItemDetails(poId);
        const tabledata = response;
        settableData(tabledata);
        console.log(tabledata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (data===null) {
    return <div>Loading...</div>;
  }

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
        <div id="print-area"><div className={styles.upperSection}>
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
              <Typography style={{ marginLeft: "5px" }}>
               Date  : {DateFormat(data.date)}<br/>
               PO#   : {poId}
              </Typography>
            </div>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>PUCSL</h1>
              6TH FLOOR,<br></br>
                BOC MERCHANT TOWER,<br></br>
                ST.MICHAEL'S ROAD,<br></br>
                COLOMBO 03,<br></br>
                SRI LANKA
            </Typography>
          </div>
          <div style={{ marginLeft: "5px" , marginBottom: "20px"}}>
            <Typography className={styles.tag}>
              <h1 className={styles.Header}>{data.vendorFullName}</h1>
              {data.companyName}<br></br>
              {data.address}<br></br>
              {data.city}<br></br>
              {data.contact}<br></br>
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
                        style={{ maxWidth: column.Width, fontWeight: "bold" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tabledata &&
                    tabledata.itemList
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
                          <TableCell align="center">{row.itemId}</TableCell>
                          <TableCell align="center">{row.itemName}</TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.specifications}>
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.specifications}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            {row.totalQuantity}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue)}
                          </TableCell>
                          <TableCell align="center">
                            {MoneyFormat(row.bidValue*row.totalQuantity)}
                          </TableCell>
                        </TableRow>
                      ))}
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
            <TextField sx={{backgroundColor:"white",borderRadius:"10px",width:"300px"}}
            value={data.commentsForSpecialInstruction}>
            </TextField> 
            </div>
            <Typography>   
              <h4>
                <br></br>
                <br></br>
                Total - {MoneyFormat(data.totalAmount)}
              </h4>
            </Typography>
          </div>
          <center>
            <Typography>
              if you have any concern of this PO, please contact<br></br>
              {data.vendorFullName} Via {data.contact}<br></br>
            </Typography>
          </center>
          </div>
  </div>
          <div className={styles.btn}>
            {/* <Button variant="contained">PRINT</Button> */}
            <Button
              onClick={handlePrint}
              variant="contained"
              fontFamily={"Inter"}
              // sx={{
              //   bgcolor: "#205295",
              //   borderRadius: 5,
              //   height: 50,
              //   width: 200,
              // }}
            >
              PRINT
            </Button>
            <Routerlink to={`/po-verification-submit/${poId}`}>
            <Button variant="contained" style={{ marginLeft: 40 }}>
             NEXT
            </Button>
            </Routerlink>
          </div>
        
        
      </Container>
    </div>
  );
}
export default PurchaseOrderPreview;
