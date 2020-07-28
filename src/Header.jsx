import React, { Component } from 'react';
import { LocalDate } from './LocalDate';

export class Header extends Component {
    render() {        
        return (
            <div>
                <LocalDate />
                <h1>Welcome to Movie Catalog</h1>
            </div>
        );
    }
}
