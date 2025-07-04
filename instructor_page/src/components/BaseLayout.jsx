import React from "react";
import AvatarList from "./AvatarList";
import Box from "@mui/material/Box";

const BaseLayout = ({ children }) => {
  return (
    <>
      <AvatarList />
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)", // assuming AppBar height is 64px
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          pt: 5,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default BaseLayout;
