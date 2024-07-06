import React, { useState, useEffect } from 'react';
// import { unstable_HistoryRouter  } from 'react-router-dom';
import classNames from 'classnames';
import useSWR from 'swr';
import { fetchAlzheimer, AlzheimerCaragivers } from 'service/alzheimer';
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
  Modal,
  ModalHeader,
  Input,
} from 'reactstrap';
import { handleLogout } from 'service/security';

function AdminNavbar(props) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [color, setColor] = useState('navbar-transparent');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Mike John responded to your email', visible: true },
    // Agrega más notificaciones aquí si es necesario
  ]);

  // const history = unstable_HistoryRouter(); // Usar useHistory para redirigir al usuario

  useEffect(() => {
    window.addEventListener('resize', updateColor);
    return function cleanup() {
      window.removeEventListener('resize', updateColor);
    };
  });

  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor('bg-white');
    } else {
      setColor('navbar-transparent');
    }
  };

  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent');
    } else {
      setColor('bg-white');
    }
    setCollapseOpen(!collapseOpen);
  };


    // const handleLogout = () => {
    //     // Eliminar el token JWT del almacenamiento local
    //     localStorage.removeItem('token');
    //     // Redirigir al usuario a la página de inicio de sesión
    //     history.push('/login');
    // };

  const toggleModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.map((notification) =>
      notification.id === id ? { ...notification, visible: false } : notification
    ));
  };

  const { data: caregivers, error: caregiversError } = useSWR(AlzheimerCaragivers, fetchAlzheimer, {
    suspense: false,
  });

  const visibleNotifications = notifications.filter(notification => notification.visible);

  return (
    <>
      <Navbar className={classNames('navbar-absolute', color)} expand='lg'>
        <Container fluid>
          <div className='navbar-wrapper'>
            <div
              className={classNames('navbar-toggle d-inline', {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className='navbar-toggler-bar bar1' />
                <span className='navbar-toggler-bar bar2' />
                <span className='navbar-toggler-bar bar3' />
              </NavbarToggler>
            </div>
            <NavbarBrand href='#pablo' onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className='ml-auto' navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  nav
                >
                  <div className='notification d-none d-lg-block d-xl-block' />
                  <i className='tim-icons icon-bell-55' />
                  <p className='d-lg-none'>Notificaciones</p>
                </DropdownToggle>
                <DropdownMenu className='dropdown-navbar' right tag='ul'>
                  {visibleNotifications.length > 0 ? (
                    visibleNotifications.map((notification) => (
                      <NavLink tag='li' key={notification.id}>
                        <DropdownItem className='nav-item'>
                          {notification.message}
                          <button onClick={() => dismissNotification(notification.id)} style={{ marginLeft: '10px' }}>
                            X
                          </button>
                        </DropdownItem>
                      </NavLink>
                    ))
                  ) : (
                    <NavLink tag='li'>
                      <DropdownItem className='nav-item'>
                        Sin notificaciones
                      </DropdownItem>
                    </NavLink>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle caret color='default' nav onClick={(e) => e.preventDefault()}>
                  <div className='photo'>
                    <img alt='...' src={require('assets/img/anime3.png')} />
                  </div>
                  <b className='caret d-none d-lg-block d-xl-block' />
                  <p className='d-lg-none'>Usuario</p>
                </DropdownToggle>
                <DropdownMenu md='2' className='dropdown-navbar' right tag='ul'>
                  {caregivers && caregivers.map((caregiver, index) => (
                    <React.Fragment key={index}>
                      <DropdownItem text>
                        <div className='photo'>
                          <img alt='...' src={require('assets/img/anime3.png')} />
                        </div>
                      </DropdownItem>
                      <DropdownItem text>{`${caregiver.name} ${caregiver.lastName}`}</DropdownItem>
                      <DropdownItem header>USUARIO</DropdownItem>
                      <DropdownItem text>{caregiver.gmail}</DropdownItem>
                      <DropdownItem header>CORREO ELECTRÓNICO</DropdownItem>
                      <DropdownItem text>{caregiver.relationship}</DropdownItem>
                      <DropdownItem header>PARENTEZCO</DropdownItem>
                      <DropdownItem divider />
                    </React.Fragment>
                  ))}
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item' onClick={handleLogout} >Cerrar sesión</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>

              <li className='separator d-lg-none' />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName='modal-search'
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder='SEARCH' type='text' />
          <button
            aria-label='Close'
            className='close'
            onClick={toggleModalSearch}
          >
            <i className='tim-icons icon-simple-remove' />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
