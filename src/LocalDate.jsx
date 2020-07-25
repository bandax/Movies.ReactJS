import React from 'react';

const LocalDate = () => {
    return (
        <p>Today is { new Date().toLocaleString() }</p>
    )
};

export { LocalDate };

