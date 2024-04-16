import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { CAREER_ALL_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const SelectProgram = ({ onSelect, errores }) => {
  const [selectedCareer, setSelectedCareer] = useState("");
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios
      .get(CAREER_ALL_GET_ENDPOINT)
      .then((response) => {
        setPrograms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
      });
  }, []);

  const handleCareerChange = (e) => {
    const selected = e.target.value;
    setSelectedCareer(selected);
    onSelect("program", selected);
  };

  return (
    <Form.Select
      style={{ height: "45px" }}
      value={selectedCareer}
      onChange={handleCareerChange}
      aria-label="Default select example"
      isInvalid={errores !== ""}
    >
      <option>Seleccione su programa</option>
      {programs.map((program, index) => (
        <option key={index} value={program.programName}>
          {program.programName}
        </option>
      ))}
    </Form.Select>
  );
};

