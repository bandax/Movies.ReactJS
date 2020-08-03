import * as React from 'react';
import { LocalDate } from '../LocalDate/LocalDate';

export class Header extends React.Component {
    render() {        
        return (
            <div>
                <LocalDate />
                <h1>Welcome to Movie Catalog</h1>
            </div>
        );
    }
}
