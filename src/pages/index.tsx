import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import bg from "../assets/Images/bg.png";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import bg from "../assets/Images/bg.png";
import logo from "../assets/Images/logo.png";
import { signInForm } from "../interfaces/index";
import { api } from '../utils/trpc';


interface SignInSideProps {
  bgSrc: string;
  logoSrc: string;
}

const SignInSide: React.FC<SignInSideProps> = ({ bgSrc, logoSrc }) => {
  const router = useRouter();

  const hello = api.firstRouter.hello.useQuery({ text: 'client' });



  const [msg, setMsg] = useState<string>(""); // state to print message
  const [err, setErr] = useState<boolean>(false);
  const [user, setUser] = useState<signInForm>({
    email: "",
    password: "",
  });
  useEffect(() => {});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const resp = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
      //callback can be given here as well
    }).then((payload) => {
      if (payload?.status === 200) {
        setErr(false);
        setMsg("Login Successfully");
        router.push('/seasolutions')
      } else if (payload?.status === 401) {
        setErr(true);
        setMsg("Login failed!!");
      }
    });
  };
  const handleSignUp = () => {
    router.push("/signup");
  };
  const handleForgetPass = () => {
    // navigate("#");
    router.push("#");
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "none",
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            borderRadius: "15px",
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ffffffc8",
            width: "40%",
            padding: "30px",
            height: "500px",
          }}
        >
          <Image src={logo} alt="Logo" height={100} />

          {msg ? (
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ color: `${err ? "#FF0000" : "#2e8548"}` }}>
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
            />
            <br />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <br />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              type="submit"
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
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;

export const getServerSideProps: GetServerSideProps<
  SignInSideProps
> = async () => {
  const bgSrc = "/bg.png"; // URL to the background image
  const logoSrc = "/logo.png"; // URL to the logo image

  return {
    props: {
      bgSrc,
      logoSrc,
    },
  };
};
