import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

import MapsAutocomplete from "@/Components/MapsAutoComplete";
import { api } from "@/utils/trpc";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import { MyProSidebarProvider } from "../Components/Sidebar/sidebarContext";
import ProtectedRoute from "../client_utils/protectRoute";

interface Duration {
  label: string;
  value: string;
}

interface freightINF{
  provider:string,
  provider_image_75:string,
  amount:string,
  currency:string,
  estimated_days:string,
  duration_terms:string
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

const SeaSolutions: React.FC = () => {
  const mutateFn = api.seaSolutionsRouter.getAllPossibleFreights.useMutation();

  const [table, setTable] = useState<boolean>(false);
  const [combobox, setCombobox] = useState<string>("");

  const durations: Duration[] = [
    { label: "1 Week", value: "1Week" },
    { label: "2 Weeks", value: "2Weeks" },
    { label: "3 Weeks", value: "3Weeks" },
    { label: "4 Weeks", value: "4Weeks" },
  ];
  const handleComboValue = (e: React.ChangeEvent, value: string) => {
    console.log(value);
    setCombobox(value);
  };

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const [msg, setMsg] = useState<string>("");

  const [destCity, setDestCity] = useState<string>("");
  const [destCountry, setDestCountry] = useState<string>("");
  const [destZipCode, setDestZipCode] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);

  const closeModal = (): void => {
    setModal(false);
  };

  useEffect(() => console.log(modal), [modal]);

  const handleSearch = () => {
    setTable(true);
    console.log(city, country, zipCode, destCity, destCountry, destZipCode);
    mutateFn.mutate(
      {
        source: {
          city: city,
          country: country,
          zip: zipCode,
        },
        destination: {
          city: destCity,
          country: destCountry,
          zip: destZipCode,
        },
      },
      {
        onSuccess: (data) => {
          setModal(true);
        },
      }
    );
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
                        <Grid item xs={6} sx={{ display: "block" }}></Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: "#2e8548" }}>
                            {" "}
                            {msg}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={10} lg={10}>
                          <Typography>Origin</Typography>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              borderRadius: "10px",
                              marginTop: "5px",
                            }}
                          >
                            <MapsAutocomplete
                              city={city}
                              setCity={setCity}
                              setCountry={setCountry}
                              country={country}
                              setZipCode={setZipCode}
                              zipCode={zipCode}
                              setMsg={setMsg}
                            />
                          </Box>
                          <Typography sx={{ mt: "10px" }}>
                            Destination:
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              borderRadius: "10px",
                              marginTop: "5px",
                            }}
                          >
                            <MapsAutocomplete
                              city={destCity}
                              setCity={setDestCity}
                              setCountry={setDestCountry}
                              country={destCountry}
                              setZipCode={setDestZipCode}
                              zipCode={destZipCode}
                              setMsg={setMsg}
                            />
                          </Box>
                          {/* <Typography sx={{ mt: "10px" }}>On:</Typography>
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
                          </Grid> */}
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
                <table
                  className="table"
                  style={{ width: "100%", marginBottom: "30px" }}
                >
                  {/* head */}
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>Provider </th>
                      <th>Logo</th>
                      <th>Amount</th>
                      <th>Currency</th>
                      <th>Estimated Days </th>
                      <th>Duration Terms </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {mutateFn.data?.map((freight: freightINF) => {
                      return (
                        <>
                          <tr>
                            <th>
                              <label>
                                <input type="checkbox" className="checkbox" />
                              </label>
                            </th>
                            <td>{freight.provider}</td>
                            <td>
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <Image
                                    src={freight.provider_image_75}
                                    height={20}
                                    width={20}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                            </td>

                            <td>{freight.amount}</td>
                            <td>{freight.currency}</td>
                            <td>{freight.estimated_days}</td>
                            <td>{freight.duration_terms}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
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

export default ProtectedRoute(SeaSolutions);
