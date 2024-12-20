import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Row, Col, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../styles/DetalhesEsmalte.css';

const { Title, Text } = Typography;

const DetalhesEsmalte = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [esmalte, setEsmalte] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEsmalte = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/esmalte/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes do esmalte');
                }
                const data = await response.json();
                setEsmalte(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEsmalte();
    }, [id]);

    const handleVoltarClick = () => {
        navigate('/VisualizarEsmaltes');
    };

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', marginBottom: '2px', paddingTop: '20px' }}>Detalhes do Esmalte</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    esmalte && (
                        <div style={{ maxWidth: 1200, width: '100%' }}>
                            <Button
                                type="primary"
                                icon={<ArrowLeftOutlined />}
                                onClick={handleVoltarClick}
                                style={{ marginBottom: '20px' }}
                            >
                                Voltar
                            </Button>

                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div style={{ overflow: 'hidden', borderRadius: '8px', backgroundColor: '#fff', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img
                                            className='foto'
                                            alt={esmalte.nomeesmalte}
                                            src={`http://localhost:3000/${esmalte.fotos}`}

                                        />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Card
                                        bordered={false}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            height: '400px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            padding: '20px'
                                        }}
                                    >
                                        <Title level={2} style={{ marginBottom: '15px', textAlign: 'center' }}>{esmalte.nomeesmalte}</Title>
                                        <div className="esmalte-details">
                                            <Text strong style={{ fontSize: '16px' }}>Marca: {esmalte.marca}</Text>
                                            <Text strong style={{ fontSize: '16px' }}>Cor: {esmalte.cor}</Text>
                                            <Text strong style={{ fontSize: '16px' }}>Tipo: {esmalte.tipoesmalte}</Text>
                                            {esmalte.notas && (
                                                <Text strong style={{ fontSize: '16px' }}>Notas: {esmalte.notas}</Text>
                                            )}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default DetalhesEsmalte;
