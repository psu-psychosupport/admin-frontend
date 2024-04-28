import {Box, colors, Typography} from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

const Header = () => {
  return (
    <Box
      height={"72px"}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        borderBottom: 2,
        borderColor: colors.grey[200]
      }}
    >
      <Link
        to={""}
        style={{ padding: "1%", textDecoration: "none", color: "inherit" }}
      >
        <Typography variant={"h6"} sx={{ justifySelf: "end" }} >
          Основной сайт{" "}
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
