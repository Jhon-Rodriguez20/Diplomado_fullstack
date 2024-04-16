import { useState, useEffect } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { dateFormatFrontend } from "../../utils/dateFormatFrontend";
import axios from "axios";
import {
  PROJECT_USER_LIST_GET_ENDPOINT,
  TASK_UPDATE_POST_ENDPOINT,
} from "../../connections/helpers/endpoints";
import { formatDate } from "../../utils/dateFormatBackend";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";
import { useNavigate } from "react-router-dom";
import PermissionCheck from "../PermissionCheck";
import { roles } from "../../utils/roles";

export const FormEditTask = ({ task, idProject }) => {
  const navigate = useNavigate();

  const [errores, setErrores] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  useEffect(() => {
    if (task.title !== undefined) {
      setTitle(task.title);
    }
    if (task.description !== undefined) {
      setDescription(task.description);
    }
    if (task.finishDate !== undefined) {
      setDate(dateFormatFrontend(task.finishDate));
    }
    if (task.emailAssignedUser !== undefined) {
      setSelectedMember(task.emailAssignedUser);
    }
    axios
      .get(`${PROJECT_USER_LIST_GET_ENDPOINT}?identificator=${idProject}`)
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
      });
  }, [task]);

  const handleTaskUpdate = () => {
    const fechaFormateada = formatDate(
      new Date(new Date(date).getTime() + 86400000)
    ); // Sumar 86400000 milisegundos (un día)
    const taskUpdateData = {
      identificatorTask: task.identificator,
      title: title,
      description: description,
      assignedUser: selectedMember,
      finishDate: fechaFormateada,
    };

    axios
      .post(TASK_UPDATE_POST_ENDPOINT, taskUpdateData)
      .then((res) => {
        toast.success("Tarea actualizada", toastConfig);
        console.log(res);
        navigate(`/table/task/${idProject}`);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
      });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="nombreTarea" className="mb-4">
            <FloatingLabel
              controlId="floatingSelect"
              label="Titulo de la tarea"
            >
              <Form.Control
                type="text"
                style={{ height: "50px" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errores.nombre && (
                <Form.Text className="text-danger">{errores.nombre}</Form.Text>
              )}
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="fechaTarea" className="mb-4">
            <FloatingLabel controlId="floatingSelect" label="Fecha Limite">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ height: "50px" }}
              />
              {errores.fecha && (
                <Form.Text className="text-danger">{errores.fecha}</Form.Text>
              )}
            </FloatingLabel>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="cargoTarea" className="mb-4">
        <FloatingLabel controlId="floatlabel3" label="Cargo">
          <Form.Select
            as="select"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            style={{ height: "50px" }}
          >
            {members.map((member) => (
              <option key={member.email} value={member.email}>
                {member.name} {member.lastName}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="descripcionTarea" className="mb-4">
        <FloatingLabel
          controlId="floatingSelect"
          label="Descripción de la tarea"
        >
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{ height: "150px" }}
          />
          {errores.descripcion && (
            <Form.Text className="text-danger">{errores.descripcion}</Form.Text>
          )}
        </FloatingLabel>
      </Form.Group>

      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <PermissionCheck requiredRoles={[roles.DIRECTOR, roles.TEACHER]}>
          <Button
            type="button"
            variant="success"
            className={`my-modal-button-${task.status}`}
            onClick={handleTaskUpdate}
          >
            Confirmar
          </Button>
        </PermissionCheck>
      </div>
    </Form>
  );
};
