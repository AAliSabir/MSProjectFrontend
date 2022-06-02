import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MKTypography from "components/MKTypography";

const ITEM_AVAILAIBILITY_HEIGHT = 48;
const ITEM_AVAILAIBILITY_PADDING_TOP = 8;
const AvailaibilityMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_AVAILAIBILITY_HEIGHT * 4.5 + ITEM_AVAILAIBILITY_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Full Time",
//   "Part Time",
//   "Monday",
//   "Tuseday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

const availabilityList = [
  { id: 1, name: "Full Time" },
  { id: 2, name: "Part Time" },
  { id: 3, name: "Monday" },
];

function getAvailabilityStyles(name, availabilities, theme) {
  return {
    fontWeight:
      availabilities.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AvailabilitySelect() {
  const theme = useTheme();
  const [availabilities, setAvailabilities] = useState([]);

  const handleAvailabilitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailabilities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <MKTypography variant="body2" fontWeight="bold" mb={1}>
        Availability
      </MKTypography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Availability</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={availabilities}
          onChange={handleAvailabilitiesChange}
          input={<OutlinedInput id="select-multiple-chip" label="Availability" />}
          sx={{ padding: 1.5 }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={AvailaibilityMenuProps}
        >
          {availabilityList.map((nameData) => (
            <MenuItem
              key={nameData.id}
              value={nameData}
              style={getAvailabilityStyles(nameData.name, availabilities, theme)}
            >
              {nameData.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
