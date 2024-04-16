import axios from "axios";
import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { USER_LIST_TEAM_PROJECT_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const ListTeamMembers = ({  onStudentSelect }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProject = searchParams.get("id");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${USER_LIST_TEAM_PROJECT_GET_ENDPOINT}?identificator=${idProject}`)
      .then((res) => {
        setStudents(res.data);
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
    </div>
  );
};
