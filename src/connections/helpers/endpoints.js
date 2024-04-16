const API_URL = "http://localhost:8080";

export const REGISTER_EXTERNAL_POST_ENDPOINT = API_URL + "/user/company/create"; //registro usuarios externos
export const REGISTER_INVITED_POST_ENDPOINT = API_URL + "/user/invited/create"; //registro usuarios invitados
export const LOGIN_POST_ENDPOINT = API_URL + "/login";

export const CAREER_ALL_GET_ENDPOINT = API_URL + "/program/get-all"; //obtener programas academicos
export const ROL_ALL_GET_ENDPOINT = API_URL + "/rol/get-all"; //obtener roles de usuarios

export const USER_DETAIL_POST_ENDPOINT = API_URL + "/user/detail" //obtener el detalle de un usuario
export const USER_LIST_GET_ENDPOINT = API_URL+"/user/list"; //obtener usuarios existentes
export const USER_CREATE_POST_ENDPOINT = API_URL + "/user/create"; //Creacion usuarios internos

export const USER_LIST_TEAM_PROJECT_GET_ENDPOINT = API_URL + "/user/list/project"; //Obtener usuarios para formar el equipo de los proyectos

export const PROPOSAL_LIST_GET_ENDPOINT = API_URL + "/project/list" //Obtener la lista de proyectos o propuestas
export const PROPOSAL_LIST_STATUS_APPROVED_REJECTED_GET_ENDPOINT = API_URL + "/project/list-projects"//Obtener la lista de proyectos o propuestas RECHAZADAS o APROBADAS
export const PROPOSAL_CREATE_POST_ENDPOINT = API_URL + "/project/create" //Creacion de un propuesta de proyecto
export const PROPOSAL_DETAIL_GET_ENDPOINT = API_URL + "/project/detail" //Obtener detalle de proyecto
export const PROPOSAL_EDIT_POST_ENDPOINT = API_URL + "/project/edit" //Editar propuesta de proyecto
export const PROPOSAL_UPDATE_STATES_POST_ENDPOINT = API_URL + "/project/update/status" //Actualizacion de estado propuesta de proyecto

export const TAGS_LIST_TEAM_PROJECT_GET_ENDPOINT = API_URL + "/project/tag/list" //Obtener la lista de tags

export const PROJECT_USER_LIST_GET_ENDPOINT = API_URL + "/project/user/list" //Obtener listado  de integrantes del equipo de trabajo
export const PROJECT_UPDATE_POST_ENDPOINT = API_URL + "/project/edit"  //editar proyecto
export const TAG_PROJECT_DELETE_ENDPOINT = API_URL + "/project/delete/tag" //eliminar un tag de un proyecto
export const USER_PROJECT_DELETE_ENDPOINT = API_URL + "/project/delete/user" //eliminar usuario de un proyecto

export const TASK_PROJECT_CREATE_POST_ENDPOINT = API_URL + "/task/create"
export const LISTTASKS_GET_ENDPOINT= API_URL+"/task/list"; //Obtener lista de tareas
export const TASK_DETAIL_GET_ENDPOINT= API_URL+"/task/detail";
export const TASK_UPDATE_POST_ENDPOINT= API_URL+"/task/update";
export const TASK_UPDATE_STATE_POST_ENDPOINT= API_URL + "/task/status/update"; //Actualizar el estado de una tarea

export const UPLOAD_FILE_POST_ENDPOINT = API_URL + "/file/save"
export const DOWNLOAD_FILE_POST_ENDPOINT= API_URL+"/file/download";
export const DELETE_FILE_DELETE_ENDPOINT= API_URL+"/file/delete";

export const FORGOT_PASS_POST_ENDPOINT = API_URL + "/user/pass/forgot-password"
export const CHANGE_PASS_POST_ENDPOINT = API_URL + "/user/pass/change-password"
export const VALIDATE_CODE_GET_ENDPOINT = API_URL + "/user/pass/validate-code"
