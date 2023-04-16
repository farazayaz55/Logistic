import { ChangeEvent, FC, useState } from "react";
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
import Navbar from "../Components/Navbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import Image from "next/image";

interface FlightData {
    Image: JSX.Element;
    Carrier: string;
    Routing: string;
    Stops: string;
    Flight: string;
    Departure: string;
    Arival: string;
    AircraftType: string;
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
    Image: JSX.Element,
    Carrier: string,
    Routing: string,
    Stops: string,
    Flight: string,
    Departure: string,
    Arival: string,
    AircraftType: string
):FlightData {
  return {
    Image,
    Carrier,
    Routing,
    Stops,
    Flight,
    Departure,
    Arival,
    AircraftType,
  };
}

const rows = [
  createData(
<Image
  src="https://i.pinimg.com/originals/0e/35/61/0e35618c3b42ebf0eef8312bea410279.png"
  alt="Flight logo"
  width={20}
  height={20}
  style={{ borderRadius: "50%", marginRight: "20px" }}
/>,
    "PIA",
    "unknown",
    "Dubai",
    "PIA",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),
  createData(
<Image
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Etihad-airways-logo.svg/1200px-Etihad-airways-logo.svg.png"
  alt="Etihad Airways logo"
  width={20}
  height={20}
  style={{ borderRadius: "50%", marginRight: "20px" }}
/>,
    "Itahad",
    "unknown",
    "Dubai",
    "Itahad",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),
  createData(
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/850px-Emirates_logo.svg.png"
      height={20}
      width={20}
      style={{ borderRadius: "50%", marginRight: "20px" }}
      alt="nn"
    />,
    "Emirates",
    "unknown",
    "Dubai",
    "Emirates",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),

  createData(
    <Image
      src="https://i.pinimg.com/originals/0e/35/61/0e35618c3b42ebf0eef8312bea410279.png"
      
      height={20}
      width={20}
      style={{ borderRadius: "50%", marginRight: "20px" }}
      alt="nn"
     />,
    "PIA",
    "unknown",
    "Dubai",
    "PIA",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),
  createData(
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Etihad-airways-logo.svg/1200px-Etihad-airways-logo.svg.png"
      height={20}
      width={20}
      style={{ borderRadius: "50%", marginRight: "20px" }}
      alt="nn"
     />,
    "Itahad",
    "unknown",
    "Dubai",
    "Itahad",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),
  createData(
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/850px-Emirates_logo.svg.png"
      height={20}
      width={20}
      style={{ borderRadius: "50%", marginRight: "20px" }}
      alt="nn"
     />,
    "Emirates",
    "unknown",
    "Dubai",
    "Emirates",
    "2:00 pm",
    "2:00 am",
    "Unknown"
  ),
];
const CssTextField = styled(TextField)({
  maxHeight: "50px",
  margin: "0px 10px 0px 10px ",
  "& label": {
    display: "none",
  },
  "& label.Mui-focused": {
    display: "none",
    color: "black",
    borderRadius: "15px",
    maxHeight: "50px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
    borderRadius: "15px",
    maxHeight: "50px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderRadius: "15px",
      maxHeight: "50px",
    },
    "&:hover fieldset": {
      borderColor: "black",
      borderRadius: "15px",
      maxHeight: "50px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      borderRadius: "15px",
      maxHeight: "50px",
    },
  },
});
const AirSolutions:FC = () => {
  const [table, setTable] = useState<boolean>(false);
  const [flight, setFlight] = useState<string>("");
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setFlight(event.target.value);
  };
  const handleSearch = () => {
    setTable(true);
  };
  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Box
            sx={{ margin: "20px", background: "#fff", borderRadius: "15px" }}
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
                    borderRadius: "15px",
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
                    Air Solutions
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Image
                      src="https://img.freepik.com/free-vector/warehouse-workers-loading-boxes-into-airplane-cargo-aircraft-international-freight-flat-vector-illustration-global-logistic-transportation-delivery-concept-banner-landing-web-page_74855-26132.jpg?w=740&t=st=1680984696~exp=1680985296~hmac=72ff607b8399bbd2e8884c46c69175e1238f948abd36676c10f3fb3d45fc2254"
                      height={300}
                      width={300}
                      alt="nn"
                    />
                  </Box>
                  <Card
                    sx={{
                      marginTop: "10px",
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
                          <Typography>From</Typography>
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
                              placeholder="Origin Country"
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
                          <Typography sx={{ mt: "10px" }}>To:</Typography>
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
                              placeholder="Destination Country"
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
                            <Grid item sm={12} md={8} lg={8}>
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
                            Submit
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
                    borderRadius: "15px",
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
                            <StyledTableCell>Carrier</StyledTableCell>
                            <StyledTableCell align="right">
                              Routing
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Stops
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Flight
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Departure
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Arival
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Aircraft Type
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <StyledTableRow key={row.Carrier}>
                              <StyledTableCell component="th" scope="row">
                                <Box sx={{ display: "flex" }}>
                                  {row.Image}
                                  {row.Carrier}
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Routing}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Stops}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Flight}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Departure}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Arival}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.AircraftType}
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

export default AirSolutions;
