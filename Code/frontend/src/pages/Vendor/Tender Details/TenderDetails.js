import React from "react";
import styles from "./TenderDetails.module.css";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import GavelIcon from "@mui/icons-material/Gavel";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link as Routerlink } from "react-router-dom";

///////////////Add axios/////////////

const columns = [
  { id: "DOC", Width: 200, align: "center" },
  { id: "view", Width: 200, align: "center" },
  { id: "upld", Width: 200, align: "center" },
  { id: "del", Width: 200, align: "center" },
];

function createData(DOC, view, upld, del) {
  return { DOC, view, upld, del };
}

const rows = [
  createData(
    "DOC 1",
    <Button variant="contained">View</Button>,
    <Button variant="contained">Upload</Button>,
    <Button variant="contained">Delete</Button>
  ),
  createData(
    "DOC 2",
    <Button variant="contained">View</Button>,
    <Button variant="contained">Upload</Button>,
    <Button variant="contained">Delete</Button>
  ),
  createData(
    "DOC 3",
    <Button variant="contained">View</Button>,
    <Button variant="contained">Upload</Button>,
    <Button variant="contained">Delete</Button>
  ),
];

function TenderDetails() {

  const { itemId } = useParams();

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
          <div className={styles.TenderDetailsPageContainer__header}>
          <Routerlink to={-1}>
            <IconButton
              sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            </Routerlink>
            <h1 className={styles.Header}> </h1>
          </div>
        </div>

        <div className={styles.MiddleSection}>
          <h3 className={styles.header2}>Tender Details</h3>
          <Paper
            className={styles.UpperContainer}
            elevation={6}
            sx={{
              mr: {
                xs: "60px",
                sm: "65px",
                md: "65px",
                lg: "68px",
                xl: "70px",
              },
              alignItems: "left",
              borderRadius: "20px",
            }}
          >
            SPECIFICATION
            <TextField
              id="specification"
              multiline
              rows={4}
              sx={{ width: 500 }}
            />
            DUE DATE
            <TextField
              margin="normal"
              required
              fullWidth
              id="duedate"
              name="duedate"
              size="small"
              sx={{ width: 300 }}
            />
            QUANTITY
            <TextField
              margin="normal"
              required
              fullWidth
              id="qty"
              name="qty"
              size="small"
              sx={{ width: 300 }}
            />
            BID VALUE
            <TextField
              margin="normal"
              required
              fullWidth
              id="bidvalue"
              name="bidvalue"
              size="small"
              sx={{ width: 300 }}
            />
            TENDER VALUE
            <TextField
              margin="normal"
              required
              fullWidth
              id="tendervalue"
              name="tendervalue"
              size="small"
              sx={{ width: 300 }}
            />
          </Paper>
        </div>

        <div className={styles.downSection}>
          <h3 className={styles.header2}>Upload Required Document</h3>
          <div className={styles.tableNbutton}>
            <Paper
              className={styles.DownContainer}
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
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{
                    [`& .${tableCellClasses.root}`]: { borderBottom: "none" },
                  }}
                >
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
            <Routerlink to={-1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#227C70",
                width: 150,
                height: 150,
                borderRadius: "20px",
              }}
              
            >
              <Container display="flex" flexDirection="column">
                <GavelIcon style={{ fontSize: 40 }} />
                <Typography>Place BID</Typography>
              </Container>
            </Button>
            </Routerlink>
          </div>
        </div>
      </Container>
    </div>
  );
            
}

export default TenderDetails;
