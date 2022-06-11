import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, Button, Badge, Row, Col } from 'react-bootstrap'
import useAuth from './hooks/useAuth';
import getStatus from './utils/status';

export default function ProductsDonor() {
    const [user, setUser] = useAuth();

    const [products, setProducts] = useState([]);

    function handleStatus(status) {
        return getStatus(status)
    }

    function handleAccept(product, status) {

        const payload = {
            status,
        }

        api.patch(`/products/${product?.product_id}/`, payload).then(res => {
            window.history.go('/meus-produtos')
            console.log({ res })
        }).catch(err => {
            console.log({ err })
        })
    }

    useEffect(() => {
        async function loadProducts() {
            const res = await api.get(`/products/${user?.user_id}/donations`, {
                headers: {
                    "Content-type": "application/json",
                }
            })
            setProducts(res.data)
        }
        loadProducts()
    }, [])


    return (
        <div className="mt-5 d-flex justify-content-left" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Row xs={1} md={2} className="g-4">
                {products.map((product, idx) => {
                    const status = handleStatus(product?.status)
                    return (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={product?.image} />
                                <Card.Body>
                                    <Card.Title>{product?.title}</Card.Title>
                                    <Card.Text>
                                        {product?.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>

                                        <Badge bg={status.badge}>{status.text}</Badge>
                                        {status?.pending && (user?.user_id !== product?.user_id_recipient) && <Button variant="light" onClick={() => handleAccept(product, 'Finalizado')}>
                                            Aceitar
                                        </Button>}
                                        {status?.pending && (
                                            <Button variant="light" onClick={() => handleAccept(product, 'Cancelado')}>Cancelar</Button>
                                        )}
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}