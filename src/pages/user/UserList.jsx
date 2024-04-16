import { CardViewUsers } from "../../components/user/CardViewUsers";
import { ModalUserDetail } from "../../components/user/ModalUserDetail"; 
import { Container, Row } from "react-bootstrap";
import usePermissionCheck from "../../hooks/usePermissionCheck";
import { roles } from "../../utils/roles";

export const UserList = () => {

  usePermissionCheck([roles.ADMIN]);

  return (
    <Container className="my-3">
      <Row>
        <ModalUserDetail />
      </Row>
      <CardViewUsers />
    </Container>
  );
};
