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

import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// @mui material components
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import CustomNavbar from "examples/Navbars/CustomNavbar/index";

// Personalization page sections
import EditProfile from "pages/LandingPages/NGO/sections/EditProfile";
import Profile from "pages/LandingPages/NGO/sections/Profile";
import Footer from "pages/LandingPages/NGO/sections/Footer";

// Routes
import routes from "routes";
import customNavbarRoutes from "customNavbarRoutes";

// Images
import bgImage from "assets/images/city-profile.jpg";
import NGOVolunteer from "pages/LandingPages/NGO/sections/NGOVolunteer";
import NGOProject from "pages/LandingPages/NGO/sections/NGOProject";

function Personalization() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => {
    debugger;

    setActiveTab(newValue);
  };

  const handleTabChangeOrNot = (tabValue) => {
    debugger;

    setActiveTab(tabValue);
  };
  return (
    <>
      {/* <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
      /> */}

      <CustomNavbar routes={customNavbarRoutes} transparent light />

      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={8}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ mx: "auto", textAlign: "center" }}
            >
              <MKTypography
                variant="h1"
                color="white"
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Welcome to your profile !
              </MKTypography>
            </Grid>
          </Container>
        </MKBox>

        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Container>
            <Grid container item justifyContent="center" xs={12} lg={4} mx="auto">
              <AppBar position="static">
                <Tabs value={activeTab} onChange={handleTabType}>
                  <Tab label="My Profile" />
                  <Tab label="Edit Profile" />
                  <Tab label="Volunteers" />
                  <Tab label="Projects" />
                </Tabs>
              </AppBar>
            </Grid>
          </Container>
        </Card>
        {activeTab === 0 && (
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Profile handleTabChangeOrNot={handleTabChangeOrNot} />
          </Card>
        )}
        {activeTab === 1 && (
          <Card
            display={activeTab === 1 ? "none" : "block"}
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <EditProfile handleTabChangeOrNot={handleTabChangeOrNot} />
          </Card>
        )}
        {activeTab === 2 && (
          <Card
            display={activeTab === 2 ? "none" : "block"}
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <NGOVolunteer handleTabChangeOrNot={handleTabChangeOrNot} />
          </Card>
        )}
        {activeTab === 3 && (
          <Card
            display={activeTab === 2 ? "none" : "block"}
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <NGOProject handleTabChangeOrNot={handleTabChangeOrNot} />
          </Card>
        )}
        <Footer />
      </MKBox>
    </>
  );
}

export default Personalization;
