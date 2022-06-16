/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Images
import profilePicture from "assets/images/bruce-mars.jpg";

function Profile(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [availabilities, setAvailabilities] = useState("");

  const skillsList = [
    { id: 1, name: "Leadership" },
    { id: 2, name: "Event Management" },
    { id: 3, name: "Public Speaking" },
  ];

  const interestList = [
    { id: 1, name: "Disaster Management" },
    { id: 2, name: "Health Services" },
    { id: 3, name: "Clean Water" },
  ];

  const availabilityList = [
    { id: 1, name: "Full Time" },
    { id: 2, name: "Part Time" },
    { id: 3, name: "Monday" },
  ];

  const provinceList = [
    { id: 1, name: "Punjab" },
    { id: 2, name: "Sindh" },
    { id: 3, name: "Balochistan" },
    { id: 4, name: "KPK" },
  ];

  const cityList = [
    { id: 1, name: "Karachi" },
    { id: 2, name: "Lahore" },
    { id: 3, name: "Quetta" },
    { id: 4, name: "Peshawar" },
  ];

  const educationList = [
    { id: 1, name: "Matric" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Bachelors" },
    { id: 4, name: "Masters" },
    { id: 5, name: "Ph. D" },
  ];

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

          if (
            volunteerObj.name === null ||
            volunteerObj.about === null ||
            volunteerObj.cnic === null ||
            volunteerObj.contactNo === null ||
            volunteerObj.address === null
          ) {
            handleTabChange(1);
          }

          if (volunteerObj.name === null) volunteerObj.name = "";
          setName(volunteerObj.name);

          if (volunteerObj.about === null) volunteerObj.about = "";
          setAbout(volunteerObj.about);

          if (volunteerObj.cnic === null) volunteerObj.cnic = "";
          setCnic(volunteerObj.cnic);

          if (volunteerObj.dateOfBirth === null)
            volunteerObj.dateOfBirth = new Date().toISOString().slice(0, 10);
          setdateOfBirth(volunteerObj.dateOfBirth);

          if (volunteerObj.gender !== null) {
            if (volunteerObj.gender === 1) {
              setGender("Male");
            } else if (volunteerObj.gender === 2) {
              setGender("Female");
            }
          }

          if (volunteerObj.contactNo === null) volunteerObj.contactNo = "";
          setContactNo(volunteerObj.contactNo);

          if (volunteerObj.address === null) volunteerObj.address = "";
          setAddress(volunteerObj.address);

          if (volunteerObj.provinceId !== null) {
            const selectedProvince = provinceList.find((o) => o.id === volunteerObj.provinceId);
            setProvince(selectedProvince.name);
          }

          if (volunteerObj.cityId !== null) {
            const selectedCity = cityList.find((o) => o.id === volunteerObj.cityId);
            setCity(selectedCity.name);
          }

          if (volunteerObj.educationId !== null) {
            const selectedEducation = educationList.find((o) => o.id === volunteerObj.educationId);
            setEducation(selectedEducation.name);
          }

          if (volunteerObj.skills !== null) {
            const selectedSkills = volunteerObj.skills.split(",").map((element) => Number(element));
            const skillsFiltered = skillsList.filter((el) =>
              selectedSkills.some((f) => f === el.id)
            );
            setSkills(skillsFiltered.map((a) => a.name).join(", "));
          }

          if (volunteerObj.areasOfInterest !== null) {
            const selectedInterests = volunteerObj.areasOfInterest
              .split(",")
              .map((element) => Number(element));
            const interestsFiltered = interestList.filter((el) =>
              selectedInterests.some((f) => f === el.id)
            );
            setInterests(interestsFiltered.map((a) => a.name).join(", "));
          }

          if (volunteerObj.availability !== null) {
            const selectedAvailabilities = volunteerObj.availability
              .split(",")
              .map((element) => Number(element));
            const availabilitiesFiltered = availabilityList.filter((el) =>
              selectedAvailabilities.some((f) => f === el.id)
            );
            setAvailabilities(availabilitiesFiltered.map((a) => a.name).join(", "));
          }
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

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">{name}</MKTypography>
              </MKBox>
              <MKTypography variant="body1" fontWeight="bold" color="text">
                About <br />
              </MKTypography>
              <MKTypography variant="body2" fontWeight="light" color="text">
                {about} <br />
              </MKTypography>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    CNIC Number <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {cnic} <br />
                  </MKTypography>
                </Grid>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Date of Birth <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {dateOfBirth} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Gender <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {gender} <br />
                  </MKTypography>
                </Grid>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Contact Number <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {contactNo} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Education <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {education} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Address <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {address} <br />
                    {city} <br />
                    {province}
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Skills <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {skills} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Area of Interests <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {interests} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Availability <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {availabilities} <br />
                  </MKTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
