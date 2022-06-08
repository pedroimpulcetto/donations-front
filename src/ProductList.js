import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, Button, Badge, Row, Col } from 'react-bootstrap'
import useAuth from './hooks/useAuth';

export default function ProductList() {
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
        }
        if (status === 'FINISHED') {
            newStatus.badge = 'danger'
            newStatus.text = 'Fechado'
        }
        return newStatus
    }

    function handleGetProduct(product) {

        const payload = {
            status: 'IN_PROGRESS',
            user_id_recipient: user?.user_id
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
            console.log({ res })
        }).catch(err => {
            console.log({ err })
        })
    }

    useEffect(() => {
        async function loadProducts() {
            const res = await api.get('/products/', {
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
                {products.filter(product => product.user_id_donor !== user.user_id).map((product, idx) => {
                    const status = handleStatus(product?.status)
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
                                        {status?.open && <Button variant="light" onClick={() => handleGetProduct(product)}>
                                            Reservar
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