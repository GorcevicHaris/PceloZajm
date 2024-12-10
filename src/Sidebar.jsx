import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import TypographyIcon from "@mui/icons-material/TextFields";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, Link: "/dashboard" },
    { text: "User Profile", icon: <PersonIcon />, Link: "/profile" },
    { text: "Admin", icon: <TableChartIcon />, Link: "/hiveAdmin" },
    { text: "Hives", icon: <TypographyIcon />, Link: "/hivesEditDelete" },
    { text: "Maps", icon: <MapIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.Link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText style={{ color: "black" }} primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
