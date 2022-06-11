import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, ListGroup, Form, Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap'
import useAuth from './hooks/useAuth';
import Logo from './logo';

export default function Login() {
    const [user, setUser] = useAuth();

    const [users, setUsers] = useState([]);
    const [combustivel, setCombustivel] = useState([]);
    const [newUser, setNewUser] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value })
    }

    function handleSubmit() {
        setLoading(true)
        const payload = {
            first_name: newUser?.first_name,
            last_name: newUser?.last_name,
            phone: newUser?.phone,
            address: newUser?.address,
        };
        api.post('/users/', payload, {
            headers: {
                "Content-type": "application/json",
            }
        }).then(res => {
            setLoading(false)
            console.log({ res })
            setUser(res.data)
            window.history.go('/home')
        }).catch(err => {
            setLoading(false)
            console.log({ err })
        })
    }

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
        <div>
            <div style={{
                margin: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Logo />
                <h2>Login</h2>
                <h5 style={{ color: 'gray' }}>Coloque seu dados para fazer o login</h5>
            </div>
            <div className="mt-5 d-flex justify-content-left" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
            }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Primeiro Nome</Form.Label>
                        <Form.Control name='first_name' onChange={e => handleChange(e)} type="text" placeholder="Primeiro Nome" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ultimo Nome</Form.Label>
                        <Form.Control name='last_name' onChange={e => handleChange(e)} type="text" placeholder="Ultimo Nome" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name='phone' onChange={e => handleChange(e)} type="text" placeholder="Telefone" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Endereco</Form.Label>
                        <Form.Control name='address' onChange={e => handleChange(e)} type="text" placeholder="Endereco" />
                    </Form.Group>
                    {!loading ? (
                        <Button style={{ margin: 5 }} variant="primary" onClick={handleSubmit}>
                            Entrar
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
        </div>
    )
}