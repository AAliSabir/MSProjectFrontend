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
import MKTypography from "components/MKTypography";

function Profile(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [areasOfWork, setAreasOfWork] = useState("");

  const interestList = [
    { id: 1, name: "Disaster Management" },
    { id: 2, name: "Health Services" },
    { id: 3, name: "Clean Water" },
  ];

  const provinceList = [
    { id: 1, name: "Punjab" },
    { id: 2, name: "Sindh" },
    { id: 3, name: "Balochistan" },
    { id: 4, name: "KPK" },
  ];

  const cityList = [
    { id: 1, name: "Karachi" },
    { id: 2, name: "Islamabad" },
    { id: 3, name: "Quetta" },
  ];

  useEffect(() => {
    console.log("on load");

    let entityId = window.localStorage.getItem("entityId");

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

          if (
            ngoObj.name === null ||
            ngoObj.registrationNumber === null ||
            ngoObj.about === null ||
            ngoObj.registrationDate === null ||
            ngoObj.contactNumber === null ||
            ngoObj.email === null ||
            ngoObj.address === null
          ) {
            handleTabChange(1);
          }

          if (ngoObj.name === null) ngoObj.name = "";
          setName(ngoObj.name);

          if (ngoObj.registrationNumber === null) ngoObj.registrationNumber = "";
          setRegistrationNumber(ngoObj.registrationNumber);

          if (ngoObj.about === null) ngoObj.about = "";
          setAbout(ngoObj.about);

          if (ngoObj.registrationDate === null)
            ngoObj.registrationDate = new Date().toISOString().slice(0, 10);
          setRegistrationDate(ngoObj.registrationDate);

          if (ngoObj.contactNumber === null) ngoObj.contactNumber = "";
          setContactNo(ngoObj.contactNumber);

          if (ngoObj.email === null) ngoObj.email = "";
          setEmail(ngoObj.email);

          if (ngoObj.address === null) ngoObj.address = "";
          setAddress(ngoObj.address);

          if (ngoObj.provinceId !== null) {
            const selectedProvince = provinceList.find((o) => o.id === ngoObj.provinceId);
            setProvince(selectedProvince.name);
          }

          if (ngoObj.cityId !== null) {
            const selectedCity = cityList.find((o) => o.id === ngoObj.cityId);
            setCity(selectedCity.name);
          }

          if (ngoObj.areasOfWork !== null) {
            const selectedWorkList = ngoObj.areasOfWork
              .split(",")
              .map((element) => Number(element));
            const areasOfWorkFiltered = interestList.filter((el) =>
              selectedWorkList.some((f) => f === el.id)
            );
            setAreasOfWork(areasOfWorkFiltered.map((a) => a.name).join(", "));
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
          <Grid container justifyContent="center">
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">{name}</MKTypography>
              </MKBox>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    About <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {about}
                    <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Registration Number <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {registrationNumber} <br />
                  </MKTypography>
                </Grid>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Registration Date <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {registrationDate} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Contact Number <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {contactNo} <br />
                  </MKTypography>
                </Grid>
                <Grid item xs={6} mt={3}>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Email <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {email} <br />
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Address <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {address}
                    <br />
                    {city} <br />
                    {province}
                  </MKTypography>
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={2}>
                <Grid item>
                  <MKTypography variant="body1" fontWeight="bold" color="text">
                    Area of Work <br />
                  </MKTypography>
                  <MKTypography variant="body2" fontWeight="light" color="text">
                    {areasOfWork} <br />
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
