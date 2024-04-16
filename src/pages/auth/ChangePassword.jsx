import { Card, Container } from "react-bootstrap";
import { ChangePasswordForm } from "../../components/auth/ChangePasswordForm";
import { useState } from "react";
import validator from "validator";
import { isEmptyObject } from "../../connections/helpers/isEmptyObject";
import axios from "axios";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASS_POST_ENDPOINT, FORGOT_PASS_POST_ENDPOINT, VALIDATE_CODE_GET_ENDPOINT } from "../../connections/helpers/endpoints";

const ChangePassword = () => {
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    const changePassword = (data) => {
        const error = {};

        if (validator.isEmpty(data.email)) {
            error.email = "El correo no puede estar vacío";
        }

        if (step === 1 && validator.isEmpty(data.code)) {
            error.code = "El código no puede estar vacío";
        }

        if (step === 2 && !validator.isLength(data.password, { min: 8, max: 30 })) {
            error.password = "La contraseña debe tener entre 8 y 30 caracteres";
        }
      
        if (step === 2 && data.password !== data.repeatPassword) {
            error.password = "Las contraseñas debe coincidir";
        }

        if (!isEmptyObject(error)) {
            setErrors(error);
        } else {
            switch (step) {
                case 0:
                    forgot(data);
                    break;
                case 1:
                    validate(data);
                    break;
                case 2:
                    change(data);
                    break;
            }
        }
    };

    const forgot = (data) => {
        axios.post(FORGOT_PASS_POST_ENDPOINT, { email: data.email })
            .then(res => {
                setStep(step + 1);
                toast.info(res.data.mensaje, toastConfig);
            })
            .catch(err => {
                toast.error(`Error: ${err.response.data}`, toastConfig);
            });
    }

    const validate = (data) => {
        axios.get(`${VALIDATE_CODE_GET_ENDPOINT}?codePass=${data.code}`)
            .then(res => {
                setStep(step + 1);
                toast.info(res.data.mensaje, toastConfig);
            })
            .catch(err => {
                toast.error(`Error: ${err.response.data}`, toastConfig);
            });
    }

    const change = (data) => {
        axios.post(CHANGE_PASS_POST_ENDPOINT, { email: data.email, password: data.password })
            .then(res => {
                navigate("/login");
            })
            .catch(err => {
                toast.error(`Error: ${err.response.data}`, toastConfig);
            });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card body>
                <h5 className="px-3">Cambiar contraseña</h5>
                <ChangePasswordForm 
                    errors={errors} 
                    callback={changePassword} 
                    step={step}
                />
            </Card>
        </Container>
    );
}

export { ChangePassword };
