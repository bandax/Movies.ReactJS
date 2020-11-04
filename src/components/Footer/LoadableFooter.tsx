import * as React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

const LoadableFooter = Loadable({
  loader: () => import('./Footer'),
  loading: Loading,
});

export default class FooterSplit extends React.Component {
  render() {
    return <LoadableFooter />;
  }
}
