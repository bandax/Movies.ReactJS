import * as React from 'react';
import * as PropTypes from 'prop-types'
import './Search.scss';

export const Search: React.FunctionComponent = ()  => (   
    <div className="search">
        <span className="find-label">FIND YOUR MOVIE</span>
        <br />
        <input className="search-box" placeholder="What do you want to watch?" />
        <button className="btn btn-search">SEARCH</button>
    </div>   
);
