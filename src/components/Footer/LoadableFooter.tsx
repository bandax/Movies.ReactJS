import * as React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

const LoadableFooter = Loadable({
  loader: () => import('./Footer'),
  loading: Loading,
});

const FooterSplit: React.FunctionComponent = () => {
  return <LoadableFooter />;
};

export default FooterSplit;
