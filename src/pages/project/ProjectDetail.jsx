import { Col, Container, Row } from "react-bootstrap";
import { useProjectData } from "../../hooks/useProjectData";
import { ProjectInformation } from "../../components/project/ProjectInformation"; 
import usePermissionCheck from "../../hooks/usePermissionCheck";
import { roles } from "../../utils/roles";
import { useNavigate } from "react-router-dom";

export const ProjectDetail = () => {
  usePermissionCheck([roles.DIRECTOR]);
  const navigate = useNavigate();
  const project = useProjectData();

  if (project.status !== "APROBADO" && project.status !== "EN PROGRESO") {
    navigate("/");
  }

  return (
    <div className="cards-container">
      <Container className="mt-5">
        <Row>
          <Col xs="12" md="8" className="mt-1 mx-auto">
            <ProjectInformation />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
