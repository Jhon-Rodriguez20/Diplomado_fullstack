import React, { useState, useEffect } from "react";
import { REGISTER_EXTERNAL_POST_ENDPOINT, REGISTER_INVITED_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Alert, Card, Col, Container, Image, Row } from "react-bootstrap";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { isEmptyObject } from "../../connections/helpers/isEmptyObject";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logof from "../../img/logof.png";
import { useSelector } from "react-redux";
import {  toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";

const Register = () => {
  const [errors, setErrors] = useState({});
  const connected = useSelector((state) => state.user.connected);
  const navigation = useNavigate();

  useEffect(() => {
    if (connected) {
      navigation("/");
    }
  }, [connected, navigation]);

  const register = async (user) => {
    console.log(user)
    const error = {};

    if (validator.isEmpty(user.name)) {
      error.name = "El nombre no puede estar vacío";
    }

    if (user.type === "external" && validator.isEmpty(user.companyName)) {
      error.companyName = "La empresa no puede estar vacía";
    }

    if (validator.isEmpty(user.lastName)) {
      error.lastName = "El apellido no puede estar vacío";
    }

    if (!validator.isEmail(user.email)) {
      error.email = "El correo electrónico es inválido";
    }

    if (validator.isEmpty(user.cellPhone)) {
      error.cellPhone = "El teléfono no puede estar vacío";
    } else if (!isValidPhoneNumber(user.cellPhone)) {
      error.cellPhone = "Por favor, ingrese un número de teléfono válido";
    }

    if (!validator.isLength(user.password, { min: 8, max: 30 })) {
      error.password = "La contraseña debe tener entre 8 y 30 caracteres";
    }

    if (user.password !== user.repeatPassword) {
      error.password = "Las contraseñas deben coincidir";
    }

    if (!isEmptyObject(error)) {
      setErrors(error);
    } else {
      axios
        .post(user.type === "external" ? REGISTER_EXTERNAL_POST_ENDPOINT : REGISTER_INVITED_POST_ENDPOINT, user)
        .then((res) => navigation("/login"))
        .catch((err) => {
          toast.error(`Error: ${err.response.data}`, toastConfig);
        });
    }
  };

  const isValidPhoneNumber = (phone) => {
    // Expresión regular para validar un número de teléfono con exactamente 10 dígitos
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Container>
      <Row className="flex-container justify-content-md-center">
        <Col
          sm="12"
          md="8"
          lg="7"
          className="custom-container shadow p-3 mt-3 mb-5 bg-white rounded"
        >
          <div className="d-md-flex align-items-center mt-3 mb-2 px-3 custom-header">
            <div className="text-center mb-3 mb-md-2 mx-auto">
              <Image className="me-4" src={logof} />
            </div>

            <div className="text-center text-md-start flex-grow-1">
              <h1 className="h3 font-weight-normal">Registro</h1>
              <p>
                Crea una cuenta para acceder a la plataforma de manera segura y
                personalizada.
              </p>
            </div>
          </div>

          <Card.Body className="custom-card-body">
            {errors.register && (
              <Alert variant="danger">{errors.register}</Alert>
            )}
            <RegisterForm errors={errors} callback={register} />
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export { Register };
