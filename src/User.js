import React, { useEffect, useState } from 'react';

import api from './services/api'
import { Card, ListGroup, Form, Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap'

export default function User() {

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
            setUsers([...users, res.data])
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
        <div className="mt-5 d-flex justify-content-left" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
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
                {/* <DropdownButton style={{ margin: 5 }} title='Tipo do Combustivel' onSelect={e => setPostoFiltro({ ...postoFiltro, combustivelId: e })}>
                    {combustivel.map(c => (
                        <Dropdown.Item eventKey={c?.id}>{c?.descricao}</Dropdown.Item>
                    ))}
                </DropdownButton> */}
                {/* <DropdownButton style={{ margin: 5 }} title='Ordem' onSelect={e => setPostoFiltro({ ...postoFiltro, ordemBusca: e })}>
                    <Dropdown.Item eventKey='DISTANCIA'>Distancia</Dropdown.Item>
                    <Dropdown.Item eventKey='COMBUSTIVEL'>Combustivel</Dropdown.Item>
                </DropdownButton> */}
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
            ----
            {users?.map(user => {
                return (
                    <>
                        <Card key={user?.user_id} style={{ width: '18rem', margin: 5 }}>
                            <Card.Body>
                                <Card.Title>{user?.first_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{user?.last_name}</Card.Subtitle>
                                <Card.Text>
                                    {user?.phone}
                                </Card.Text>
                                {/* <Card.Text>
                                    {user?.bairro}
                                </Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Distancia: {user?.distancia?.toFixed(2)}km</ListGroup.Item>
                                    <ListGroup.Item>{user?.combustiveis[0]?.descricao}: <span>R${user?.combustiveis[0]?.valor}</span></ListGroup.Item>
                                </ListGroup> */}
                            </Card.Body>
                        </Card>
                    </>
                )
            })}
        </div>
    )
}