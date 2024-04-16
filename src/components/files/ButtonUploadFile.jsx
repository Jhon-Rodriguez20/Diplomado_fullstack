import axios from "axios";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { UPLOAD_FILE_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";

const ButtonUploadFile = ({ identificator, isProject, onHide }) => {
  const [formData, setFormData] = useState({
    identificator: identificator, // Identificador estático
    isProject: isProject, // Booleano estático
    files: [] // Cambiado a un array para almacenar múltiples archivos
  });

  console.log(formData)

  const handleFileChange = (event) => {
    setFormData({ ...formData, files: [...formData.files, ...event.target.files] }); // Agregar archivos al array
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('identificator', formData.identificator);
    formDataToSend.append('isProject', formData.isProject);

    // Si isProject es falso, enviar múltiples archivos
    if (!formData.isProject) {
      formData.files.forEach(file => {
        formDataToSend.append('file', file); // Agregar cada archivo al FormData
      });
    } else {
      formDataToSend.append('file', formData.files[0]); // Si es un proyecto, enviar solo el primer archivo
    }

    axios.post(UPLOAD_FILE_POST_ENDPOINT, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response)
      onHide();
      // Aquí puedes manejar la respuesta de la petición según tus necesidades
    })
    .catch(error => {
      console.error('Error:', error);
      onHide();
      toast.error(error.response.data, toastConfig);
      // Aquí puedes manejar el error de la petición según tus necesidades
    });
  };

  return (
    <Form onSubmit={handleSubmit}  className="me-2 mx-2">
      <Col>
      <Form.Group controlId="formFile" className="mb-4">
        <Form.Label >Selecciona tu archivo .pdf o .doc</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} multiple={true} /> {/* Permitir la selección de múltiples archivos */}
      </Form.Group>
      </Col>
      <Col className="d-flex justify-content-end ">
      <Button className="my-modal-button-approve" type="submit">Subir</Button>
      </Col>
    </Form>
  );
};

export { ButtonUploadFile };
