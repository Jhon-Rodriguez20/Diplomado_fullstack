import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Modal,
  FloatingLabel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { SelectProjectFilter } from "./SelectProjectFilter";
import PermissionCheck from "../PermissionCheck";
import { roles } from "../../utils/roles";
import { Plus } from "react-bootstrap-icons";

export const CreateProposalModal = ({ callback }) => {
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    valueProposal: "",
    description: "",
  });

  const handleModalShow = () => {
    setShowModal(true);
    setFormSubmitted(false);
    setFormErrors({
      valueProposal: "",
      description: "",
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormSubmitted(false);
  };

  const [formData, setFormData] = useState({
    valueProposal: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendResponse = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      console.log(formData);
      callback(formData);
      handleModalClose();
    }
  };

  const validateForm = (data) => {
    const errors = {
      valueProposal:
        data.valueProposal.trim() === ""
          ? "Este campo no puede estar vacío"
          : "",
      description:
        data.description.trim() === "" ? "Este campo no puede estar vacío" : "",
    };
    return errors;
  };

  const renderCreateTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Crear un proyecto
    </Tooltip>
  );

  return (
    <>
      <div className="button-container">
        <PermissionCheck requiredRoles={[
          roles.COMPANY, 
          roles.DIRECTOR, 
          roles.STUDENT, 
          roles.TEACHER, 
          roles.VALIDATOR
        ]}>
          <SelectProjectFilter />
        </PermissionCheck>

        <PermissionCheck requiredRoles={[roles.COMPANY]}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderCreateTooltip}
          >
              <Button
                variant="ligth"
                style={{ backgroundColor: "#EBEBEB" }}
                onClick={handleModalShow}
              >
                <Plus/>
              </Button>
          </OverlayTrigger>
        </PermissionCheck>
      </div>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="my-modal-header px-4" closeButton>
          <div className="my-badge-state">Crear Proyecto</div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendResponse} className="px-3">
            <Row>
              <Col sm="12">
                <Form.Group className="mb-4 mt-5" controlId="valueProposal">
                  <FloatingLabel label="Propuesta de valor (el valor social que aporta su propuesta)" className="mb-0">
                    <Form.Control
                      size="lg"
                      type="text"
                      name="valueProposal"
                      value={formData.valueProposal}
                      onChange={handleChange}
                      isInvalid={
                        formSubmitted && formErrors.valueProposal !== ""
                      }
                    />
                    
                  <Form.Control.Feedback type="invalid">
                    {formSubmitted && formErrors.valueProposal}
                  </Form.Control.Feedback>
                  </FloatingLabel>

                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group className="mb-5" controlId="description">
                  <FloatingLabel
                    label="Descripción del proyecto"
                    className="mb-0"
                  >
                    <Form.Control
                      as="textarea"
                      rows={8}
                      size="lg"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      isInvalid={formSubmitted && formErrors.description !== ""}
                      style={{ height: "200px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {formSubmitted && formErrors.description}
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
