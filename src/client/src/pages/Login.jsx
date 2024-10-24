import React from 'react';
import '../styles/Login.css';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Aqui você pode adicionar a lógica de autenticação
        // Se a autenticação for bem-sucedida, navegue para a página inicial ou dashboard
        navigate('/dashboard');
    };

    const handleRegisterClick = () => {
        navigate('/cadastro'); // Navega para a página de cadastro
    };

    return (
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{}}
            style={{
                maxWidth: 400,
                margin: '0 auto', // Centraliza o formulário
            }}
            scrollToFirstError
        >
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
                <Input />
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
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Entrar
                </Button>
                <div className='naoPossuiConta' style={{ marginTop: '10px', textAlign: 'center' }}>
                    Não possui uma conta?{' '}
                    <Button type="link" onClick={handleRegisterClick}>
                        Cadastre-se
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default Login;
