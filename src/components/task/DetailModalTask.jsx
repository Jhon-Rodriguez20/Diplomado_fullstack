import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { upload } from "../../states/uploadFileReducer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TASK_DETAIL_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import ButtonDownloadFile from "../files/ButtonDownloadFile";
import { Upload } from "react-bootstrap-icons";
import PermissionCheck from "../PermissionCheck";
import { roles } from "../../utils/roles";
import { SelectStateTask } from "./SelectStateTask";
import { ButtonDeletefile } from "../files/ButtonDeleteFile";

export const DetailModalTask = () => {
  const [modalShow, setModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [task, setTask] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('taskId');

  const onHide = () => {
    setModalShow(false);
    searchParams.delete("taskId");
    const newSearch = searchParams.toString();
    navigate(newSearch);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${TASK_DETAIL_GET_ENDPOINT}?identificator=${id}`)
        .then((res) => {
          setTask(res.data);
          setModalShow(true)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, refresh]);

  const handleUploadFile = () => {
    dispatch(upload({ id: task.identificator, isproject: "no" }));
    onHide();
  }

  const onClickInEditTask = () => {
    searchParams.delete("taskId");
    let url = `${location.pathname}/taskEdit/${task.identificator}`;
    navigate(url);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cargar archivo
    </Tooltip>
  );

  // Obtener el color del estado de la tarea
  const color = task.status ? task.status: "PENDIENTE";

  return (
    <Modal
    show={modalShow}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header className={`my-modal-header-${color} px-4`} closeButton> {/* Usamos el color del estado de la tarea */}
      <div className={`my-badge-state-${color}`}>DETALLE DE TAREA</div>
    </Modal.Header>
    <Modal.Body className="px-4 pt-5 me-2 ms-2">
      <Row>
        <Col xs="12" className="mb-4">
          <strong className="h3">{task.title}</strong>
        </Col>
        <Col xs="12" className="mb-2">
          <strong>Usuario asignado</strong>
          <p className="text-lg">{task.assignedUser}</p>
        </Col>
        <Col xs="12" className="mb-2">
          <strong>Descripción</strong>
          <p className="text-lg">{task.description}</p>
        </Col>
        <Col xs="12" className="mb-2">
          <strong>Fecha de Inicio</strong>
          <p className="text-lg">{task.creationDate}</p>
        </Col>
        <Col xs="12" className="mb-2">
          <strong>Fecha de finalización</strong>
          <p className="text-lg">{task.finishDate}</p>
        </Col>

        <Col> <strong>Acciones</strong> </Col>
        <Col xs="auto" className="d-flex justify-content-end">
          {/* Validación para mostrar los elementos según el estado de la tarea */}
          {task.status !== 'LISTO' && (
            <>
              <SelectStateTask idTask={task.identificator} statusTask={task.status} onHide={onHide} />
              <PermissionCheck requiredRoles={[roles.DIRECTOR, roles.TEACHER, roles.STUDENT]}>
                <Button
                  type="button"
                  variant="success"
                  className={`my-modal-button-${task.status}`}
                  onClick={onClickInEditTask}
                >
                  Editar
                </Button>
              </PermissionCheck>
            </>
          )}
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer className=" d-flex justify-content-between mb-2 mt-2">

      
      <Row className=" d-flex align-items-center justify-content-between">
        <Col xs="auto">
          <h5 className="mb-0">Archivos</h5>
        </Col>
        </Row>
        <Row>
        <Col xs="auto">
          {/* Validación para mostrar el botón de subir archivos según el estado de la tarea */}
          {task.status !== 'LISTO' && (
            <OverlayTrigger
              
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                className="upload-file-btn"
                variant="ligth"
                style={{ backgroundColor: "#EBEBEB" }}
                onClick={() => handleUploadFile()}
              >
                <Upload />
              </Button>
            </OverlayTrigger>
          )}
        </Col>

      </Row>
      
      {task.files && task.files.length > 0 &&
        <Row >
          <Col xs="12">
          <Table responsive >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descargar</th>
                </tr>
              </thead>
              <tbody>
                  {task.files.map((file, index) => {
                    return (
                      <tr key={index}>
                        <td>{file}</td>
                        <td className="text-end">
                          <ButtonDeletefile
                            refresh={refresh}
                            setRefresh={setRefresh}
                            identificator={task.identificator}
                            isProject={"no"}
                            filename={file}
                          />
                          <ButtonDownloadFile
                            identificator={task.identificator}
                            isProject={"no"}
                            filename={file}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      }
    </Modal.Footer>
  </Modal>
);
};
