import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { USER_CREATE_POST_ENDPOINT, USER_LIST_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { SelectUserRolFilter } from "./SelectUserRolFilter"; 
import IconRolAdmin from "../../img/icon-roles/IconRolAdmin.png";
import iconRolDirector from "../../img/icon-roles/IconRolDirector.png";
import IconRolEstudiante from "../../img/icon-roles/IconRolEstudiante.png";
import IconRolEmpresa from "../../img/icon-roles/IconRolEmpresa.png";
import IconRolDocente from "../../img/icon-roles/IconRolDocente.png";
import IconRolUsuario from "../../img/icon-roles/IconRolUsuario.png";
import IconRolValidador from "../../img/icon-roles/IconRolValidador.png";
import { CreateUserForm } from "./CreateUserForm";
import validator from "validator";
import { refresh } from "../../states/pageReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";

export const CardViewUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [colWidth, setColWidth] = useState("400px");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  
  const isNeededRefresh = useSelector(state => state.page.isNeededRefresh);
  const dispatch = useDispatch();

  const handleCheckboxChange = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
  };

  useEffect(() => {
    fetchUsers(selectedRoles);
  }, [selectedRoles]);

  const fetchUsers = (selectedRoles) => {
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const rolesQueryString =
      selectedRoles.length > 0 ? `?roles=${selectedRoles.join("&roles=")}` : "";

    const url = USER_LIST_GET_ENDPOINT + rolesQueryString;

    axios.get(url).then((res) => setUsuarios(res.data)).catch((err) => console.error(err));
  };

  useEffect(() => {
    const handleResize = () => {
      setColWidth(window.innerWidth <= 768 ? "100%" : "400px");
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchUsers([]);
  }, []);

  const createUser = async (user) => {

    setErrorMessage(null);
    const error = {};

    if (validator.isEmpty(user.name)) {
      error.name = "El nombre no puede estar vacio";
    }

    if (validator.isEmpty(user.lastName)) {
      error.lastName = "El apellido no puede estar vacio";
    }

    if (!validator.isEmail(user.email)) {
      error.email = "El correo electronico es invalido";
    }

    if (validator.isEmpty(user.cellPhone)) {
      error.cellPhone = "El telefono no puede estar vacio";
    }

    if (!validator.isLength(user.password, { min: 6, max: 30 })) {
      error.password = "La contraseña debe tener entre 6 y 30 caracteres";
    }

    if (user.password !== user.repeatPassword) {
      error.password = "Las contraseñas deben coincidir";
    }

    if (validator.isEmpty(user.program)) {
      error.program = "Tiene que asignar una carrera";
    }

    if (validator.isEmpty(user.rol)) {
      error.rol = "Tiene que asignar un rol";
    }

    const token = localStorage.getItem("token");
    axios.post(USER_CREATE_POST_ENDPOINT, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("Usuario creado con exito", toastConfig);
        fetchUsers([]);
        dispatch(refresh({ isNeededRefresh: !isNeededRefresh }));
      })
      .catch((err) => {
        toast.error(err.response.data, toastConfig);
        setErrorMessage(err.response.data) });
  };

 
  const renderUserIcon = (rol) => {
    const iconMap = {
      admin: IconRolAdmin,
      director: iconRolDirector,
      validador: IconRolValidador,
      estudiante: IconRolEstudiante,
      empresa: IconRolEmpresa,
      docente: IconRolDocente,
      usuario: IconRolUsuario,
    };

    const IconComponent = iconMap[rol.toLowerCase()];

    return (
      IconComponent && (
        <img
          src={IconComponent}
          className="img-fluid"
          width={50}
          height={50}
          alt={`Icono de ${rol}`}
        />
      )
    );
  };


  return (
    <>
      <Row className="gx-5 mx-2 mt-2 p-2 align-items-center">
        <Col xs={12} md={6}>
          <h3>Usuarios</h3>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-end align-items-center"
        >
          <SelectUserRolFilter
            onRolesChange={handleCheckboxChange}
            className="me-2"
          />
          <CreateUserForm errors={errors} callback={createUser} />
        
        </Col>
      </Row>

      <Row className=" d-flex justify-content-center">
        {usuarios.map((usuario, index) => (
          <Col
            style={{
              width: colWidth,
            }}
            key={index}
            xs={12}
            md={6}
            lg={4}
            className="my-card-hover rounded border mt-2 me-1 mb-2"
          >
            <Link
              to={`/user?q=${usuario.email}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="d-flex text-body-secondary pt-3 pb-3">
                {renderUserIcon(usuario.rol)}
                <div className="px-3 mb-0 ">
                  <div className="d-flex justify-content-between">
                    <h6>
                      <strong className="text-dark">{usuario.name}</strong>
                    </h6>
                  </div>
                  <span className="d-block">{usuario.email}</span>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
