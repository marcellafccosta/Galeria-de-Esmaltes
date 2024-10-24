import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Row, Col, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../styles/DetalhesEsmalte.css'; 

const { Title, Text } = Typography;

const DetalhesEsmalte = () => {
    const { id } = useParams(); // Pegando o ID do esmalte da URL
    const navigate = useNavigate(); // Hook para manipular o histórico de navegação
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

    const voltarParaVisualizarEsmaltes = () => {
        navigate('/VisualizarEsmaltes');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
    {loading ? (
        <Spin size="large" />
    ) : (
        esmalte && (
            <div style={{ maxWidth: 1200, width: '100%' }}>
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={voltarParaVisualizarEsmaltes}
                    style={{ marginBottom: '20px' }}
                >
                    Voltar
                </Button>
                <Row gutter={[16, 16]}>
                    <Col>
                        <div style={{ overflow: 'hidden', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                className='foto'
                                alt={esmalte.nomeesmalte}
                                src={`http://localhost:3000/${esmalte.fotos}`}
                                style={{
                                    width: 'fit-content',
                                    height: '300px', // Altura fixa para manter um tamanho consistente
                                    maxWidth: '100%', // Para evitar que ultrapasse o container
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </Col>
                    <Col >
                        <Card
                            bordered={false}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                padding: '20px'
                            }}
                        >
                            <Title level={2} style={{ marginBottom: '15px' }}>{esmalte.nomeesmalte}</Title>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Text strong style={{ fontSize: '16px' }}>Marca: <Text>{esmalte.marca}</Text></Text>
                                <Text strong style={{ fontSize: '16px' }}>Cor: <Text>{esmalte.cor}</Text></Text>
                                <Text strong style={{ fontSize: '16px' }}>Tipo: <Text>{esmalte.tipoesmalte}</Text></Text>
                                {esmalte.notas && (
                                    <Text strong style={{ fontSize: '16px' }}>Notas: <Text>{esmalte.notas}</Text></Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    )}
</div>

    );
};

export default DetalhesEsmalte;
