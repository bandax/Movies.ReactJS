import * as React from 'react';

export function ErrorBoundary(props:any) {
    const ErrorMessage = () => { 
        return (<h2>Error trying to get data from server</h2>)
    }

    let notExistError = true;
    return notExistError ? props.children : <ErrorMessage />;
}
