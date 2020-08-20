import * as React from 'react';
import './Search.scss';

const Search: React.FunctionComponent = ()  => (   
    <div className="row">
        <div className="search col-1 col-s-1">&nbsp;</div>
        <div className="search col-11 col-s-11">
            <span className="find-label">Find your movie</span>    
            <br />        
            <input className="search-box" placeholder="What do you want to watch?" />
            <button className="btn btn-search">Search</button>
        </div>           
    </div>
);

export { Search };
