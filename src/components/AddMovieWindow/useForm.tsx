import * as React from "react";

const useForm = (initialValues: any) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e: any, initialValues: any) => {
      if (!initialValues) {
        setValues({
          ...values,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      } else {
        setValues(initialValues);
      }
    },
  ];
};

export { useForm };
