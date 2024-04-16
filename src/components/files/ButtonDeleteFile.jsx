import axios from "axios";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { DELETE_FILE_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";

const ButtonDeletefile = ({ refresh, setRefresh, identificator, isProject, filename }) => {

    const deleteFile = () => {
        axios.delete(DELETE_FILE_DELETE_ENDPOINT, {
            data: { identificator, isProject, filename }
        } )
        .then(res => {
            setRefresh(!refresh);
            toast.info(res.data.message, toastConfig);
        })
        .catch(err => {
            toast.info(err.response.data, toastConfig);
        })
    }

    return (
        <Button variant='link' onClick={deleteFile}><Trash color='red' /></Button>
    );
};

export { ButtonDeletefile };
