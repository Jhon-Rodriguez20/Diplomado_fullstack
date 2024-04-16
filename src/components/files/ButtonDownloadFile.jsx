import axios from 'axios';
import { DOWNLOAD_FILE_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { Button } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';

const ButtonDownloadFile = ({ identificator, isProject, filename }) => {

  const downloadFile = async () => {
    try {
      const response = await axios.post(DOWNLOAD_FILE_POST_ENDPOINT, { identificator, isProject, filename }, {
        responseType: 'arraybuffer', // Importante para obtener el archivo como un array de bytes
      });

      // Crear un Blob con los datos del archivo
      const blob = new Blob([response.data]);

      // Crear una URL para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal y hacer clic en él para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Limpiar la URL creada
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
      <Button variant='link' onClick={downloadFile}><Download color='blue' /></Button>
  );
};

export default ButtonDownloadFile;