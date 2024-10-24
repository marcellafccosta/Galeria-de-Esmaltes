import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Spin, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/VisualizarEsmaltes.css';

const { Meta } = Card;

const VisualizarEsmaltacao = () => {
    const [esmaltacoes, setEsmaltacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/DetalhesEsmaltacao/${id}`);
    };

    useEffect(() => {
        const fetchEsmaltacoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/esmaltacao');
                if (!response.ok) {
                    throw new Error('Erro ao buscar esmaltacao');
                }
                const data = await response.json();
                setEsmaltacoes(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEsmaltacoes();
    }, []);

    const handleCadastroClick = () => {
        navigate('/CadastroEsmaltacao');
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentEsmaltes = esmaltacoes.slice(startIndex, endIndex);

    const determineImageClass = (width, height) => {
        if (width > height) {
            return 'horizontal';
        } else if (height > width) {
            return 'vertical';
        } else {
            return '';
        }
    };

    return (
        <div className="visualizar-container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Esmaltações</h1>
            <Button
                type="primary"
                onClick={handleCadastroClick}
                style={{ marginBottom: '20px' }}
            >
                Cadastrar Nova Esmaltação
            </Button>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        {currentEsmaltes.map((esmaltacao) => (
                            <Col key={esmaltacao.id} span={6}>
                                <Card
                                    hoverable
                                    onClick={() => handleCardClick(esmaltacao.id)}
                                    cover={
                                        <div className="image-container">
                                            <img
                                                className={'foto'}
                                                alt={esmaltacao.nome}
                                                src={`http://localhost:3000/${esmaltacao.foto}`}
                                            />
                                        </div>
                                    }
                                >
                                    <Meta
                                        title={esmaltacao.nome}
                                        description={
                                            <div>
                                                {esmaltacao.notas && <p>Notas: {esmaltacao.notas}</p>}
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="pagination-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={esmaltacoes.length}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['8', '16', '24']}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default VisualizarEsmaltacao;
