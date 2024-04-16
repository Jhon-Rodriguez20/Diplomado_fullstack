import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../connections/userActions';
import { Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import logo from '../img/logo-nav.png';
import { useEffect } from "react";
import PermissionCheck from '../components/PermissionCheck';
import { roles } from '../utils/roles';

function Navigation() {
    const connected = useSelector((state) => state.user.connected);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const links = document.querySelectorAll('.link');
    
        const handleLinkClick = (event) => {
            links.forEach(link => link.classList.remove('active'));
            event.currentTarget.classList.add('active');
        };
    
        links.forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });
    
        return () => {
            links.forEach(link => {
            link.removeEventListener('click', handleLinkClick);
          });
        };
    }, []);

    return (
        <Container>
            <header className="py-1">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="d-flex justify-content-between">
                        <Navbar.Brand as={NavLink} to={"/"} 
                        className="text-dark mt-3">
                            <Image src={logo} height={40}/>
                        </Navbar.Brand>
                        {connected ? (
                            <NavDropdown
                                title={<div className='my-avatar' >{user.sub.substring(0, 2).toUpperCase()}</div>}
                                id="button-dropdown"
                                className='my-avatar-dropdown'
                                >
                                {/* <React.Fragment>
                                    <NavDropdown.Divider />
                                </React.Fragment> */}
                                <NavDropdown.Item onClick={() => dispatch(logout())} className='text-black'>
                                    Cerrar sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : ""}
                    </div>
                </div>
            </header>
            <hr/>
            <div className="nav-scroller py-1 mb-2">
                <Nav className="nav">
                    <NavLink to={"/"} className="link p-2 ms-0 mx-3" id="crear-usuario-link">
                        Proyectos
                    </NavLink>
                    <PermissionCheck requiredRoles={[roles.ADMIN]}>
                        <NavLink to={"/user"} className="link p-2 ms-0 mx-3" id="usuarios-link">
                            Usuarios
                        </NavLink>
                    </PermissionCheck>
                </Nav>
            </div>
        </Container>
    );
}

export { Navigation }