import * as React from 'react';
import './Search.scss';

const Search: React.FunctionComponent = ()  => (   
    <div className="search">
        <span className="find-label">Find your movie</span>
        <br />
        <input className="search-box" placeholder="What do you want to watch?" />
        <button className="btn btn-search">Search</button>
    </div>   
);

export { Search };
