import { Button } from "react-bootstrap";
import axios from "axios";
import { PROPOSAL_UPDATE_STATES_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../states/pageReducer";

export const ButtonProjectReject = ({ project, onHide }) => {

  const isNeededRefresh = useSelector(state => state.page.isNeededRefresh);
  const dispatch = useDispatch();

  const handleButtonClickReject = () => {
    const projectDataReject = {
        identificator: project.identificator,
        status: "RECHAZADO"
    };

    axios
      .post(PROPOSAL_UPDATE_STATES_POST_ENDPOINT, projectDataReject )
      .then((res) => {
        onHide();
        dispatch(refresh({ isNeededRefresh: !isNeededRefresh }));
      })
      .catch((err) => {
        onHide();
        console.error("Error al RECHAZAR proyecto:", err);
      });
  };

  return (
    <Button
      type="button"
      variant="danger"
      className="my-modal-button me-2"
      onClick={handleButtonClickReject}
    >
      Rechazar
    </Button>

    
  );
};
