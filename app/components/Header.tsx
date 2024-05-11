import { Box, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

const Header = () => {
  return (
    <Box
      height={"72px"}
      bgcolor={"primary.dark"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: 2,
      }}
    >
      <img src={"/admin/logo.svg"} />
      <Link
        to={"https://stoboi.damego.ru"}
        style={{ padding: "1%", textDecoration: "none" }}
      >
        <Typography
          color={"primary.contrastText"}
          variant={"h6"}
          sx={{ justifySelf: "end" }}
        >
          Выйти
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
