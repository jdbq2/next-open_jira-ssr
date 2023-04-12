import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React, { useContext } from "react";
import { UIContext } from "@/context/ui";
import Link from "next/link";

export const NavBar = () => {
  const { openMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Open Jira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
