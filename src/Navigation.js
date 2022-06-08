import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component {

    render() {
        return (
            <Navbar bg="warning" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-warning text-dark" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-warning text-dark" to="/listagem-produtos">
                            Listagem de Produtos
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-warning text-dark" to="/cadastrar-produtos">
                            Cadastrar Produto
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-warning text-dark" to="/meus-produtos">
                            Meus Produtos
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}