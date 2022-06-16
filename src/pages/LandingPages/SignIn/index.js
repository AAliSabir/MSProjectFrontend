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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
//import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
//import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  function signInClick() {
    //window.localStorage.setItem('registrationId', 15)

    //navigate(`/pages/landing-pages/personalization`);

    fetch("/api/Registration/SignIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RegistrationId: id,
        Password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        if (data && data.status === "1") {
          let message = data.message;
          let profileType = message.split(",")[1];

          if (data.otherInformation !== null) {
            window.localStorage.setItem("profileType", profileType);
            window.localStorage.setItem("entityId", data.otherInformation.id);
            window.localStorage.setItem("registrationId", id);

            if (profileType == 1) {
              navigate(`/pages/landing-pages/personalization`);
            } else if (profileType == 2) {
              navigate(`/pages/landing-pages/ngo`);
            }
          }
        }

        // if(data.error) {
        //     M.toast({html: data.error, classes: '#c62828 red darken-3'})
        // }
        // else {
        //     sessionStorage.setItem('jwt', data.token)
        //     sessionStorage.setItem('user', JSON.stringify(data.user))

        //     dispatch({type: "USER", payload: data.user})
        //     M.toast({html: 'Signed-in Successfully', classes: '#43a047 green darken-1'})
        //     history.push('/')

        // window.localStorage.setItem('registrationId', 15)
        //navigate(`/pages/landing-pages/personalization`);
        // }
      })
      .catch((err) => {
        console.log(err);
      });

    //navigate(`/pages/landing-pages/personalization`);
  }

  return (
    <>
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
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Registration Id"
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      onChange={(e) => {
                        setPwd(e.target.value);
                      }}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" onClick={signInClick} fullWidth>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
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

export default SignInBasic;
