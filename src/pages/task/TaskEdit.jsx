import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FormEditTask } from "../../components/task/FormEditTask";
import axios from "axios";
import { TASK_DETAIL_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const TaskEdit = () => {
  const { identificator } = useParams();
  const { taskId } = useParams();
  const [task, setTask] = useState({})

  useEffect(() => {
    axios
      .get(`${TASK_DETAIL_GET_ENDPOINT}?identificator=${taskId}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((err) => {
        console.error("Error al traer las tareas ", err);
      });
  }, [identificator, taskId]);




  return (
    <div className="cards-container">
      <Container className="mt-5">
        <Row>
          <Col xs="12" md="8" className="mt-1 mx-auto">
            <Card>
              <Card.Header className={`my-header-project-${task.status} mb-4`}>
              <div className={`my-badge-state-${task.status}`}>EDITAR TAREA</div>
              </Card.Header>
              <Card.Body>
                <FormEditTask idProject={identificator} task={task} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
