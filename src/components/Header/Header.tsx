import * as React from 'react';
import { LocalDate } from '../LocalDate/LocalDate';
import './Header.scss';
import { Search } from '../Search/Search';
import { AddMovie } from '../AddMovie/AddMovie';

export const Header: React.FunctionComponent = () => (    
    <div className="header">     
        <br />
        <AddMovie />           
        <br />
        <br />
        <br />
        <br />        
        <Search  />

    </div>
);    

