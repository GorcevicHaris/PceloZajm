import React, { useContext, useState } from "react";
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
import { Context } from "./Context";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const Sidebar = () => {
  const { role } = useContext(Context);

  console.log(role, "role");
  const menuItems = [
    role == "admin"
      ? {
          text: "ManageOrder",
          icon: <AdminPanelSettingsIcon />,
          Link: "/manageOrder",
        }
      : null,
    { text: "Dashboard", icon: <DashboardIcon />, Link: "/dashboard" },
    { text: "User Profile", icon: <PersonIcon />, Link: "/profile" },
    role === "admin"
      ? { text: "Admin", icon: <TableChartIcon />, Link: "/hiveAdmin" }
      : null,
    role === "admin"
      ? { text: "Hives", icon: <TypographyIcon />, Link: "/hivesEditDelete" }
      : null,
    role === "admin"
      ? { text: "InsertUser", icon: <TypographyIcon />, Link: "/userForm" }
      : null,
    role === "admin"
      ? { text: "Users", icon: <PersonIcon />, Link: "/users" }
      : null,
    role !== "admin"
      ? { text: "OrderHive", icon: <MapIcon />, Link: "/orderHive" }
      : null,
  ].filter(Boolean); // Uklanja sve `false`, `null` ili `undefined` vrednosti
  if (!role) {
    return "";
  }
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
