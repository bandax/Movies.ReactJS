import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const ShowDate = () =>{
    return (
        <p>Today is {new Date().toLocaleString()}</p>
    )
};

const ShowMessage = () => {
    return (React.createElement('div', null, `Hello World`));
};


ReactDOM.render(
    <div>
        <ShowDate />
        <ShowMessage />
        <App />
    </div>,
    document.getElementById('root')
);