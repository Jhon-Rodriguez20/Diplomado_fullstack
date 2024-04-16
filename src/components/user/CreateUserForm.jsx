import React, { useState } from "react";
import { Col, Row, Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { SelectProgram } from "./SelectProgram";
import { SelectUserRol } from "./SelectUserRol";
import { Plus } from "react-bootstrap-icons";
import validator from "validator"; // Importa la librería validator

export const CreateUserForm = ({ callback }) => {
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    cellPhone: "",
    password: "",
    repeatPassword: "",
    program: "",
    rol: "",
  });

  const handleModalShow = () => {
    setShowModal(true);
    setFormSubmitted(false);
    setFormErrors({
      name: "",
      lastName: "",
      email: "",
      cellPhone: "",
      password: "",
      repeatPassword: "",
      program: "",
      rol: "",
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormSubmitted(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    cellPhone: "",
    password: "",
    repeatPassword: "",
    program: "",
    rol: "",
  });

  const handleSelectChange = (fieldName, selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedValue,
    }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Validar y formatear el número de teléfono
    if (name === "cellPhone") {
      // Eliminar cualquier caracter que no sea número
      value = value.replace(/\D/g, "");
      // Limitar a 10 dígitos
      value = value.slice(0, 10);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendResponse = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Realiza las validaciones aquí y actualiza el estado de formErrors
    const errors = validateForm(formData);
    setFormErrors(errors);

    // Si no hay errores, llama al callback
    if (Object.values(errors).every((error) => error === "")) {
      handleModalClose();
      callback(formData);

      // Limpiar los campos del formulario
      setFormData({
        name: "",
        lastName: "",
        email: "",
        cellPhone: "",
        password: "",
        repeatPassword: "",
        program: "",
        rol: "",
      });
    }
  };

  const validateForm = (data) => {
    const errors = {
      name: data.name.trim() === "" ? "Este campo no puede estar vacío" : "",
      lastName:
        data.lastName.trim() === "" ? "Este campo no puede estar vacío" : "",
      email: isValidEmail(data.email)
        ? ""
        : "Por favor, ingrese un correo electrónico válido",
      cellPhone:
        data.cellPhone.trim() === ""
          ? "Este campo no puede estar vacío"
          : isValidPhoneNumber(data.cellPhone)
          ? ""
          : "Por favor, ingrese un número de teléfono válido",
      password:
        data.password.trim() === "" ? "Este campo no puede estar vacío" : "",
      repeatPassword:
        data.repeatPassword.trim() === ""
          ? "Este campo no puede estar vacío"
          : "",
      program: data.program.trim() === "" ? "Seleccione un programa" : "",
      rol: data.rol.trim() === "" ? "Seleccione un rol" : "",
    };

    // Validar la longitud y la coincidencia de contraseñas
    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = "La contraseña debe tener entre 8 y 30 caracteres";
    }

    if (data.password !== data.repeatPassword) {
      errors.repeatPassword = "Las contraseñas deben coincidir";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Expresión regular para validar un número de teléfono con un máximo de 10 dígitos
    const phoneRegex = /^\d{0,10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <>
      <Button
        variant="ligth"
        style={{ backgroundColor: "#EBEBEB" }}
        onClick={handleModalShow}
      >
        <Plus></Plus>
      </Button>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="my-modal-header px-4" closeButton>
          <div className="my-badge-state">Crear Usuario</div>
        </Modal.Header>

        <Modal.Body className="px-4 pt-5">
          <Form onSubmit={sendResponse} className="px-3">
            <Row className="mt-4">
              <Col sm="12" md="6">
                <Form.Group className="mb-5 mt-4" controlId="name">
                  <FloatingLabel
                    label="Nombre"
                    type="text"
                    className="form-floating"
                  >
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.name !== ""}
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5 mt-4" controlId="lastName">
                  <FloatingLabel
                    label="Apellido"
                    type="text"
                    className="form-floating"
                  >
                    <Form.Control
                      size="lg"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.lastName !== ""}
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="email">
                  <FloatingLabel label="Correo electrónico" htmlFor="email">
                    <Form.Control
                      size="lg"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.email !== ""}
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="cellPhone">
                  <FloatingLabel label="Teléfono celular" htmlFor="cellPhone">
                    <Form.Control
                      size="lg"
                      type="tel" // Cambiado a teléfono
                      name="cellPhone"
                      value={formData.cellPhone}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.cellPhone !== ""}
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.cellPhone}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="password">
                  <FloatingLabel label="Contraseña" htmlFor="password">
                    <Form.Control
                      size="lg"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.password !== ""}
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="repeatPassword">
                  <FloatingLabel
                    label="Repetir Contraseña"
                    htmlFor="repeatPassword"
                  >
                    <Form.Control
                      size="lg"
                      type="password"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      isInvalid={
                        formSubmitted && formErrors.repeatPassword !== ""
                      }
                      style={{ height: "45px" }} // Establecer la misma altura para todos los campos
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.repeatPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="program">
                  <FloatingLabel label="Programa">
                    <SelectProgram
                      onSelect={handleSelectChange}
                      errores={formErrors.program} // Pasar errores a SelectProgram
                      style={{ height: "45px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.program}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col sm="12" md="6">
                <Form.Group className="mb-5" controlId="rol">
                  <FloatingLabel label="Rol de Usuario">
                    <SelectUserRol
                      onSelect={handleSelectChange}
                      errores={formErrors.rol} // Pasar errores a SelectUserRol
                      style={{ height: "45px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formSubmitted && formErrors.rol}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <div style={{ textAlign: "right", marginBottom: "10px" }}>
              <Button
                type="submit"
                variant="danger"
                className="my-modal-button"
                onClick={sendResponse}
              >
                Crear
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
