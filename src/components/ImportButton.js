import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

const ImportButton = ({ onSubmit, isImporting }) => {
  return (
    <Button
      variant="outlined"
      sx={{ ml: 1 }}
      component="label"
      disabled={isImporting}
    >
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onSubmit}
        accept=".csv"
      />
      {isImporting ? (
        <CircularProgress size={20} />
      ) : (
        <ArrowDownward fontSize="small" />
      )}
      <Box component="span" ml={1}>
        Importar
      </Box>
    </Button>
  );
};

export default ImportButton;
