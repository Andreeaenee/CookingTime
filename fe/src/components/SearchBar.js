import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      sx={{ marginRight: 2 }}
      label="Search"
      variant="outlined"
      size="small"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
