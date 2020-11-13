import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import './Style-Controls.scss';

// PATTERN: Common Abstraction

const FormikDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  return (
    <>
      <label htmlFor={props.id || props.name} className="label-text">
        {props.label}
      </label>
      <DatePicker
        selected={field.value}
        onChange={(val: Date) => {
          setFieldValue(field.name, val);
        }}
        className="date-icon input-text"
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export { FormikDatePicker };
