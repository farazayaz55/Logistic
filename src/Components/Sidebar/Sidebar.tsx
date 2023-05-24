
import { useEffect, useState, useRef, MouseEvent } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

// import { Link, useNavigate } from "react-router-dom";
import { tokens } from "./theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import { BiCurrentLocation } from "react-icons/bi";
import { GiCargoShip } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { SlPlane } from "react-icons/sl";
import { useRouter,NextRouter } from "next/router";

interface MenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  open?:boolean,
  setOpen?:React.Dispatch<React.SetStateAction<boolean>>
  }

const Item = ({ title, to, icon, selected, setSelected, open, setOpen }:MenuItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();
  const router:NextRouter=useRouter()
  const handleNavigate: React.MouseEventHandler<HTMLAnchorElement>  = (e) => {
    setSelected(title);
    router.push(`${to}`)
  };
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "#fff", backgroundColor: "transparent" }}
      onClick={handleNavigate}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
function Copyright() {
 
  return (
    <Typography
      variant="body2"
      color="#fff"
      align="center"
    >
      {"Copyright © "}
      {"LCT "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const MyProSidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const [modal, setModal] = useState(false);
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const childRef = useRef(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {});
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        backgroundColor: "#000",
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={"#00254d"}
        image={sidebarImage}
      >
        <Menu >
          <Box paddingLeft={"10px"} sx={{ marginTop: "20px" }}>
            <Box sx={{ color: "#fff", mb: "20px", ml: "10px" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                LCT
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Tracker And Solutions
              </Typography>
            </Box>

            <Item
              title="Tracking"
              to="/tracking"
              icon={<BiCurrentLocation size="25px" color="#fff" />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Sea Solution"
              to="/seasolutions"
              icon={<GiCargoShip size="30px" color="#fff" />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Air Solution"
              to="/airsolutions"
              icon={<SlPlane size="25px" color="#fff" />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Setting"
              to="/setting"
              icon={<FiSettings size="22px" color="#fff" />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
        <Box sx={{position: "absolute", bottom: "10px" , left: "20px"}}>
        <Copyright  />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
export { Item };
