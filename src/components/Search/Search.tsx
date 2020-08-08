import * as React from 'react';
import * as PropTypes from 'prop-types'
import './Search.scss';

interface SearchProps {
    title: string,
    placeholder: string,
    searchTitle: string
}

export function Search(props: SearchProps) { 
    return (
        <div className="search">
            <span>{props.title}</span>
            <br />
            <input className="search-box" type="text" placeholder={props.placeholder} />
            <button className="btn btn-search">{props.searchTitle}</button>
        </div>
    ); 
}

Search.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    searchTitle: PropTypes.string.isRequired
}
