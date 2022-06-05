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

import MKBox from "components/MKBox";

// Material Kit 2 React examples
import CustomNavbar from "examples/Navbars/CustomNavbar/index";

// Personalization page sections
import EditProfile from "pages/LandingPages/Personalization/sections/EditProfile";
import Profile from "pages/LandingPages/Personalization/sections/Profile";
import Footer from "pages/LandingPages/Personalization/sections/Footer";

// Routes
import routes from "routes";
import customNavbarRoutes from "customNavbarRoutes";

// Images
import bgImage from "assets/images/city-profile.jpg";

function Personalization() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => setActiveTab(newValue);
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
        />
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
                </Tabs>
              </AppBar>
            </Grid>
          </Container>
        </Card>
        {!activeTab && (
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: 10,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Profile />
          </Card>
        )}
        {activeTab && (
          <Card
            display={activeTab === 0 ? "block" : "none"}
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: 10,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <EditProfile />
          </Card>
        )}
        <Footer />
      </MKBox>
    </>
  );
}

export default Personalization;
