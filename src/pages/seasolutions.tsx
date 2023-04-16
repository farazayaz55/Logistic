import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Input,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MyProSidebarProvider } from "../Components/Sidebar/sidebarContext";
import Navbar from "../Components/NavBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import Image from "next/image";


interface Duration{
    label:string,
    value:string
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00254d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  Image,
  POL,
  POD,
  Stops,
  TransitTime,
  NextDeparture,
  Service,
  RoutingType
) {
  return {
    Image,
    POL,
    POD,
    Stops,
    TransitTime,
    NextDeparture,
    Service,
    RoutingType,
  };
}

const rows = [
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
  createData(
    <img
      src={
        "https://images.unsplash.com/photo-1680925697894-106c453c6e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      }
      height="20px"
      width="20px"
      style={{ borderRadius: "50%", marginRight: "20px" }}
    ></img>,

    "PORTBURY",
    "HONG KONG",
    "Dubai , India, Pakistan",
    "30 DAYS",
    "APRIL 20 2023",
    "LION SERVICE",
    "TRANSHIPMENT",
    "Unknown"
  ),
];
const SeaSolutions:React.FC = () => {
  const [table, setTable] = useState<boolean>(false);
  const [combobox, setCombobox] = useState<string>("");

  const handleSearch = () => {
    setTable(true);
  };
  const durations:Duration[] = [
    { label: "1 Week", value: "1Week" },
    { label: "2 Weeks", value: "2Weeks" },
    { label: "3 Weeks", value: "3Weeks" },
    { label: "4 Weeks", value: "4Weeks" },
  ];
  const handleComboValue = (e:React.ChangeEvent, value:string) => {
    console.log(value);
    setCombobox(value);
  };
  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Box
            sx={{ margin: "20px", background: "#fff", borderRadius: "10px" }}
          >
            <Navbar />
          </Box>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={12} sx={{ height: "50%" }}>
                <Box
                  sx={{
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    width: "100%",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "30px",
                      textAlign: "center",
                      color: "#00254d",
                    }}
                  >
                    Sea Solutions
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>


<Image
  src="https://img.freepik.com/premium-vector/cargo-logistics-truck-transportation-container-ship-with-working-crane-import-export-transport-industry_327176-212.jpg?w=740"
  alt="cargo logistics truck transportation container ship with working crane import export transport industry"
  width={740}
  height={300}
/>

                  </Box>
                  <Card
                    sx={{
                      marginTop: "5px",
                      width: "80%",
                      marginLeft: "8%",
                      borderRadius: "10px",
                      padding: "20px",
                      boxShadow: "0px 0px 15px 2px #00000028",
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item sm={12} md={1} lg={1}></Grid>
                        <Grid item sm={12} md={10} lg={10}>
                          <Typography>Origin</Typography>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              borderRadius: "10px",
                              padding: "0px 10px 0px 10px",
                              marginTop: "5px",
                            }}
                          >
                            <Input
                              type="text"
                              disableUnderline
                              fullWidth
                              placeholder="Port or Origin Country"
                              label="From"
                              inputProps={{
                                style: {
                                  borderRadius: "10px",
                                  margin: "10px",
                                  padding: "10px",
                                  backgroundColor: "#EDEDED",
                                },
                              }}
                            ></Input>
                            
                          </Box>
                          <Typography sx={{ mt: "10px" }}>
                            Destination:
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              borderRadius: "10px",
                              padding: "0px 10px 0px 10px",
                              marginTop: "5px",
                            }}
                          >
                            <Input
                              type="text"
                              disableUnderline
                              placeholder="Port or Destination Country"
                              fullWidth
                              label="To"
                              inputProps={{
                                style: {
                                  borderRadius: "10px",
                                  margin: "10px",
                                  padding: "10px",
                                  backgroundColor: "#EDEDED",
                                },
                              }}
                            ></Input>
                           
                          </Box>
                          <Typography sx={{ mt: "10px" }}>On:</Typography>
                          <Grid container spacing={2}>
                            <Grid item sm={12} md={4} lg={4}>
                              <Box sx={{}}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    sx={{
                                      backgroundColor: "#EDEDED",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </LocalizationProvider>
                              </Box>
                            </Grid>
                            <Grid item sm={12} md={4} lg={4}>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={durations}
                                onChange={handleComboValue}
                                value={combobox}
                                sx={{
                                  "& label.Mui-focused": {
  

                                    color: "#000",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderColor: "#000",
                                    // borderColor: "#000",
                                    borderRadius: "15px",
                                    border: "2px solid #0000002b",
                                  },
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "#000",
                                      borderRadius: "15px",
                                      // border: "2px solid #0000002b",
                                      border: "2px solid #0000002b",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#000",
                                      borderRadius: "15px",
                                      border: "2px solid #0000002b",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#000",
                                      borderRadius: "15px",
                                      border: "2px solid #0000002b",
                                    },
                                  },
                                  borderRadius: "15px",
                                  background: "#EDEDED",
                                  width: "100%",
                                  m: "0px 10px 10px 0px",
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Next" />
                                )}
                              />
                            </Grid>
                            <Grid item sm={12} md={4} lg={4}>
                              <Box
                                sx={{
                                  fontFamily: "Comforta",
                                  display: "inline-flex",
                                  justifyItems: "flex-end",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Checkbox
                                  name="parking"
                                  sx={{
                                    color: "#00254d",
                                    "&.Mui-checked": {
                                      color: "#00254d",
                                    },
                                  }}
                                />
                                <Typography sx={{ marginTop: "10px" }}>
                                  Direct routing only
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Button
                            onClick={handleSearch}
                            sx={{
                              marginTop: "50px",
                              textTransform: "none",
                              borderRadius: "10px",
                              background: "#00254d",
                              color: "#fff",
                              height: "40px",
                              padding: "10px 20px 10px 20px",
                              "&:hover": {
                                background: "#00254d",
                                color: "#fff",
                              },
                            }}
                          >
                            Search
                          </Button>
                        </Grid>
                        <Grid item sm={12} md={1} lg={1}></Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              {table ? (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    backgroundColor: "#fff",
                    margin: "20px 0px 20px 20px",
                    borderRadius: "10px",
                  }}
                >
                  <Grid item sm={12} md={1} lg={1}></Grid>
                  <Grid item sm={12} md={10} lg={10}>
                    <TableContainer
                      component={Paper}
                      sx={{ marginTop: "100px", marginBottom: "100px" }}
                    >
                      <Table
                        sx={{ width: "100%" }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Port of Load</StyledTableCell>
                            <StyledTableCell align="left">
                              Port of Discharge
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Stops
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Transit Time
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Next Departure
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Service
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Routing Type
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <StyledTableRow key={row.POL}>
                              <StyledTableCell component="th" scope="row">
                                <Box sx={{ display: "flex" }}>{row.POL}</Box>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.POD}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.Stops}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.TransitTime}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.NextDeparture}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.Service}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.RoutingType}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item sm={12} md={1} lg={1}></Grid>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Container>
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default SeaSolutions;
