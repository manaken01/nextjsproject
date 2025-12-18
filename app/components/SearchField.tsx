"use client";

import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchFieldProps {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
}

export const SearchField = ({
  searchValue,
  onSearchValueChange,
}: ISearchFieldProps) => {
  return (
    <Box sx={{ width: "100%", mb: 3, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar usuario por nombre..."
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />
    </Box>
  );
};
