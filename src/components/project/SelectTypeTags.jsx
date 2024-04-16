import axios from "axios";
import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { useLocation } from "react-router-dom";
import { TAGS_LIST_TEAM_PROJECT_GET_ENDPOINT } from "../../connections/helpers/endpoints";

const SelectTypeTags = ({ onTagsSelect }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProject = searchParams.get("id");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`${TAGS_LIST_TEAM_PROJECT_GET_ENDPOINT}?identificator=${idProject}`)
      .then((res) => {
        const tagsWithSelection = res.data.map((tag) => ({
          ...tag,
          isSelected: false,
        }));
        setTags(tagsWithSelection);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
      });
  }, []);

  const states = {
    "INGENIERIA DE SOFTWARE": "my-badge-career-software",
    "DISEÃ‘O GRAFICO": "my-badge-career-graphic",
    "ADMINISTRACION FINANCIERA": "my-badge-career-financial",
    "DISEÃ‘O DE MODAS": "my-badge-career-fashions",
    "HOTELERIA Y TURISMO": "my-badge-career-tourism",
    "LOGISTICA EMPRESARIAL": "my-badge-career-logistics",
  };

  const handleClick = (index) => {
    const updatedTags = [...tags];
    updatedTags[index].isSelected = !updatedTags[index].isSelected;
    setTags(updatedTags);

    const selectedTags = updatedTags
      .filter((tag) => tag.isSelected)
      .map((tag) => ({ tagName: tag.tagName }));

    onTagsSelect(selectedTags);
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <Badge
          key={index}
          className={`${states[tag.tagName] || ""} ${
            tag.isSelected ? "selected" : ""
          } select-type-tag`}
          style={{
            borderRadius: "50px",
            margin: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleClick(index)}
        >
          {tag.tagName}
        </Badge>
      ))}
    </div>
  );
};

export default SelectTypeTags;
