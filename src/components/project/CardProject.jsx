import React from "react";
import PropTypes from "prop-types";
import "../../css/style.css"; // Asegúrate de importar tu archivo de estilos aquí
import { useLocation, useNavigate } from "react-router-dom";

function CardProject({ project }) {
  const location = useLocation();
  const navigate = useNavigate();

  const sendIdToUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", project.identificator);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  return (
    <div 
      className={`card card-project card-${project.status.toLowerCase()} my-card-hover`} 
      onClick={sendIdToUrl}
    >
        <div className="card-header border-0"></div>
        <div className="status-indicator">
          <div className={`status-indicator__dot status-${project.status.toLowerCase()}`}>
            <span className="status-text">{project.status}</span>
          </div>
        </div>
        <div className="card-body">
          <h5>{project.company}</h5>
          <p>{project.creationDate}</p>
        </div>
    </div>
  );
}

CardProject.propTypes = {
  project: PropTypes.object.isRequired
};

export default CardProject;
