import usersData from "../data/usersData";
import { useState, useEffect } from "react";

export const TableViewUsers = () => {
  const initialUsers = usersData;
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole]);

  const filterUsers = () => {
    let filteredUsers = initialUsers;

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole) {
      filteredUsers = filteredUsers.filter(
        (user) => user.rol.toLowerCase() === selectedRole.toLowerCase()
      );
    }

    setUsers(filteredUsers);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control custom-input-margin"
        />
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="form-select"
        >
          <option>-- Selecciona un Rol --</option>
          <option value="Administrador">Administrador</option>
          <option value="Aprobador">Aprobador</option>
          <option value="Director">Director</option>
          <option value="Docente">Docente</option>
          <option value="Estudiante">Estudiante</option>
        </select>
      </div>

      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo Electronico</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
