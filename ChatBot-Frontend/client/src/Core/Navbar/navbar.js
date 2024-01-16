import React, { useState, useRef, useEffect } from "react";
// import { zoomIn } from "react-animations";
// import { css, StyleSheet } from "aphrodite";
import {
  Navbar,
  NavbarText,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
  NavItem,
  Nav,
  Collapse,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import "./navbar.css";
import { motion } from "framer-motion";
import { Twirl as Hamburger } from "hamburger-react";
import LOGO from "../../Assets/face.jpeg";

// const styles = StyleSheet.create({
//   fadeInDown: {
//     animationName: zoomIn,
//     animationDuration: "3s",
//   },
// })

const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //   var prevScrollpos = window.pageXOffset;
  //   window.onscroll = function () {
  //     var currentScrollPos = window.pageYOffset;
  //     if (prevScrollpos > currentScrollPos) {
  //       document.getElementById("navbar").style.top = "0";
  //     } else {
  //       document.getElementById("navbar").style.top = "-100px";
  //     }
  //     // console.log("current::::::::::" + currentScrollPos);
  //     // console.log("prev::::::" + prevScrollpos);
  //     prevScrollpos = currentScrollPos;

  //     const show = window.pageYOffset > 600;
  //     if (show) {
  //       document.getElementById("navbar").style.backgroundColor =
  //         "rgb(20, 22, 22)";
  //     } else {
  //       document.getElementById("navbar").style.backgroundColor = "";
  //     }
  //   };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  // let x = window.matchMedia("(max-width: 767px)");

  // useEffect(() => {
  //   if (x.matches) {
  //     // If media query matches
  //     document.getElementById("toggle").style.display = "block";
  //   } else {
  //     document.getElementById("toggle").style.display = "none";
  //   }
  // }, [x]);

  return (
    <div>
      <div className="NavMain" id="navbar">
        <Navbar dark expand="md" full light>
          <NavbarBrand href="/">
            <motion.div
              animate={{ x: [0, 11, 0] }}
              transition={{ duration: 1.6, type: "spring" }}
            >
              {/* <h1>ScrapeFinder</h1> */}

              <img src={LOGO} alt="logo" className="logo" />

              {/* <h2>NLPrcogz</h2> */}
            </motion.div>
          </NavbarBrand>

          {/* <NavbarToggler onClick={toggle} /> */}
          <div id="toggle">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color="rgb(6, 132, 250)"
              easing="ease-in"
              // direction="right"
              distance="sm"
            />
          </div>

          <Collapse navbar isOpen={isOpen}>
            <Nav className="m-auto  " navbar>
              <NavItem className="px-3">
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink href="/">Info</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown inNavbar nav className="px-3">
                <DropdownToggle caret nav>
                  Social
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Facebook</DropdownItem>
                  <DropdownItem>Instagram</DropdownItem>
                  <DropdownItem>Twitter</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <NavItem className="px-3">
                <NavLink href="/nlp-processor">Connect</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink href="/signin">Signin</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink href="/signup">Signup</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Chat Assistance</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Navbars;
