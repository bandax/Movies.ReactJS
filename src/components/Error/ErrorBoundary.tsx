import * as React from 'react';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}
// PATTERN: Render children as a prop
const ErrorBoundary: React.FunctionComponent<IErrorBoundaryProps> = (
  props: IErrorBoundaryProps,
) => {
  const ErrorMessage = () => {
    return <h2>Error trying to get data from server</h2>;
  };
  const existError = false;
  return <>{existError ? <ErrorMessage /> : props.children}</>;
};

export { ErrorBoundary };
