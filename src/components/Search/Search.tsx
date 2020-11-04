import * as React from 'react';
import { Link } from 'react-router-dom';
import './Search.scss';

const Search: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');

  return (
    <div className="search col-10">
      <span className="find-label">Find your movie</span>
      <br />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
        placeholder="What do you want to watch?"
        type="text"
      />
      <Link to={`/search/${search}`} className="btn btn-search">
        Search
      </Link>
    </div>
  );
};

export default Search;
