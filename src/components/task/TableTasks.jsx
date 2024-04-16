import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TableTasks = ({ task }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`?taskId=${task.identificator}`);
  };

  return (
    <tr className="hover-row" onClick={handleClick}>
    <td>{task.title}</td>
    <td>{task.assignedUser}</td>
    <td>{task.finishDate}</td>
    <td>
      {task.status === 'EN PROGRESO' ? (
        <Badge className='my-badge-progress-state'>{task.status}</Badge>
      ) : task.status === 'PENDIENTE' ? (
        <Badge className='my-badge-pending-state'>{task.status}</Badge>
      ) : task.status === 'APROBADO' ? (
        <Badge className='my-badge-appoved-state'>{task.status}</Badge>
      ) : task.status === 'LISTO' ? (
        <Badge className='my-badge-done-state'>{task.status}</Badge>
        ) : 
          task.status === 'PENDIENTE DE VALIDAR' ? (
        <Badge className='my-badge-pendingvalide-state'>{task.status}</Badge>
      ) : (
        <Badge className='my-badge-rejected-state'>{task.status}</Badge>
      )}
    </td>
  </tr>
  );
};

export { TableTasks }