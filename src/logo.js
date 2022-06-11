import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import logo from './doacoes.png'

export default function Logo() {

    return (
        <div >
            <Image style={{ marginTop: 20, width: 100, height: 100 }} src={logo} />
        </div>
    )
}