import React from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaWeebly, FaPhone, FaLocationArrow } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import logo from "../img/FescLogo.jpg";

const Footer = () => {
  const connected = useSelector((state) => state.user.connected);

  const EstiloIcono = {
    backgroundColor: 'white',
    color: 'red',
    padding: '10%',
    borderRadius: '50%',
    fontSize: '250%',
  };

  return (
    <React.Fragment>
        {connected ? (
            <div className="Footer">
                <Container className="text-center">
                    <Row>
                        <Col md={6} lg={5} xs={12} className="ft-1">
                            <Image src={logo} fluid className="text-center d-flex justify-content-between" alt={logo} />
                            <p>
                                Institución de Educación Superior de carácter Tecnológico de derecho privado, de utilidad común y sin
                                ánimo de lucro, redefinida mediante Resolución del MEN 747 del 19 de febrero de 2009, para ofertar
                                programas Técnicos, Tecnológicos, Profesionales y Especializaciones.
                            </p>
                            <p>
                                Su oferta académica se desarrolla en el Departamento Norte de Santander, específicamente en los municipios de San José de Cúcuta y en la Provincia de Ocaña
                            </p>
                            <div className="d-flex flex-wrap justify-content-center mt-3">
                                <Button variant="link" className="icono mx-3 mb-4">
                                    <FaFacebook style={EstiloIcono} />
                                </Button>
                                <Button variant="link" className="icono mx-3 mb-4">
                                    <FaYoutube style={EstiloIcono} />
                                </Button>
                                <Button variant="link" className="icono mx-3 mb-4">
                                    <FaWeebly style={EstiloIcono} />
                                </Button>
                            </div>
                        </Col>
                        <Col md={6} lg={3} xs={12} className="mt-5 ft-2">
                            <h3 className="text-white fs-4 mt-4 fs-1">Programas</h3>
                            <hr className="text-white fw-bold" />
                            <ListGroup>
                                <ListGroup.Item className="item-listGroup mt-3">
                                    <a className="text-white" href="https://www.fesc.edu.co/portal/" target='_blank'>
                                        Pregrados
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="item-listGroup mt-3">
                                    <a className="text-white" href="https://www.fesc.edu.co/portal/index.php/programas-academicos/posgrado/especializaciones/administracion-de-la-salud">
                                        Especializaciones
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="item-listGroup mt-3">
                                    <a className="text-white" href="https://www.fesc.edu.co/portal/index.php/programas-academicos/diplomados-de-grados#slider-6" target='_blank'>
                                        Diplomados
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={6} lg={4} xs={12} className="mt-5">
                            <h3 className="text-white fs-4 mt-4 fs-1">Contacto</h3>
                            <hr className="text-white fw-bold" />
                            <p className="text-white mt-4">
                                <FaPhone size={25} className="mx-3" />+57 312 3541578
                            </p>
                            <p className="text-white">
                                <MdEmail size={25} className="mx-3" />
                                servicios_generales@fesc.edu.co
                            </p>
                            <p className="text-white">
                                <FaLocationArrow size={25} className="mx-3" />
                                Av.5 #15-27, Centro, Cúcuta, Norte de Santander
                            </p>
                        </Col>
                    </Row>
                </Container>
                <hr className="text-white fw-bold" />
                <div className="text-center">
                    <p className="text-white">
                        <span className="fw-semibold">Todos los derechos reservados</span>
                    </p>
                    <p className="text-white">
                        © 2023 - 2024
                    </p>
                </div>
            </div>
        ) : ""}
    </React.Fragment>
)}

export { Footer }
