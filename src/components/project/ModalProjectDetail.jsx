import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  PROJECT_USER_LIST_GET_ENDPOINT,
  PROPOSAL_DETAIL_GET_ENDPOINT,
} from "../../connections/helpers/endpoints";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Badge,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Table,
} from "react-bootstrap";
import PermissionCheck from "../PermissionCheck";
import { roles } from "../../utils/roles";
import { status } from "../../utils/status";
import { ButtonProjectReject } from "./ButtonProjectReject";
import { ProjectProgressBar } from "./ProjectProgressBar";
import ButtonDownloadFile from "../files/ButtonDownloadFile";
import { Upload } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { upload } from "../../states/uploadFileReducer";
import { ButtonDeletefile } from "../files/ButtonDeleteFile";

function MyVerticallyCenteredModal({ project, show, onHide, onClickApproved, refresh, setRefresh }) {
  const [students, setStudents] = useState([]);
  const [progressProject, setprogressProject] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (project.progress !== undefined) {
      setprogressProject(project.progress);
    }
    if (project.identificator !== undefined) {
      axios
        .get(
          `${PROJECT_USER_LIST_GET_ENDPOINT}?identificator=${project.identificator}`
        )
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener datos:", err);
        });
    }
  }, [project.identificator]);

  const states = {
    "INGENIERIA DE SOFTWARE": "my-badge-career-software",
    "DISEÑO GRAFICO": "my-badge-career-graphic",
    "ADMINISTRACION FINANCIERA": "my-badge-career-financial",
    "DISEÑO DE MODAS": "my-badge-career-fashions",
    "HOTELERIA Y TURISMO": "my-badge-career-tourism",
    "LOGISTICA EMPRESARIAL": "my-badge-career-logistics",
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cargar archivo final
    </Tooltip>
  );

  const handleUploadFile = () => {
    if (project.identificator !== undefined) {
      dispatch(upload({ id: project.identificator, isproject: "yes" }));
      onHide(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={project.status === status.IN_PROGRESS ? "lg" : "md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        className={`my-modal-header-${project.status} px-4`}
        closeButton
      >
        <div className={`my-badge-state-${project.status}`}>
          {project.status}
        </div>
      </Modal.Header>
      <Modal.Body className="px-4 pt-5 ms-2 text-lg-start">
        <Row>
          <ProjectProgressBar numberProgress={progressProject} />

          <Col xs="12" className="mb-4">
            <strong className="h3">{project.company}</strong>
          </Col>
          {project.status === status.IN_PROGRESS ? (
            <>
              <Row>
                <Col xs="12" md="12" lg="8">
                  <Row>
                    <Col xs="12" sm="6">
                      <strong>Nombre del Proyecto</strong>
                      <p>{project.projectName}</p>

                      <strong>Creado por</strong>
                      <p>{project.nameUserCreator}</p>

                      <strong>Fecha</strong>
                      <p>{project.creationDate}</p>
                    </Col>
                    <Col xs="12" sm="6">
                      <strong>Valor de la propuesta</strong>
                      <p>{project.valueProposal}</p>

                      <strong>Tags</strong>
                      <div>
                        {project.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className={`${states[tag.tagName] || ""}`}
                            style={{
                              borderRadius: "50px",
                              margin: "5px",
                            }}
                          >
                            {tag.tagName}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12">
                      <strong>Descripción</strong>
                      <p style={{ maxHeight: "200px", overflow: "auto" }}>
                        {project.description}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" sm="8" lg="4">
                  <strong>Miembros del equipo</strong>
                  <ListGroup>
                    {students.map((student) => (
                      <ListGroup.Item
                        key={student.email}
                        style={{
                          position: "relative",
                        }}
                      >
                        {student.name + " " + student.lastName}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col xs="6" className="mt-4  mb-2">
                  <h4>Archivos</h4>
                </Col>
                {progressProject >= 100 && project.file==="" &&  (
                  <Col xs="6" className="text-end mt-4 mb-2">
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        variant="ligth"
                        style={{ backgroundColor: "#EBEBEB" }}
                        onClick={() => handleUploadFile()}
                      >
                        <Upload />
                      </Button>
                    </OverlayTrigger>
                  </Col>
                )}
                {project.file && (
                  <Col xs="12">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Descargar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{project.file}</td>
                          <td className="text-end">
                            <ButtonDeletefile
                            refresh={refresh}
                            setRefresh={setRefresh}
                            identificator={project.identificator}
                            isProject={"yes"}
                            filename={project.file}
                          />
                            <ButtonDownloadFile
                              identificator={project.identificator}
                              isProject={"yes"}
                              filename={project.file}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                )}
              </Row>
            </>
          ) : (
          <Row>

          <Col xs="12" className="mb-2">
            <Row>
              <Col xs="12">
                <strong>Propuesta de valor</strong>
                <p>{project.valueProposal}</p>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className='mb-2'>
            <Row>
              <Col xs="12">
                <strong>Descripción</strong>
                <p>{project.description}</p>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className='mb-2'>
            <Row>
              <Col xs="12">
                <strong>Creado por</strong>
                <p>{project.nameUserCreator}</p>
              </Col>
            </Row>
          </Col>

          <Col xs="12" className='mb-2'>
            <Row>
              <Col xs="12">
                <strong>Fecha</strong>
                <p>{project.creationDate}</p>
              </Col>
            </Row>
          </Col>
          </Row>
          )}          
          <Col xs="12" className='d-flex justify-content-end'>
            <PermissionCheck requiredRoles={[roles.VALIDATOR]}>
              {project.status === status.PENDING && (
                <>
                  <ButtonProjectReject project={project} onHide={onHide} />
                  <Button
                    type="submit"
                    variant="success"
                    className="my-modal-button-approve"
                    onClick={onClickApproved}
                  >
                    Aprobar
                  </Button>
                </>
              )}
            </PermissionCheck>
            <PermissionCheck requiredRoles={[roles.DIRECTOR]}>
              {project.status === status.APPROVED && (
                <Button
                  as={NavLink}
                  to={`/project/detail?id=${project.identificator}`}
                  type="submit"
                  variant="success"
                  className="my-modal-button-approve"
                >
                  Editar
                </Button>
              )}
            </PermissionCheck>
            <PermissionCheck
              requiredRoles={[roles.DIRECTOR, roles.TEACHER, roles.STUDENT]}
            >
              {project.status === status.IN_PROGRESS && (
                <Button
                    as={NavLink}
                    to={`/table/task/${project.identificator}`}
                    type="submit"
                    variant="warning"
                    className="my-modal-button-task me-2"
                  >
                    Tareas
                </Button>
              )}
            </PermissionCheck>
            <PermissionCheck requiredRoles={[roles.DIRECTOR]}>
              {project.status === status.IN_PROGRESS && 
                <Button
                  as={NavLink}
                  to={`/project/detail?id=${project.identificator}`}
                  type="submit"
                  variant="primary"
                  className="my-modal-button-approve ms-2"
                >
                  Editar proyecto
                </Button>
              }
            </PermissionCheck>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

function ModalProjectDetail() {
  const [modalShow, setModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");
  const [project, setProject] = useState({});

  useEffect(() => {
    if (q) {
      axios.get(`${PROPOSAL_DETAIL_GET_ENDPOINT}?identificator=${q}`)
      .then(res => {
        setProject(res.data);
        setModalShow(true);
      })
      .catch(err => {
        setModalShow(false);
      });
    }
  }, [q, location, refresh]);

  const hideModal = () => {
    setModalShow(false);
    searchParams.delete("q");
    const newSearch = searchParams.toString();
    const newPath = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname;
    navigate(newPath);
  };

  const showModalApproved = () => {
    hideModal();
    searchParams.set("approved", project.identificator);
    const newSearch = searchParams.toString();
    const newPath = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname;
    navigate(newPath);
  };

  return (
    <MyVerticallyCenteredModal
      project={project}
      show={modalShow}
      onHide={() => hideModal()}
      onClickApproved={() => showModalApproved()}
      refresh={refresh}
      setRefresh={setRefresh}
    />
  );
}

export { ModalProjectDetail };
