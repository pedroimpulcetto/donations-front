import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, Button, Badge, Row, Col } from 'react-bootstrap'
import useAuth from './hooks/useAuth';

export default function ProductsDonor() {
    const [user, setUser] = useAuth();

    const [products, setProducts] = useState([]);

    function handleStatus(status) {
        let newStatus = {
            badge: '',
            text: ''
        }
        if (status === 'OPEN') {
            newStatus.badge = 'success'
            newStatus.text = 'Aberto'
            newStatus.open = true
        }
        if (status === 'IN_PROGRESS') {
            newStatus.badge = 'warning'
            newStatus.text = 'Em progresso'
            newStatus.pending = true
        }
        if (status === 'FINISHED') {
            newStatus.badge = 'danger'
            newStatus.text = 'Fechado'
        }
        return newStatus
    }

    function handleAccept(product) {

        const payload = {
            status: 'FINISHED',
        }

        api.patch(`/products/${product?.product_id}/`, payload).then(res => {
            setProducts([
                ...products,
                products.map(p => {
                    if (p.product_id === product.product_id) {
                        p = res.data
                    }
                })
            ])
            window.history.go('/meus-produtos')
            console.log({ res })
        }).catch(err => {
            console.log({ err })
        })
    }

    useEffect(() => {
        async function loadProducts() {
            const res = await api.get(`/products/?user_id_donor=${user?.user_id}`, {
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
                    console.log({ status })
                    return (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product?.title}</Card.Title>
                                    <Card.Text>
                                        {product?.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>

                                        <Badge bg={status.badge}>{status.text}</Badge>
                                        {status?.pending && <Button variant="light" onClick={() => handleAccept(product)}>
                                            Aceitar
                                        </Button>}
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