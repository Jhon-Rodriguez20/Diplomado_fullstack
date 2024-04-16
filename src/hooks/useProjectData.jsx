import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { PROPOSAL_DETAIL_GET_ENDPOINT } from "../connections/helpers/endpoints";

export function useProjectData() {
  const [project, setProject] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProject = searchParams.get("id");

  useEffect(() => {
    if (idProject) {
      axios
        .get(`${PROPOSAL_DETAIL_GET_ENDPOINT}?identificator=${idProject}`)
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [idProject, location]);

  return project;
}
