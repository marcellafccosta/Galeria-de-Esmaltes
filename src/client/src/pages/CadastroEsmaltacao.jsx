import React, { useState } from 'react';
import '../styles/Cadastro.css';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CadastroEsmaltacao = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        notas: '',
        foto: '',
        esmalte_id: '',
    });


    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onFinish = async (values) => {
        
        const formDataToSend = new FormData();
        formDataToSend.append('nome', values.nome);
        formDataToSend.append('notas', values.notas);
    
        // Certifique-se de que o nome do campo é "fotos"
        if (fileList.length > 0) {
            formDataToSend.append('foto', fileList[0].originFileObj);
        } else {
            message.error('Nenhuma foto foi selecionada');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/esmaltacao', {
                method: 'POST',
                body: formDataToSend,
            });
    
            if (response.ok) {
                message.success('Esmalte cadastrado com sucesso!');
                form.resetFields();
                setFileList([]);
                navigate('/visualizarEsmaltacao');
            } else {
                const errorData = await response.json();
                console.error('Erro no servidor:', errorData);
                message.error('Falha ao cadastrar esmaltacao: ' + errorData.error);
            }
        } catch (error) {
            message.error('Falha ao cadastrar esmaltacao. Tente novamente.');
        }
    };
    
    
    
    
    // Definindo a função handleViewEsmaltesClick corretamente
    const handleViewEsmaltacoesClick = () => {
        navigate('/visualizarEsmaltacao');
    };

    return (
        <Form
            form={form}
            name="registerEsmaltacao"
            onFinish={onFinish}
            initialValues={{}}
            style={{
                maxWidth: 400,
                margin: '0 auto',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="nome"
                label="Nome"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira o nome do esmaltacao!',
                    },
                ]}
            >
                <Input placeholder="Digite o nome do esmaltacao" />
            </Form.Item>


            <Form.Item
                name="foto"
                label="Foto"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, selecione uma foto!',
                    },
                ]}
            >

                <Upload
                    listType="picture"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                >
                    <Button icon={<UploadOutlined />}>Selecione uma imagem</Button>
                </Upload>

            </Form.Item>

            <Form.Item
                name="notas"
                label="Notas"
            >
                <Input.TextArea placeholder="Notas ou observações sobre a esmaltacao" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Cadastrar Esmaltação
                </Button>
                <div className='visualizarEsmaltacoes' style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Button type="link" onClick={handleViewEsmaltacoesClick}>
                        Visualizar Esmaltações
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default CadastroEsmaltacao;
