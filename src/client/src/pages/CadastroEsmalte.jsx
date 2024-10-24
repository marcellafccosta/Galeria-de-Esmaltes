import React, { useState } from 'react';
import '../styles/Cadastro.css';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CadastroEsmalte = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [formData, setFormData] = useState({
        nomeesmalte: '',
        marca: '',
        cor: '',
        tipoesmalte: '',
        notas: '',
        fotos: ''
    });

    const predefinedColors = ['Vermelho', 'Azul', 'Rosa', 'Verde', 'Amarelo', 'Preto', 'Branco', 'Laranja'];

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onFinish = async (values) => {
        
        const formDataToSend = new FormData();
        formDataToSend.append('nomeesmalte', values.nomeesmalte);
        formDataToSend.append('marca', values.marca);
        formDataToSend.append('cor', values.cor);
        formDataToSend.append('tipoesmalte', values.tipoesmalte);
        formDataToSend.append('notas', values.notas);
    
        // Certifique-se de que o nome do campo é "fotos"
        if (fileList.length > 0) {
            formDataToSend.append('fotos', fileList[0].originFileObj);
        } else {
            message.error('Nenhuma foto foi selecionada');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/esmalte', {
                method: 'POST',
                body: formDataToSend,
            });
    
            if (response.ok) {
                message.success('Esmalte cadastrado com sucesso!');
                form.resetFields();
                setFileList([]);
                navigate('/visualizarEsmaltes');
            } else {
                const errorData = await response.json();
                console.error('Erro no servidor:', errorData);
                message.error('Falha ao cadastrar esmalte: ' + errorData.error);
            }
        } catch (error) {
            message.error('Falha ao cadastrar esmalte. Tente novamente.');
        }
    };
    
    
    
    
    // Definindo a função handleViewEsmaltesClick corretamente
    const handleViewEsmaltesClick = () => {
        navigate('/visualizarEsmaltes');
    };

    return (
        <Form
            form={form}
            name="registerEsmalte"
            onFinish={onFinish}
            initialValues={{}}
            style={{
                maxWidth: 400,
                margin: '0 auto',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="nomeesmalte"
                label="Nome do Esmalte"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira o nome do esmalte!',
                    },
                ]}
            >
                <Input placeholder="Digite o nome do esmalte" />
            </Form.Item>

            <Form.Item
                name="marca"
                label="Marca"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira a marca do esmalte!',
                    },
                ]}
            >
                <Input placeholder="Digite a marca do esmalte" />
            </Form.Item>

            <Form.Item
                name="cor"
                label="Cor"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, selecione ou insira a cor do esmalte!',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecione ou digite a cor"
                    optionFilterProp="children"
                    allowClear
                    filterOption={(input, option) =>
                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <div style={{ padding: 8 }}>
                                <Input
                                    placeholder="Digite a cor"
                                    onPressEnter={(e) => {
                                        const value = e.target.value;
                                        if (value) {
                                            form.setFieldsValue({ cor: value });
                                        }
                                    }}
                                />
                            </div>
                        </>
                    )}
                >
                    {predefinedColors.map((color) => (
                        <Option key={color} value={color}>{color}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="tipoesmalte"
                label="Tipo de Esmalte"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, selecione o tipo de esmalte!',
                    },
                ]}
            >
                <Select placeholder="Selecione o tipo de esmalte">
                    <Option value="Cremoso">Cremoso</Option>
                    <Option value="Cintilante">Cintilante</Option>
                    <Option value="Metalico">Metálico</Option>
                    <Option value="Fosco">Fosco</Option>
                    <Option value="Glitter">Glitter</Option>
                    <Option value="Holografico">Holográfico</Option>
                    <Option value="Perolado">Pérolado</Option>
                    <Option value="Gel">Gel</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="fotos"
                label="Fotos"
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
                <Input.TextArea placeholder="Notas ou observações sobre o esmalte" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Cadastrar Esmalte
                </Button>
                <div className='visualizarEsmaltes' style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Button type="link" onClick={handleViewEsmaltesClick}>
                        Visualizar Esmaltes
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default CadastroEsmalte;
