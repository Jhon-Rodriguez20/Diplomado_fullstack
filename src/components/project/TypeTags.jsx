import axios from "axios";
import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { PROPOSAL_DETAIL_GET_ENDPOINT, TAG_PROJECT_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";

const TypeTags = ({ onTagsSelect }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idProject = searchParams.get("id");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
      axios
        .get(`${PROPOSAL_DETAIL_GET_ENDPOINT}?identificator=${idProject}`)
        .then((res) => {
          setTags(res.data.tags);
          setSelectedTags(res.data.tags.filter(tag => tag.isSelected).map(tag => tag.tagName));
        })
        .catch((err) => {
          console.error("Error al obtener datos:", err);
        });
    }, []);

    const handleDeleteAllTags = () => {
      // Obtiene los nombres de todos los tags seleccionados
      const tagsToDelete = tags.filter(tag => tag.isSelected).map(tag => tag.tagName);

      // Construye la URL para la eliminación de tags
      const deleteURL = `${TAG_PROJECT_DELETE_ENDPOINT}?${tagsToDelete.map(tag => `tag=${tag}`).join('&')}&projectIdentificator=${idProject}`;

      axios.delete(deleteURL)
        .then(() => {
          // Actualiza el estado de los tags después de eliminarlos
          const updatedTags = tags.filter(tag => !tag.isSelected);
          setTags(updatedTags);

          // Actualiza los tags seleccionados
          const updatedSelectedTags = updatedTags.filter(tag => tag.isSelected).map(tag => tag.tagName);
          setSelectedTags(updatedSelectedTags);
          onTagsSelect(updatedSelectedTags);
        })
        .catch((err) => {
          console.error("Error al eliminar los tags:", err);
        });
    };
  
    const states = {
      "INGENIERIA DE SOFTWARE": "my-badge-career-software",
      "DISEÑO GRAFICO": "my-badge-career-graphic",
      "ADMINISTRACION FINANCIERA": "my-badge-career-financial",
      "DISEÑO DE MODAS": "my-badge-career-fashions",
      "HOTELERIA Y TURISMO": "my-badge-career-tourism",
      "LOGISTICA EMPRESARIAL": "my-badge-career-logistics",
    };
  
    const handleClick = (index) => {
      const updatedTags = [...tags];
      updatedTags[index].isSelected = !updatedTags[index].isSelected;
      setTags(updatedTags);
  
      const updatedSelectedTags = updatedTags.filter(tag => tag.isSelected).map(tag => tag.tagName);
      setSelectedTags(updatedSelectedTags);
      onTagsSelect(updatedSelectedTags);
    };

    const styleButton = {
      fontSize: '100%'
    }

    return (
      <div>
        {tags.map((tag, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <Badge
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
          </div>
        ))}
        {selectedTags.length > 0 && (
          <>
          <div className="text-center">
            <Button
              variant="danger"
              size="sm"
              className="mt-2 mb-2"
              onClick={handleDeleteAllTags}
            >
              <MdDelete style={styleButton} className="mx-1"/> Eliminar Tags
            </Button>
          </div>
          </>
        )}
      </div>
    );
};

export default TypeTags;