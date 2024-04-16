import axios from "axios";
import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { USER_LIST_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const ListDirectorProject = ({ ondirectorselect }) => {
  const [selecteddirectors, setSelecteddirectors] = useState([]);

  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    axios
      .get(`${USER_LIST_GET_ENDPOINT}?roles=DIRECTOR`)
      .then((res) => {
        setDirectors(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
      });
  }, []);


  const handleDirectorClick = (directorUser) => {   
    setSelecteddirectors(directorUser);
    ondirectorselect(directorUser.email);
  };



  return (
    <>
      <div className="mt-2" style={{ maxHeight: "320px", overflowY: "auto" }}>
        <ListGroup>
          {directors.map((director) => (
            <ListGroup.Item
              key={director.email}
              style={{
                cursor: "pointer",
                backgroundColor:
                selecteddirectors === director ? "#f0f0f0" : "white",
              }}
              onClick={() => handleDirectorClick(director)}
            >
              {director.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
     
    </>
  );
};
