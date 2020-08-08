import * as React from 'react';
import './ErrorBoundary.scss';

export function ErrorBoundary(props:any) {
    const ErrorMessage = () => { 
        <h2>Error trying to get data from server</h2>
    }

    let notExistError = true;
    return <> { notExistError ? props.children : ErrorMessage } </>
}
