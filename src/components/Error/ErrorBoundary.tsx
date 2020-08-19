import * as React from 'react';

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary: React.FunctionComponent<IErrorBoundaryProps> = (props:IErrorBoundaryProps) => {
    const ErrorMessage = () => { 
        return (<h2>Error trying to get data from server</h2>)
    }
    let existError = false;
    return <>{ existError ? <ErrorMessage /> : props.children }</>;      
}

export { ErrorBoundary };
