import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { USER_DETAIL_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";


function MyVerticallyCenteredModal(props) {


  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="my-modal-header px-4" closeButton>
          <div className="my-badge-state">{props.user.rol}</div>
        </Modal.Header>
        <Modal.Body className="px-4 pt-5">
          <Row>
            <Col xs="12" className="mb-4">
              <strong className="h3">
                {props.user.name} {props.user.lastName}
              </strong>
            </Col>
            <Col xs="12" sm="6">
              <strong>Correo</strong>
            </Col>
            <Col xs="12" sm="6" className="text-sm-end">
              <p>{props.user.email}</p>
            </Col>
            <Col xs="12" sm="6">
              <strong>Telefono</strong>
            </Col>
            <Col xs="12" sm="6" className="text-sm-end">
              <p>{props.user.cellPhone || "No tiene"}</p>
            </Col>
            {props.user.companyName && (
              <>
                <Col xs="12" sm="6">
                  <strong>Empresa</strong>
                </Col>
                <Col xs="12" sm="6" className="text-sm-end">
                  <p>{props.user.companyName}</p>
                </Col>
              </>
            )}
            {props.user.program && (
              <>
                <Col xs="12" sm="6">
                  <strong>Programa</strong>
                </Col>
                <Col xs="12" sm="6" className="text-sm-end">
                  <p>{props.user.program}</p>
                </Col>
              </>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

function ModalUserDetail() {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (q) {
      axios
        .get(`${USER_DETAIL_POST_ENDPOINT}?email=${q}`)
        .then((res) => {
          setUser(res.data);
          setModalShow(true);
        })
        .catch((err) => {
          setModalShow(false);
          toast.error(`Error: ${err.response.data}`, toastConfig);
        });
    }
  }, [q, location]);

  const hideModal = () => {
    setModalShow(false);
    searchParams.delete("q");
    const newSearch = searchParams.toString();
    const newPath = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname;
    navigate(newPath);
  };

  return (
    <MyVerticallyCenteredModal
      user={user}
      show={modalShow}
      onHide={() => hideModal()}
    />
  );
}

export { ModalUserDetail };
