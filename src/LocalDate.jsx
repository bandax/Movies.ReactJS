import React from 'react';

export const LocalDate = () => {
    return (
        <p>Today is { new Date().toLocaleString() }</p>
    )
};
