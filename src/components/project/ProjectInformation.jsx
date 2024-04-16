import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import SelectTypeTags from "./SelectTypeTags";
import TypeTags from './TypeTags';
import { ListTeamMembers } from "./ListTeamMembers";
import { ListOnlyTeamMembers } from './ListOnlyTeamMembers';
import { useProjectData } from "../../hooks/useProjectData";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalUserManager } from "./ModalUserManager";
import { toast } from "react-toastify";
import axios from "axios";
import {
  PROPOSAL_EDIT_POST_ENDPOINT,
  PROPOSAL_UPDATE_STATES_POST_ENDPOINT,
} from "../../connections/helpers/endpoints";

export const ProjectInformation = () => {
  const [showModalManager, setShowModalManager] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigation = useNavigate();

  const [formErrors, setFormErrors] = useState({
    projectName: "",
  });
  const [formData, setFormData] = useState({
    projectName: projectName,
  });

  const sendProjectDataRef = useRef(null);

  const [teamproject, setTeamproject] = useState([]);
  const [newTeamProject, setnewTeamProject] = useState([]);
  const [tags, setTags] = useState([]);

  const project = useProjectData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProject = searchParams.get("id");
  const status = project.status;

  useEffect(() => {
    if (status === 'EN PROGRESO') {
      setFormData(prevState => ({
        ...prevState,
        projectName: project.projectName
      }));
    }
  }, [status, project.projectName]);

  // Función para manejar la selección de usuarios del equipo
  const handleUserTeamSelect = (selectedTeamUser) => {
    setTeamproject(selectedTeamUser);
    const UsertsWithIsManager = selectedTeamUser.map((user) => ({
      email: user.email,
      isManager: "no",
    }));
    setnewTeamProject(UsertsWithIsManager);
  };

  // Función para manejar la selección de etiquetas
  const handleTagsSelect = (res) => {
    setTags(res);
  };

  // Función para manejar la selección de un docente como manager
  const handleDocenteManagerSelect = (docenteManager) => {
    const isDocenteManagerInArray = newTeamProject.some(
      (member) => member.email === docenteManager.email
    );
    setnewTeamProject((prevTeamProject) => {
      if (isDocenteManagerInArray) {
        return prevTeamProject.map((member) =>
          member.email === docenteManager.email
            ? { ...member, isManager: "yes" }
            : member
        );
      } else {
        return [
          ...prevTeamProject,
          {
            email: docenteManager.email,
            isManager: "yes",
          },
        ];
      }
    });
    sendProjectDataRef.current = true;
  };

  useEffect(() => {
    if (sendProjectDataRef.current) {
      sendProjectDataUpdateToBackend();
      sendProjectDataRef.current = false;
    }
  }, [newTeamProject]);

  const sendProjectDataUpdateToBackend = async () => {
    const projectDataToSend = {
      projectName: formData.projectName,
      identificator: idProject,
      userToProject: newTeamProject,
      tagsToProject: tags,
    };

    axios
      .post(PROPOSAL_EDIT_POST_ENDPOINT, projectDataToSend)
      .then((res) => {
        sendProjectDataUpdateStatusToBackend();
      })
      .catch((err) => {
        console.error("Error al enviar datos al servidor:", err);
      });
  };

  const sendProjectDataUpdateStatusToBackend = () => {
    const projectIdDataStatusInProgress = {
      identificator: idProject,
      state: status
    };
    axios
      .post(PROPOSAL_UPDATE_STATES_POST_ENDPOINT, projectIdDataStatusInProgress)
      .then((res) => {
        navigation("/");
      })
      .catch((err) => {
        navigation("/");
      });
  };

  // Función para manejar el clic en el botón de Validar
  const handleButtonClick = () => {
    const docenteUsers = teamproject.filter((user) => user.rol === "DOCENTE");
    if (docenteUsers.length > 0) {
      setShowModalManager(true);
    } else {
      toast.error("Seleccione un docente al proyecto");
    }
  };

  // Función para manejar el clic en el botón de Confirmar (solo cuando el estado es "EN PROGRESO")
  const handleButtonClickEdit = () => {
    // Verificar si se seleccionó un docente nuevo en la lista de miembros agregados
    const docenteUsers = teamproject.filter((user) => user.rol === "DOCENTE");
    const newDocenteUsers = newTeamProject.filter((user) => user.rol === "DOCENTE");

    // Si hay al menos un docente nuevo, abrir el modal
    if (newDocenteUsers.length > 0 || docenteUsers.length > 0) {
      setShowModalManager(true);
    } else {
      // Si no se seleccionaron docentes nuevos, actualizar el proyecto
      sendProjectDataUpdateToBackend();
    }
  };

  const assignedDocenteUsers = teamproject.filter((user) => user.isManager && user.isManager === "yes" && user.rol === "DOCENTE");

  return (
    <>
      <Card>
        {status === 'EN PROGRESO' ? (
          <>
          <Card.Header className={`my-header-project-${status}`}>
            <div className={`my-badge-state-${status}`}>{status}</div>
          </Card.Header>
          <Card.Body>
          <Form className="px-3 mt-4">
            <Row>
              <Col sm="12" md="6">
                <h3>Nombre del proyecto</h3>
                <Form.Group className="mt-4" controlId="projectName">
                  <Form.Control
                    size="lg"
                    type="text"
                    name="projectName"
                    placeholder="Ingrese el nombre del proyecto"
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    isInvalid={formSubmitted && formErrors.projectName !== ""}
                    style={{ width: "90%" }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {formSubmitted && formErrors.projectName}
                  </Form.Control.Feedback>
                </Form.Group>
                <h3 className="mt-4">Tags del proyecto</h3>
                <TypeTags onTagsSelect={handleTagsSelect} />
                <h3 className="mt-5">Agregar más tags</h3>
                <SelectTypeTags onTagsSelect={handleTagsSelect} />
              </Col>

              <Col
                sm="12"
                md="6"
                className="d-flex flex-column justify-content-between"
              >
                <h3>Integrantes del equipo</h3>
                <ListOnlyTeamMembers onStudentSelect={handleUserTeamSelect} />
                <h3 className="mt-5">Agregar miembros</h3>
                <ListTeamMembers onStudentSelect={handleUserTeamSelect} />
                <div className="d-flex justify-content-end mt-auto">
                  <Button
                    type="button"
                    variant="danger"
                    className="my-modal-button-approve  mt-4"
                    onClick={handleButtonClickEdit}
                  >
                    Confirmar
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        </> 
        ) :
        <>
          <Card.Header className={`my-header-project-${status}`}>
          <div className={`my-badge-state-${status}`}>{status}</div>
        </Card.Header>
        <Card.Body>
          <Form className="px-3 mt-4">
            <Row>
              <Col sm="12" md="6">
                <h3>Nombre del proyecto</h3>
                <Form.Group className="mt-4" controlId="projectName">
                  <Form.Control
                    size="lg"
                    type="text"
                    name="projectName"
                    placeholder="Ingrese el nombre del proyecto"
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    isInvalid={formSubmitted && formErrors.projectName !== ""}
                    style={{ width: "90%" }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {formSubmitted && formErrors.projectName}
                  </Form.Control.Feedback>
                </Form.Group>
                <h3 className="mt-4">Tags</h3>
                <SelectTypeTags onTagsSelect={handleTagsSelect} />
              </Col>

              <Col
                sm="12"
                md="6"
                className="d-flex flex-column justify-content-between"
              >
                <h3>Integrantes del equipo</h3>
                <ListTeamMembers onStudentSelect={handleUserTeamSelect} />
                <div className="d-flex justify-content-end mt-auto">
                  <Button
                    type="button"
                    variant="danger"
                    className="my-modal-button-approve  mt-4"
                    onClick={handleButtonClick}
                  >
                    Validar
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        </> }
      </Card>
      <ModalUserManager
        isOpen={showModalManager}
        closeModal={() => {
          setShowModalManager(false);
        }}
        docenteUsers={teamproject.filter((user) => user.rol === "DOCENTE")}
        assignedDocenteUsers={assignedDocenteUsers} // Lista de docentes ya asignados
        onDocenteSelect={handleDocenteManagerSelect}
      />
    </>
  );
};