import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { RadioGroup, Radio, FormControl, FormControlLabel } from "@mui/material";

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

function EditProfile(props) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => setName(e.target.value);

  const [cnic, setCnic] = useState("");
  const handleCnicChange = (e) => setCnic(e.target.value);

  const [dateOfBirth, setdateOfBirth] = useState(new Date().toISOString().slice(0, 10));
  const handledateOfBirthChange = (e) => setdateOfBirth(e.target.value);

  const [gender, setGender] = useState(1);
  const handleGenderChange = (e) => setGender(e.target.value);

  const [contactNo, setContactNo] = useState("");
  const handleContactNoChange = (e) => setContactNo(e.target.value);

  const [address, setAddress] = useState("");
  const handleAddressChange = (e) => setAddress(e.target.value);

  const [province, setProvince] = useState(0);
  const handleProvinceChange = (e) => setProvince(e.target.value);

  const [city, setCity] = useState(0);
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const [education, setEducation] = useState(0);
  const handleEducationChange = (e) => setEducation(e.target.value);

  const [about, setAbout] = useState("");
  const handleAboutChange = (e) => setAbout(e.target.value);

  const [checked, setChecked] = useState(true);
  const handleChecked = () => setChecked(!checked);

  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleInterestsChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleAvailabilitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailabilities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    console.log("on load");

    let entityId = window.localStorage.getItem("entityId");

    fetch("/api/Volunteer/GetVolunteerById?volunteerId=" + entityId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (response.status === "1") {
          const volunteerObj = response.otherInformation;

          if (volunteerObj.cnic === null) volunteerObj.cnic = "";
          if (volunteerObj.dateOfBirth === null)
            volunteerObj.dateOfBirth = new Date().toISOString().slice(0, 10);
          if (volunteerObj.gender === null) volunteerObj.gender = 1;
          if (volunteerObj.contactNo === null) volunteerObj.contactNo = "";
          if (volunteerObj.address === null) volunteerObj.address = "";
          if (volunteerObj.provinceId === null) volunteerObj.provinceId = 0;
          if (volunteerObj.cityId === null) volunteerObj.cityId = 0;
          if (volunteerObj.educationId === null) volunteerObj.educationId = 0;
          if (volunteerObj.about === null) volunteerObj.about = "";

          if (volunteerObj.skills !== null) {
            const selectedSkills = volunteerObj.skills.split(",").map((element) => Number(element));
            const skillsFiltered = skillsList.filter((el) =>
              selectedSkills.some((f) => f === el.id)
            );
            setSkills(skillsFiltered);
          }

          if (volunteerObj.areasOfInterest !== null) {
            const selectedInterests = volunteerObj.areasOfInterest
              .split(",")
              .map((element) => Number(element));

            const interestsFiltered = interestList.filter((el) =>
              selectedInterests.some((f) => f === el.id)
            );

            setInterests(interestsFiltered);
          }

          if (volunteerObj.availability !== null) {
            const selectedAvailabilities = volunteerObj.availability
              .split(",")
              .map((element) => Number(element));

            const availabilitiesFiltered = availabilityList.filter((el) =>
              selectedAvailabilities.some((f) => f === el.id)
            );
            setAvailabilities(availabilitiesFiltered);
          }

          setName(volunteerObj.name);
          setCnic(volunteerObj.cnic);
          setdateOfBirth(volunteerObj.dateOfBirth);
          setGender(volunteerObj.gender);
          setContactNo(volunteerObj.contactNo);
          setAddress(volunteerObj.address);
          setProvince(volunteerObj.provinceId);
          setCity(volunteerObj.cityId);
          setEducation(volunteerObj.educationId);
          setAbout(volunteerObj.about);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabChange = async (tabValue) => {
    debugger;

    await props.handleTabChangeOrNot(tabValue);
  };

  const submitForm = () => {
    const selectedSkills = skills.map((a) => a.id).join(",");
    const selectedInterests = interests.map((a) => a.id).join(",");
    const selectedAvailabilities = availabilities.map((a) => a.id).join(",");

    let entityId = window.localStorage.getItem("entityId");

    fetch("/api/Volunteer/UpdateVolunteer", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        id: entityId,
        name,
        dateOfBirth,
        cnic,
        contactNo,
        email: null,
        gender,
        address,
        provinceId: province,
        cityId: city,
        educationId: education,
        about,
        skills: selectedSkills,
        areasOfInterest: selectedInterests,
        availability: selectedAvailabilities,
        isIndependent: null,
        ngoId: null,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        handleTabChange(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
          <MKTypography variant="h3" mb={1}>
            Personal Information
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autocomplete="off">
            <MKBox p={3} justifyContent="center">
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Full Name"
                    value={name}
                    onChange={handleNameChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="CNIC #"
                    value={cnic}
                    onChange={handleCnicChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    type="date"
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={handledateOfBirthChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKTypography variant="body2" fontWeight="bold" mb={1}>
                    Gender
                  </MKTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={<MKTypography variant="button">Male</MKTypography>}
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={<MKTypography variant="button">Female</MKTypography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Mobile #"
                    value={contactNo}
                    onChange={handleContactNoChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Address"
                    value={address}
                    onChange={handleAddressChange}
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8} mx={2}>
                  <MKTypography variant="body2" fontWeight="bold" mb={1}>
                    Province
                  </MKTypography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={province}
                      onChange={handleProvinceChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={<MKTypography variant="button">Punjab</MKTypography>}
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={<MKTypography variant="button">Sindh</MKTypography>}
                      />
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={<MKTypography variant="button">Balochistan</MKTypography>}
                      />
                      <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label={<MKTypography variant="button">KPK</MKTypography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8} mx={2}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>City</InputLabel>
                    <Select
                      value={city}
                      sx={{ padding: 1.5 }}
                      label="City"
                      autoWidth
                      onChange={handleCityChange}
                    >
                      <MenuItem value="">
                        <em>Other</em>
                      </MenuItem>
                      <MenuItem value={1}>Karachi</MenuItem>
                      <MenuItem value={2}>Islamabad</MenuItem>
                      <MenuItem value={3}>Quetta</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKTypography variant="body2" fontWeight="bold" mb={1}>
                    Education
                  </MKTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={education}
                      onChange={handleEducationChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={<MKTypography variant="button">Matric</MKTypography>}
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={<MKTypography variant="button">Intermediate</MKTypography>}
                      />
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={<MKTypography variant="button">Bachelors</MKTypography>}
                      />
                      <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label={<MKTypography variant="button">Masters</MKTypography>}
                      />
                      <FormControlLabel
                        value={5}
                        control={<Radio />}
                        label={<MKTypography variant="button">Ph. D</MKTypography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>

        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
          <MKTypography variant="h3" mb={1}>
            Volunteer Information
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autocomplete="off">
            <MKBox p={3} justifyContent="center">
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="About your contribution"
                    value={about}
                    onChange={handleAboutChange}
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
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
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
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
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
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
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>

        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autocomplete="off">
            <MKBox p={3} justifyContent="center">
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={6} alignItems="center" ml={-1}>
                  <Switch checked={checked} onChange={handleChecked} />
                  <MKTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    ml={-1}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                    onClick={handleChecked}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MKTypography>
                  <MKTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                  >
                    Terms and Conditions
                  </MKTypography>
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                <Grid container item justifyContent="center" xs={3} my={2}>
                  <MKButton
                    type="button"
                    onClick={submitForm}
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Submit
                  </MKButton>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default EditProfile;
