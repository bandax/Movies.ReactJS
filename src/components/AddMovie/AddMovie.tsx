import * as React from 'react';
import './AddMovie.scss';

const AddMovie: React.FunctionComponent = () => (   
    <div className="row">        
        <div className="add-movie col-2 col-s-3">
            <button className="btn btn-add-movie">+Add Movie</button>
        </div>
    </div>
)

export { AddMovie };
