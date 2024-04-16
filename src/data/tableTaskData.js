import document from '../uploads/MANUAL_FESC_2023.pdf';

const tableTaskData = [
    {
        id: 1,
        name: "Revisar código",
        description: "Revisar el código del módulo de autenticación",
        state: "En ejecución",
        manager: "Juan Pérez",
        deliverable: document
    },
    {
        id: 2,
        name: "Diseño UI",
        description: "Diseñar la interfaz de usuario para el nuevo módulo",
        state: "En ejecución",
        manager: "Ana Gómez",
        deliverable: document
    },
    {
        id: 3,
        name: "Configuración DB",
        description: "Configurar la base de datos para el sistema",
        state: "Aprobado",
        manager: "Luis García",
        deliverable: document
    },
    {
        id: 4,
        name: "Pruebas unitarias",
        description: "Realizar pruebas unitarias del componente X",
        state: "Rechazada",
        manager: "María Rodríguez",
        deliverable: document
    },
    {
        id: 5,
        name: "Pruebas unitarias",
        description: "Realizar pruebas unitarias del componente X",
        state: "Pendiente",
        manager: "María Rodríguez",
        deliverable: document
    },
    {
        id: 6,
        name: "Pruebas unitarias",
        description: "Realizar pruebas unitarias del componente X",
        state: "Hecho",
        manager: "María Rodríguez",
        deliverable: document
    },
]

export default tableTaskData;