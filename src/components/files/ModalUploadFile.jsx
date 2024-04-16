import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonUploadFile } from "./ButtonUploadFile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { upload } from "../../states/uploadFileReducer";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header className={`my-modal-header-PENDIENTE px-4 mb-4`} closeButton>
      <div className={`my-badge-state-PENDIENTE`}>ARCHIVO</div>
      </Modal.Header>
      <Modal.Body>
        <ButtonUploadFile
          identificator={props.identificator}
          isProject={props.isProject}
          onHide={props.onHide}
        />
      </Modal.Body>
    </Modal>
  );
}

function ModalUploadFile() {
  const [modalShow, setModalShow] = useState(false);
  const id = useSelector((state) => state.upload.id);
  const isproject = useSelector((state) => state.upload.isproject);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setModalShow(id ? true : false);
  }, [id]);


  const handleModalShow = () => {
    if (isproject === "no") {
      navigate(`?taskId=${id}`);
      dispatch(upload({ id: "", isproject: "" }));
    } else if (isproject === "yes") {
      navigate(`?filter=mine&q=${id}`);
      dispatch(upload({ id: "", isproject: "" }));
    }
  };

  return (
    <MyVerticallyCenteredModal
      show={modalShow}
      identificator={id}
      isProject={isproject}
      onHide={() => handleModalShow()}
      
    />
  );
}

export { ModalUploadFile };
