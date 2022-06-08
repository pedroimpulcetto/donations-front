import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'
import logo from './local-gas-station.jpeg'

export default function Logo() {

        return(
            <div >
                <Image style={{marginTop: 20, width: 50, height: 50}} src={logo} />
            </div>
        )
}