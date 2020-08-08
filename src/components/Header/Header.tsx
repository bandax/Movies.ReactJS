import * as React from 'react';
import { LocalDate } from '../LocalDate/LocalDate';
import './Header.scss';
import { Search } from '../Search/Search';
import { AddMovie } from '../AddMovie/AddMovie';

export function Header() {    
    return (
            <div className="header">     
                <AddMovie title="+ADD MOVIE" />           
                <Search title="FIND YOUR MOVIE" placeholder="What do you want to watch?" searchTitle="SEARCH" />
            </div>
    );    
}
