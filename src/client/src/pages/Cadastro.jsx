import React, { useState } from 'react';
import '../styles/Cadastro.css';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        nomeusuario: '',
        email: '',
        senha: ''
    });

    const onFinish = async (values) => { 
        try {
            const response = await fetch('http://localhost:3000/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar usuário');
            } else {
                alert('Usuário cadastrado com sucesso!');
                setFormData({
                    nomeusuario: '',
                    email: '',
                    senha: ''
                });
                form.resetFields(); // Reseta os campos do formulário
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish} // Utiliza a função onFinish para enviar o formulário
            initialValues={{}}
            style={{
                maxWidth: 400,
                margin: '0 auto', 
            }}
            scrollToFirstError
        >
            <Form.Item
                name="nomeusuario"
                label="Nome"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira seu nome!',
                    },
                ]}
            >
                <Input placeholder="Digite seu nome" />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'O e-mail não é válido!',
                    },
                    {
                        required: true,
                        message: 'Por favor, insira seu e-mail!',
                    },
                ]}
            >
                <Input placeholder="Digite seu e-mail" />
            </Form.Item>

            <Form.Item
                name="senha"
                label="Senha"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira sua senha!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Digite sua senha" />
            </Form.Item>

            <Form.Item
                name="confirmarSenha"
                label="Confirmar Senha"
                dependencies={['senha']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor, confirme sua senha!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('senha') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('As senhas não correspondem!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirme sua senha" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Cadastrar
                </Button>
                <div className='possuiConta' style={{ marginTop: '10px', textAlign: 'center' }}>
                    Já possui uma conta?{' '}
                    <Button type="link" onClick={handleLoginClick}>
                        Login
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default Cadastro;
