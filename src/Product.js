import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, ListGroup, Form, Button, Dropdown, DropdownButton, Spinner, Badge, Nav, Row, Col } from 'react-bootstrap'
import useAuth from './hooks/useAuth';

export default function Product() {
    const [user, setUser] = useAuth();

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [newImage, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value })
    }

    function handleImage(e) {
        const { files } = e.target
        setImage(files[0])
    }

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

    function handleSubmit() {
        setLoading(true)


        let payload = new FormData();
        payload.append('image', newImage);
        payload.append('title', newProduct?.title);
        payload.append('description', newProduct?.description);
        payload.append('user_id_donor', user?.user_id);


        console.log(payload)
        api.post('/products/', payload).then(res => {
            setLoading(false)
            console.log({ res })
            setProducts([...products, res.data])
            window.history.go('/meus-produtos')
            window.history.pushState('/meus-produtos')
            window.history.forward('/meus-produtos')
        }).catch(err => {
            setLoading(false)
            console.log({ err })
        })
    }


    function handleGetProduct(product) {

        const payload = {
            status: 'IN_PROGRESS',
            user_id_recipient: user?.user_id
        }

        api.patch(`/products/${product?.product_id}/`, payload).then(res => {
            setLoading(false)
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
            setLoading(false)
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

    useEffect(() => {
        async function loadUsers() {
            const res = await api.get('/users/', {
                headers: {
                    "Content-type": "application/json",
                }
            })
            setUsers(res.data)
        }
        loadUsers()
    }, [])

    return (
        <div className="mt-5 d-flex justify-content-left" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Produto</Form.Label>
                    <Form.Control name='title' onChange={e => handleChange(e)} type="text" placeholder="Produto" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descricao</Form.Label>
                    <Form.Control name='description' onChange={e => handleChange(e)} type="text" placeholder="Descricao" />
                </Form.Group>
                <div sytle={{ display: 'grid' }}>
                    <input onInput={handleImage} type="file" />
                </div>
                {!loading ? (
                    <Button style={{ margin: 5 }} variant="primary" onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                ) : (
                    <Button style={{ margin: 5 }} variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                )}
            </Form>
        </div>
    )
}