import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import MultiSelect from 'react-multi-select-component';
import { IOption } from '../../interfaces/IOption';

// PATTERN: Common Abstraction
const FormikMultiSelect = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  React.useEffect(() => {
    setFieldValue(field.name, props.selValue);
  }, [props.selValue]);

  const onSelectedOption = (selectedOptions: IOption[]) => {
    setFieldValue(field.name, selectedOptions);
  };

  return (
    <>
      <label htmlFor={props.id || props.name} className="label-text">
        {props.label}
      </label>
      <MultiSelect
        options={props.options}
        value={field.value}
        onChange={onSelectedOption}
        labelledBy="Select"
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export { FormikMultiSelect };
