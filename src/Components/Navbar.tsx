import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import logo from '../assets/Images/logoheader.png';
  const Navbar = () => {
    const router:NextRouter=useRouter()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    const handleLogout=async()=>{
      console.log("HANDLELOGOUT")
      const path=process.env.ENV=="local"?"http://localhost:6500/":"http://5.22.223.131:6500/"
      await signOut({ callbackUrl: path })
    }

     const handleSetting=()=>{
    router.push("/setting")
      setAnchorEl(null);
     }
    return (
      <Container
        sx={{ height: "65px", background: "#transparent",maxWidth:"100%" }}
      >
        <Grid container spacing={2}>
          <Grid item sm={6} md={4} lg={4}>
            {/* <Typography
              sx={{ color: "#000", size: "20px", fontWeight: "bold", mt: "10px" }}
            >
              LCT Tracker and Solution
            </Typography> */}
          </Grid>
          <Grid item sm={1} md={4} lg={4}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
              <Image src={logo.src} height={50} width={50} alt="nn" />
            </Box>
          </Grid>
          <Grid
            item
            sm={5}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "right",
              paddingBottom: "30px",
            }}
          >
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <Image
      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
               
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
                alt="nn"
              />
              <ArrowDropDown />
            </IconButton>
  
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
             
              <MenuItem onClick={handleSetting}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default Navbar;
  