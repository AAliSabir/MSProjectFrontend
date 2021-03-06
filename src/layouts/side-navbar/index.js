// import useState hook to create menu collapse state
import React, { useState } from "react";

// import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  //  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

// import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideBarMenu.css";

const SideBarMenu = (props) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    debugger;

    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleMenuClick = async (e) => {
    await props.handleTabClicked(e);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "NGO" : "NGO Details"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} onClick={(e) => handleMenuClick(e)} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleMenuClick(e);
                }}
                icon={<FaList />}
              >
                Category
              </MenuItem>
              <MenuItem onClick={(e) => handleMenuClick(e)} icon={<FaRegHeart />}>
                Favourite
              </MenuItem>
              <MenuItem onClick={(e) => handleMenuClick(e)} icon={<RiPencilLine />}>
                Author
              </MenuItem>
              <MenuItem onClick={(e) => handleMenuClick(e)} icon={<BiCog />}>
                Settings
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarMenu;
