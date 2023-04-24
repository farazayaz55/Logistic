import * as React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg from "../assets/Images/bg.png";
import { User } from "../interfaces/User";
import { useRouter } from "next/router";
import { api } from "@/utils/trpc";
import { ErrorHandler } from "@/client_utils/ErrorHandler";

const theme = createTheme();
//  export default function
const SignUpSide: React.FC = () => {
  const router = useRouter();
  const signup = api.firstRouter.Signup.useMutation();
  const [msg, setMsg] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSignIn = () => {
    router.push("/signin");
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, password, cpassword } = user;

    if (!name || !email || !password || !cpassword) {
      setMsg("Please Fill All Fields");
      setErr(true);
    }
    else if (password != cpassword) {
      setMsg("Password and Confirm Password must be equal");
      setErr(true);
    } else {
      //send signup req
       signup.mutate({
        name,
        email,
        password,
      });

      if (signup.isError) {
        ErrorHandler(signup.error)
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {msg ? (
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    color: `${err ? "#FF0000" : "#2e8548"}`,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {msg}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                value={user.name}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                // autoComplete="current-password"
              />
              <TextField
                value={user.email}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                value={user.password}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                value={user.cpassword}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button onClick={handleSignIn} sx={{ textTransform: "none" }}>
                    {"Already have an account? SignIn"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignUpSide;
