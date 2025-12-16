"use client";

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingState: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Cargando usuarios...
      </Typography>
    </Box>
  );
};

export default LoadingState;