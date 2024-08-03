import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
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
import { useData } from 'contexts/DataContext';
import { fetchAlzheimer, AlzheimerInteractions } from 'service/alzheimer';

function AdminNavbar(props) {
  const { data } = useData();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [color, setColor] = useState('navbar-transparent');
  const [notifications, setNotifications] = useState([]);

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

  const toggleModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.map((notification) =>
      notification.id === id ? { ...notification, visible: false } : notification
    ));
  };

  const visibleNotifications = notifications.filter(notification => notification.visible);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await fetchAlzheimer(AlzheimerInteractions);
        const lastThreeInteractions = data.slice(-3).map(interaction => ({
          id: interaction.id,
          dateTime: interaction.dateTime,
          hour: interaction.hour,
          title: interaction.title,
          visible: true
        }));
        setNotifications(lastThreeInteractions);
      } catch (error) {
        console.error('Error fetching Alzheimer interactions:', error);
      }
    };

    fetchNotifications();
  }, []);

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
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong>{notification.title}</strong>
                              <div>{notification.dateTime} - {notification.hour}</div>
                            </div>
                            <button onClick={() => dismissNotification(notification.id)} style={{ marginLeft: '10px' }}>
                              X
                            </button>
                          </div>
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
                  <DropdownItem text>
                    <div className='photo'>
                      <img alt='...' src={require('assets/img/anime3.png')} />
                    </div>
                  </DropdownItem>
                  {/* Verifica si data.dto no es null antes de acceder a sus propiedades */}
                  <DropdownItem text>
                    {data.dto ? `${data.dto.name} ${data.dto.userLastName}` : 'Cargando...'}
                  </DropdownItem>
                  <DropdownItem header>Nombre</DropdownItem>
                  <DropdownItem text>
                    {data.dto ? data.dto.username : 'Cargando...'}
                  </DropdownItem>
                  <DropdownItem header>Usuario</DropdownItem>
                  <DropdownItem divider />
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item' onClick={handleLogout}>Cerrar sesión</DropdownItem>
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
