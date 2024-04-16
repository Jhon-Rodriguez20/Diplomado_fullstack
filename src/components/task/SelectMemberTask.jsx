import { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { PROJECT_USER_LIST_GET_ENDPOINT } from "../../connections/helpers/endpoints";

import axios from "axios";

export const SelectMemberTask = ({ idProject, value, onChange, errores }) => {
  const [MembersProject, setMembersProject] = useState([]);

  useEffect(() => {
    axios
      .get(`${PROJECT_USER_LIST_GET_ENDPOINT}?identificator=${idProject} `)
      .then((res) => {
        setMembersProject(res.data);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
      });
  }, []);

  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Form.Group controlId="cargoTarea" className="mb-4">
      <FloatingLabel controlId="floatlabel3" label="Cargo">
        <Form.Select
          as="select"
          value={value}
          onChange={handleSelectChange}
          style={{ height: "50px" }}
        >
          <option value="">Seleccione un cargo</option>
          {MembersProject.map((member) => (
            <option key={member.email} value={member.email}>
              {member.name}
              {member.lastName}
            </option>
          ))}
        </Form.Select>
        {errores && <Form.Text className="text-danger">{errores}</Form.Text>}
      </FloatingLabel>
    </Form.Group>
  );
};
