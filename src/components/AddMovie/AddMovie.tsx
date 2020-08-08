import * as React from 'react';
import './AddMovie.scss';
import * as PropTypes from 'prop-types'

interface AddMovieProps {
    title: string,    
}

export function AddMovie(props: AddMovieProps) {
    return (
        <button className="btn btn-search">{props.title}</button>
    )
}

AddMovie.propTypes = {
    title: PropTypes.string.isRequired,   
}