import * as React from 'react';
import './Button.scss';

export interface ButtonProps {
  buttonType: 'btn-search' | 'btn-add-movie';
  label: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  buttonType,
  label,
  ...props
}) => {
  return (
    <button
      type="button"
      className={['btn', `${buttonType}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

export { Button };
