import React, { useEffect, useState } from "react";
import CardProject from "../../components/project/CardProject";
import "../../css/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { CreateProposalModal } from "../../components/project/CreateProposalModal";
import axios from "axios";
import validator from "validator";
import { isEmptyObject } from "../../connections/helpers/isEmptyObject";
import {
  PROPOSAL_CREATE_POST_ENDPOINT,
  PROPOSAL_LIST_GET_ENDPOINT,
  PROPOSAL_LIST_STATUS_APPROVED_REJECTED_GET_ENDPOINT,
} from "../../connections/helpers/endpoints";
import { useLocation } from "react-router-dom";
import { ModalProjectDetail } from "../../components/project/ModalProjectDetail";
import { useDispatch, useSelector } from "react-redux";
import { ModalProjectApproved } from "../../components/project/ModalProjectApproved";
import { refresh } from "../../states/pageReducer";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";
import { ModalUploadFile } from "../../components/files/ModalUploadFile";

function ProjectList() {
  const isNeededRefresh = useSelector((state) => state.page.isNeededRefresh);
  const [projects, setProjects] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter");
  const filterStatus = searchParams.get("filterStatus");

  useEffect(() => {
    axios
      .get(`${PROPOSAL_LIST_GET_ENDPOINT}?isAll=${!filter ? true : false}`)
      .then((res) => setProjects(res.data))
      .catch((err) => {});
  }, [filter, isNeededRefresh]);

  useEffect(() => {
    if (filterStatus !== null) {
      let isApproved;
  
      if (filterStatus === "rejected") {
        isApproved = false;
      } else if (filterStatus === "approved") {
        isApproved = true;
      } 
  
      axios
        .get(
          `${PROPOSAL_LIST_STATUS_APPROVED_REJECTED_GET_ENDPOINT}?approved=${isApproved}`
        )
        .then((res) => setProjects(res.data))
        .catch((err) => {});
    }
  }, [filterStatus, isNeededRefresh]);

  const createProposal = async (proposal) => {
    const error = {};

    if (validator.isEmpty(proposal.valueProposal)) {
      error.valueProposal = "El valor de la propuesta no puede estar vacio";
    }

    if (validator.isEmpty(proposal.description)) {
      error.description = "La descripcion no puede estar vacia";
    }

    if (!isEmptyObject(error)) {
      toast.error(`Error: ${error}`, toastConfig);
    } else {
      const token = localStorage.getItem("token");
      axios
        .post(PROPOSAL_CREATE_POST_ENDPOINT, proposal, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Propuesta creada con exito", toastConfig);

          dispatch(refresh({ isNeededRefresh: !isNeededRefresh }));
        })
        .catch((err) => {
          toast.error(`Error: ${err.response.data}`, toastConfig);
        });
    }
  };



  return (
    <div className="cards-container">
      <Container className="mt-5">
        <h2 className="titleCard">
          <strong>Proyectos</strong>
        </h2>
        <ModalProjectApproved />
        <ModalProjectDetail />
        <CreateProposalModal callback={createProposal} />
        <Row>
          {projects &&
            projects.map((project, index) => (
              <Col
                key={index}
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={3}
                className="mb-4"
              >
                <CardProject project={project} />
              </Col>
            ))}
        </Row>
        <ModalUploadFile/>
      </Container>
    </div>
  );
}

export { ProjectList };
