import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Row, Col, Typography, Button } from 'antd';
import '../styles/DetalhesEsmalte.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DetalhesEsmaltacao = () => {
    const { id } = useParams();
    const [esmaltacao, setEsmaltacao] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEsmaltacao = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/esmaltacao/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes da esmaltação');
                }
                const data = await response.json();
                setEsmaltacao(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEsmaltacao();
    }, [id]);

    const handleVoltarClick = () => {
        navigate('/VisualizarEsmaltacao');
    };

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', marginBottom: '2px', paddingTop: '20px' }}>Detalhes Esmaltação</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    esmaltacao && (
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
                                            alt={esmaltacao.nome}
                                            src={`http://localhost:3000/${esmaltacao.foto}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
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
                                        <Title level={2} style={{ marginBottom: '15px', textAlign: 'center' }}>{esmaltacao.nome}</Title>
                                        <div className="esmalte-details">

                                            {esmaltacao.notas && (
                                                <Text strong style={{ fontSize: '16px' }}>Notas: {esmaltacao.notas}</Text>
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

export default DetalhesEsmaltacao;
