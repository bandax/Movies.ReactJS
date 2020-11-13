import * as React from 'react';
import { useField } from 'formik';
import './Style-Controls.scss';

// PATTERN: Common Abstraction
const FormikTextInput = ({ ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label htmlFor={props.id || props.name} className="label-text">
        {props.label}
      </label>
      <input className="input-text" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export { FormikTextInput };
