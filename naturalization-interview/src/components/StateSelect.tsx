import { Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { getStateByZip, US_STATES } from "../app/utils/api";

const DarkAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#1E1E1E",
    color: "#E0E0E0",
    borderRadius: 8,
    border: "1px solid #333",
  },
  "& .MuiInputLabel-root": {
    color: "#B0B0B0",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#bf8a49",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bf8a49",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#888",
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#B0B0B0",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "#B0B0B0",
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "#1E1E1E",
    color: "#bf8a49",
  },
  "& .MuiAutocomplete-option": {
    '&[aria-selected="true"]': {
      backgroundColor: "#bf8a49",
    },
  },
}));

function StateSelect() {
  const [inputValue, setInputValue] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // If input looks like ZIP, fetch state
  useEffect(() => {
    const zipRegex = /^\d{5}$/;
    if (zipRegex.test(inputValue)) {
      getStateByZip(inputValue).then((state) => {
        if (state) setSelectedState(state);
      });
    }
  }, [inputValue]);

  return (
    <DarkAutocomplete<string, false, false, true>
      id="select-state-id"
      sx={{ width: 300 }}
      freeSolo
      options={US_STATES}
      value={selectedState}
      inputValue={inputValue}
      onChange={(_, newValue, reason) => {
        if (reason === "clear") {
          setSelectedState(null);
          setInputValue("");
        } else if (newValue) {
          setSelectedState(newValue);
          setInputValue(newValue);
        }
      }}
      onInputChange={(_, newInputValue) => {
        if (!selectedState) setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          color="default"
          label="Enter ZIP or Select State"
          variant="outlined"
        />
      )}
    />
  );
}
export default StateSelect;
