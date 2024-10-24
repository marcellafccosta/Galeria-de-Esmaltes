import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Spin, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/VisualizarEsmaltes.css';
// import DetalhesEsmalte from './DetalhesEsmalte';

const { Meta } = Card;

const VisualizarEsmaltes = () => {
    const [esmaltes, setEsmaltes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/DetalhesEsmalte/${id}`);
    }


    useEffect(() => {
        const fetchEsmaltes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/esmalte');
                if (!response.ok) {
                    throw new Error('Erro ao buscar esmaltes');
                }
                const data = await response.json();
                setEsmaltes(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEsmaltes();
    }, []);

    const handleCadastroClick = () => {
        navigate('/cadastroEsmalte');
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Definindo índices de início e fim para paginação
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentEsmaltes = esmaltes.slice(startIndex, endIndex);

    return (
        <div className="visualizar-esmaltes-container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Esmaltes</h1>
            <Button
                type="primary"
                onClick={handleCadastroClick}
                style={{ marginBottom: '20px' }}
            >
                Cadastrar Novo Esmalte
            </Button>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        {currentEsmaltes.map((esmalte) => (
                            <Col key={esmalte.id}>
                                <Card
                                    hoverable
                                    onClick={() => handleCardClick(esmalte.id)}
                                    cover={
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px", overflow: "hidden" }}>
                                            <img
                                                className='foto'
                                                alt={esmalte.nomeesmalte}
                                                src={`http://localhost:3000/${esmalte.fotos}`}
                                                style={{ height: "100%", width: "auto", objectFit: "cover" }}
                                            />
                                        </div>
                                    }
                                >

                                    <Meta
                                        title={esmalte.nomeesmalte}
                                        description={
                                            <>
                                                <p>Marca: {esmalte.marca}</p>
                                                <p>Cor: {esmalte.cor}</p>
                                                <p>Tipo: {esmalte.tipoesmalte}</p>
                                                {esmalte.notas && <p>Notas: {esmalte.notas}</p>}
                                            </>
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
                            total={esmaltes.length}
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

export default VisualizarEsmaltes;
