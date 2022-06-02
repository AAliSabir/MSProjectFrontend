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

const ITEM_INTEREST_HEIGHT = 48;
const ITEM_INTEREST_PADDING_TOP = 8;
const InterestMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_INTEREST_HEIGHT * 4.5 + ITEM_INTEREST_PADDING_TOP,
      width: 250,
    },
  },
};

// const interestNames = [
//   "Disaster Management",
//   "Health Services",
//   "Clean Water",
//   "Disaster Management",
//   "Health Services",
//   "Clean Water",
//   "Microfinance",
//   "Orphan Care Program",
//   "Education",
//   "Community Services",
// ];

const interestList = [
  { id: 1, name: "Disaster Management" },
  { id: 2, name: "Health Services" },
  { id: 3, name: "Clean Water" },
];

function getInterestStyles(name, interests, theme) {
  return {
    fontWeight:
      interests.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InterestSelect() {
  const theme = useTheme();
  const [interests, setInterests] = useState([]);

  const handleInterestsChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <MKTypography variant="body2" fontWeight="bold" mb={1}>
        Area of Interest
      </MKTypography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Areas</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={interests}
          onChange={handleInterestsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Areas" />}
          sx={{ padding: 1.5 }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={InterestMenuProps}
        >
          {interestList.map((nameData) => (
            <MenuItem
              key={nameData.id}
              value={nameData}
              style={getInterestStyles(nameData.name, interests, theme)}
            >
              {nameData.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
