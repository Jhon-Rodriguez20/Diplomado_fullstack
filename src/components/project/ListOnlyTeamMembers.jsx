import axios from "axios";
import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { PROJECT_USER_LIST_GET_ENDPOINT, USER_PROJECT_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";

const ListOnlyTeamMembers = ({ onStudentSelect }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProject = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`${PROJECT_USER_LIST_GET_ENDPOINT}?identificator=${idProject}`)
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
      });
  }, []);

  const handleStudentClick = (student) => {
    if (selectedStudents.includes(student)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== student));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  useEffect(() => {
    onStudentSelect(selectedStudents);
  }, [selectedStudents]); 

  const handleDeleteUsers = () => {
    const userEmailsToDelete = selectedStudents.map((student) => student.email);

    axios.delete(`${USER_PROJECT_DELETE_ENDPOINT}?projectIdentificator=${idProject}&userEmail=${userEmailsToDelete.join('&userEmail=')}`)
    .then(() => {
      setStudents(students.filter((student) => !selectedStudents.includes(student)));
      setSelectedStudents([]);
    })
    .catch((err) => {
      console.error("Error al eliminar los usuarios:", err);
    });
  };

  const styleButton = {
    fontSize: '100%'
  }

  return (
    <div className="mt-4" style={{ maxHeight: "320px", overflowY: "auto" }}>
      <ListGroup>
        {students.map((student) => (
          <ListGroup.Item
            key={student.email}
            style={{
              cursor: "pointer",
              position: "relative",
              opacity: selectedStudents.includes(student) ? 0.5 : 1,
            }}
            onClick={() => handleStudentClick(student)}
          >
            {student.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedStudents.length > 0 && (
        <div className="text-center mt-3">
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteUsers}
          >
            <MdDelete style={styleButton} className="mx-1"/>Eliminar usuarios
          </Button>
        </div>
      )}
    </div>
  );
};

export { ListOnlyTeamMembers };