/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
// import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { RadioGroup, Radio, FormControl, FormControlLabel } from "@mui/material";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignUpBasic() {
  const navigate = useNavigate();

  const [name, setNameChange] = useState("");
  const handleNameChange = (e) => setNameChange(e.target.value);

  const [registrationId, setRegistrationIdChange] = useState("");
  const handleRegistrationIdChange = (e) => setRegistrationIdChange(e.target.value);

  const [password, setPasswordChange] = useState("");
  const handlePasswordChange = (e) => setPasswordChange(e.target.value);

  const [registrationType, setRegistrationType] = useState(1);
  const handleRegistrationTypeChange = (e) => setRegistrationType(e.target.value);

  function signUpClick() {
    fetch("/api/Registration/SignUp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name,
        registrationId,
        password,
        registrationType,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        /* eslint-disable no-console */
        console.log(response);
        /* eslint-enable no-console */
        if (response.status === "1") {
          /* eslint-disable no-console */
          console.log("Success");
          /* eslint-enable no-console */
          navigate(`/pages/sign-in`);
        } else {
          /* eslint-disable no-console */
          console.log("Error");
          console.log(response.message);
          /* eslint-enable no-console */
        }
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */
      });
  }
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign Up
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Name"
                      value={name}
                      onChange={handleNameChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Id"
                      value={registrationId}
                      onChange={handleRegistrationIdChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKTypography variant="body2" fontWeight="bold" mb={1}>
                      Profile Type
                    </MKTypography>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={registrationType}
                        onChange={handleRegistrationTypeChange}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={<MKTypography variant="button">Volunteer</MKTypography>}
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label={<MKTypography variant="button">NGO</MKTypography>}
                        />
                      </RadioGroup>
                    </FormControl>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" onClick={signUpClick} fullWidth>
                      sign up
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignUpBasic;
