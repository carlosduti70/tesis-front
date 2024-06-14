
import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import useSWR from "swr";
import { fetchAlzheimer, AlzheimerCaragivers } from "service/alzheimer";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  // informacion del usuario
  const { data: caragivers, error: caragiversError } = useSWR(AlzheimerCaragivers, fetchAlzheimer, {
    suspense: false,
  });

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-bell-55" />
                  <p className="d-lg-none">Notificaciones</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* ------------- */}




              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Usuario</p>
                </DropdownToggle>
                <DropdownMenu md="2" className="dropdown-navbar" right tag="ul">
                  {caragivers && caragivers.map((caragiver, index) => (
                    <React.Fragment key={index}>
                      <DropdownItem text>

                      <div className="photo">
                        <img alt="..." src={require("assets/img/anime3.png")} />
                      </div>
                      </DropdownItem>
                      <DropdownItem text>{`${caragiver.name} ${caragiver.lastName}`}</DropdownItem>
                      <DropdownItem header>USUARIO</DropdownItem>
                      <DropdownItem text>{caragiver.gmail}</DropdownItem>
                      <DropdownItem header>CORREO ELECTRÓNICO</DropdownItem>
                      <DropdownItem text>{caragiver.relationship}</DropdownItem>
                      <DropdownItem header>PARENTEZCO</DropdownItem>
                      {/* <DropdownItem disabled>{`Action (disabled) ${index}`}</DropdownItem> */}
                      <DropdownItem divider />
                    </React.Fragment>
                  ))}
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Cerrar sesión</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* ------------ */}




              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
