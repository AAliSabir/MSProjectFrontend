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

const ITEM_SKILLS_HEIGHT = 48;
const ITEM_SKILLS_PADDING_TOP = 8;
const SkillsMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_SKILLS_HEIGHT * 4.5 + ITEM_SKILLS_PADDING_TOP,
      width: 250,
    },
  },
};

const skillsList = [
  { id: 1, name: "Leadership" },
  { id: 2, name: "Event Management" },
  { id: 3, name: "Public Speaking" },
];

function getSkillsStyles(name, skills, theme) {
  return {
    fontWeight:
      skills.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SkillsSelect() {
  const theme = useTheme();
  const [skills, setSkills] = useState([]);

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <MKTypography variant="body2" fontWeight="bold" mb={1}>
        Skills
      </MKTypography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={skills}
          onChange={handleSkillsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Skill" />}
          sx={{ padding: 1.5 }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={SkillsMenuProps}
        >
          {skillsList.map((nameData) => (
            <MenuItem
              key={nameData.id}
              value={nameData}
              style={getSkillsStyles(nameData.name, skills, theme)}
            >
              {nameData.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
