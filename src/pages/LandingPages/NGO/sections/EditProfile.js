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

const workList = [
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

function EditProfile(props) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => setName(e.target.value);

  const [about, setAbout] = useState("");
  const handleAboutChange = (e) => setAbout(e.target.value);

  const [registrationNumber, setRegistrationNumber] = useState("");
  const handleRegistrationNumberChange = (e) => setRegistrationNumber(e.target.value);

  const [registrationDate, setRegistrationDate] = useState(new Date().toISOString().slice(0, 10));
  const handleRegistrationDateChange = (e) => setRegistrationDate(e.target.value);

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);

  const [contactNumber, setContactNumber] = useState("");
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);

  const [address, setAddress] = useState("");
  const handleAddressChange = (e) => setAddress(e.target.value);

  const [province, setProvince] = useState("");
  const handleProvinceChange = (e) => setProvince(e.target.value);

  const [city, setCity] = useState("");
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const [checked, setChecked] = useState(true);
  const handleChecked = () => setChecked(!checked);

  const theme = useTheme();

  const [areasOfWork, setAreasOfWork] = useState([]);
  const handleAreasOfWorkChange = (event) => {
    const {
      target: { value },
    } = event;
    setAreasOfWork(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    console.log("on load");

    let entityId = window.localStorage.getItem("entityId");
    entityId = 1;
    fetch("/api/NGO/GetNGOById?ngoId=" + entityId, {
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
          const ngoObj = response.otherInformation;

          if (ngoObj.name === null) ngoObj.name = "";
          if (ngoObj.registrationDate === null)
            ngoObj.registrationDate = new Date().toISOString().slice(0, 10);
          if (ngoObj.registrationNumber === null) ngoObj.registrationNumber = "";
          if (ngoObj.contactNo === null) ngoObj.contactNo = "";
          if (ngoObj.email === null) ngoObj.email = "";
          if (ngoObj.address === null) ngoObj.address = "";

          if (ngoObj.provinceId === null) ngoObj.provinceId = 0;
          if (ngoObj.cityId === null) ngoObj.cityId = 0;

          if (ngoObj.about === null) ngoObj.about = "";

          if (ngoObj.areasOfWork !== null) {
            const selectedWorks = ngoObj.areasOfWork.split(",").map((element) => Number(element));

            const worksFiltered = workList.filter((el) => selectedWorks.some((f) => f === el.id));

            setAreasOfWork(worksFiltered);
          }

          setName(ngoObj.name);
          setRegistrationNumber(ngoObj.registrationNumber);
          setAbout(ngoObj.about);
          setRegistrationDate(ngoObj.registrationDate);
          setEmail(ngoObj.email);
          setContactNumber(ngoObj.contactNo);
          setAddress(ngoObj.address);
          setProvince(ngoObj.provinceId);
          setCity(ngoObj.cityId);
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
    const selectedWorks = areasOfWork.map((a) => a.id).join(",");

    let entityId = window.localStorage.getItem("entityId");
    entityId = 1;
    fetch("/api/NGO/UpdateNGO", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        id: entityId,
        registrationId: null,
        name,
        email,
        contactNumber,
        registrationNumber,
        registrationDate,
        about,
        address,
        provinceId: province,
        cityId: city,
        areasOfWork: selectedWorks,
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
            NGO Details
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
                    label="About"
                    value={about}
                    onChange={handleAboutChange}
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
                    label="Registration Date"
                    value={registrationDate}
                    onChange={handleRegistrationDateChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Registration Number"
                    value={registrationNumber}
                    onChange={handleRegistrationNumberChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Contact #"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid item xs={8}>
                  <MKInput
                    variant="standard"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
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
                  <MKInput
                    variant="standard"
                    label="About your work"
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
                    Area of Work
                  </MKTypography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Areas</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={areasOfWork}
                      onChange={handleAreasOfWorkChange}
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
                      {workList.map((nameData) => (
                        <MenuItem
                          key={nameData.id}
                          value={nameData}
                          style={getInterestStyles(nameData.name, areasOfWork, theme)}
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
