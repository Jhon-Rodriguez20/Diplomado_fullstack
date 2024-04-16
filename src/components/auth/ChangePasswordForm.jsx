import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChangePasswordForm = ({ errors, callback, step }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const sendResponse = (e) => {
        e.preventDefault();
        callback(formData);
    }

    return (
        <Form onSubmit={sendResponse} className="px-3">

            <Form.Group className='mt-3 mb-3' controlId='email'>
                <FloatingLabel label='Correo electronico' name='email' type='email' >
                    <Form.Control
                        size="lg"
                        type='email'
                        name="email"
                        placeholder='Correo electrónico'
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={errors.email} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

            {step === 1 &&
                <>
                    <Form.Group className='mt-3 mb-3' controlId='code'>
                        <FloatingLabel label='código' name='code' type='text' >
                            <Form.Control
                                size="lg"
                                type='text'
                                name="code"
                                placeholder='Código'
                                value={formData.code}
                                onChange={handleChange}
                                isInvalid={errors.code} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.code}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </>
            }

            {step === 2 &&
                <>
                    <Form.Group className='mt-3 mb-3' controlId='password'>
                        <FloatingLabel label='Contraseña' name='password' type='password'>
                            <Form.Control
                                size="lg"
                                type='password'
                                name="password"
                                placeholder='Contraseña'
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={errors.password} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='mt-3 mb-3' controlId='repeatPassword'>
                        <FloatingLabel label='Repita la contraseña' name='repeatPassword' type='password'>
                            <Form.Control
                                size="lg"
                                type='password'
                                name="repeatPassword"
                                placeholder='Repita la contraseña'
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                isInvalid={errors.password} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </>}

            <Button type='submit' variant='danger' size="lg" className='mt-3 w-100' style={{ backgroundColor: "#9c0f06", width: "fit-content" }}>
                Enviar
            </Button>
            <div className='mt-3 text-center'>
                <Link to={'/login'}>Regresar</Link>
            </div>
        </Form>
    )
}

export { ChangePasswordForm };
