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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React examples
import CustomNavbar from "examples/Navbars/CustomNavbar/index";


// Personalization page sections
import EditProfile from "pages/LandingPages/NGOS/sections/EditProfile";
import Profile from "pages/LandingPages/NGOS/sections/Profile";
import Footer from "pages/LandingPages/NGOS/sections/Footer";

// Routes
import routes from "routes";
import customNavbarRoutes from "customNavbarRoutes"
import SideBarMenu from "../../../layouts/side-navbar/index";


// Images
import bgImage from "assets/images/city-profile.jpg";

function NGOS() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => setActiveTab(newValue);
  const [currentTab, setCurrentTab] = useState('Home');


  const handleTabClicked = (e) => {
    try {
      var active = document.querySelectorAll(".pro-menu-item.active");
      if(active && active.length > 0) {
        
        for (var item=0;item<active.length;item++) {
          if(active[item] !== null && active[item].classList !== null && active[item].classList !== undefined) {
            active[item].classList.remove("active");
          }
        }
      }
      e.currentTarget.classList.add('active')
      setCurrentTab(e.currentTarget.innerText)
    }
    catch(e) {}
  }

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

      <CustomNavbar
        routes={customNavbarRoutes}
        transparent
        light
      />

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
                
                

              </AppBar>
            </Grid>
          </Container>
        </Card>

        
      </MKBox>

      <MKBox bgColor="white" minHeight="600px">
        <SideBarMenu handleTabClicked={(e) => handleTabClicked(e)} />
      </MKBox>

      <Footer />
    </>
  );
}

export default NGOS;
